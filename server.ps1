# Simple HTTP Static Server for MercyVisuals with MP4 Range support
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "MercyVisuals Server running at http://127.0.0.1:$port/"
} catch {
    Write-Host "Error starting listener: $_"
    exit 1
}

$baseDir = $PSScriptRoot
if ([string]::IsNullOrEmpty($baseDir)) {
    $baseDir = "C:\Users\user\Desktop\WEBSITE"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath.TrimStart('/'))
        if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq "/") {
            $urlPath = "index.html"
        }

        $filePath = Join-Path $baseDir $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $fileInfo = New-Object System.IO.FileInfo($filePath)
            $totalLength = $fileInfo.Length
            $ext = $fileInfo.Extension.ToLower()

            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png"  { "image/png" }
                ".svg"  { "image/svg+xml" }
                ".mp4"  { "video/mp4" }
                ".webp" { "image/webp" }
                default { "application/octet-stream" }
            }

            $response.ContentType = $contentType
            $response.Headers.Add("Accept-Ranges", "bytes")

            $rangeHeader = $request.Headers["Range"]

            if ($ext -eq ".mp4" -and !([string]::IsNullOrEmpty($rangeHeader)) -and $rangeHeader.StartsWith("bytes=")) {
                $range = $rangeHeader.Substring(6).Split('-')
                [long]$start = 0
                [long]$end = $totalLength - 1

                if (![string]::IsNullOrEmpty($range[0])) {
                    [long]::TryParse($range[0], [ref]$start) | Out-Null
                }
                if ($range.Length -gt 1 -and ![string]::IsNullOrEmpty($range[1])) {
                    [long]::TryParse($range[1], [ref]$end) | Out-Null
                }

                if ($end -ge $totalLength) { $end = $totalLength - 1 }
                $contentLength = $end - $start + 1

                $response.StatusCode = 206 # Partial Content
                $response.ContentLength64 = $contentLength
                $response.Headers.Add("Content-Range", "bytes $start-$end/$totalLength")

                $fs = [System.IO.File]::OpenRead($filePath)
                $fs.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null
                $buffer = New-Object byte[] 65536
                [long]$bytesRemaining = $contentLength

                while ($bytesRemaining -gt 0) {
                    $bytesToRead = [int][Math]::Min([long]$buffer.Length, $bytesRemaining)
                    $bytesRead = $fs.Read($buffer, 0, $bytesToRead)
                    if ($bytesRead -le 0) { break }
                    $response.OutputStream.Write($buffer, 0, $bytesRead)
                    $bytesRemaining -= $bytesRead
                }
                $fs.Close()
            } else {
                $response.StatusCode = 200
                $response.ContentLength64 = $totalLength

                $fs = [System.IO.File]::OpenRead($filePath)
                $buffer = New-Object byte[] 65536
                while ($true) {
                    $bytesRead = $fs.Read($buffer, 0, $buffer.Length)
                    if ($bytesRead -le 0) { break }
                    $response.OutputStream.Write($buffer, 0, $bytesRead)
                }
                $fs.Close()
            }
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }

        $response.Close()
    } catch {
        # Catch and continue
    }
}
