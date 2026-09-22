# MERCYVISUALS — AI Visual Production & Creative Storytelling Studio

> **"TURNING IDEAS INTO VISUAL EXPERIENCES."**  
> *AI Technology. Human Creative Direction.*

A modern, cinematic 4-page studio website created for **MERCYVISUALS**, founded by **Obayomi Esther Mercy** (Founder & AI Creative Director).

---

## 🌟 Key Features

1. **Slider Revolution-Style Cinematic Hero**:
   - 4 animated slides with Ken Burns background motion, staggered text reveals, atmospheric gradient vignettes, and glowing CTA buttons.
   - Dynamic timeline progress bar, dot controls, previous/next arrow controls, keyboard navigation, and mouse parallax depth effects.

2. **Authentic Client Visual Assets (`WEBSITE/` folder)**:
   - **Founder Portrait**: Authentic portrait of founder **Obayomi Esther Mercy** (`WEBSITE/founder-mercy.jpeg`).
   - **Real Selected Work Showcase**:
     - *Project 01*: **Juicy — 3D Character & Educational Storytelling** (`WEBSITE/juicy-character.mp4`)
     - *Project 02*: **Campus Safety & Orientation — 3D Character Campaign** (`WEBSITE/campus-animation.mp4`)
     - *Project 03*: **The Blind Box CT Scan — Viral Commercial & Product Narrative** (`WEBSITE/CT-Production.mp4`)
   - Interactive hover video preview and dedicated Lightbox Player with audio controls and full-screen view.

3. **4 Complete Responsive Pages**:
   - **Home (`index.html`)**: Cinematic slider hero, core brand positioning strip, selected work portfolio, why MercyVisuals methodology, and conversion banner.
   - **About Us (`about.html`)**: Studio narrative, 5+ years experience, founder portrait showcase, core philosophy, and 4 production pillars.
   - **Our Services (`services.html`)**: 6 core AI production capabilities, 5-step production process (*Discover → Concept → Produce → Refine → Deliver*), and live services portfolio.
   - **Contact Us (`contact.html`)**: Direct email (`obayomiesther73@gmail.com`), WhatsApp click-to-chat (`09073732756`), direct phone lines (`09131905580`, `08111140578`), and interactive project brief submission form.

4. **Modern Design System**:
   - Palette: Deep Midnight Navy, Rich Charcoal, Electric/Cobalt Blue, Soft Ice Cyan, and Warm Studio Dusk Beige.
   - Fluid typography using `Syne`, `Plus Jakarta Sans`, and `Inter`.
   - Liquid glassmorphism sticky header that compacts on scroll.
   - Mobile-responsive sliding drawer menu.

---

## 📂 Project Structure

```
├── index.html            # Homepage with 4-slide Revolution-style hero & video portfolio
├── about.html            # About Us page with founder profile & philosophy
├── services.html         # Services page with 6 capabilities & 5-step process
├── contact.html          # Contact page with interactive project brief form
├── css/
│   ├── style.css         # Core design system, glassmorphism, responsive layouts
│   └── hero-slider.css   # Cinematic slider animation & timeline progress styling
├── js/
│   ├── hero-slider.js    # Multi-slide engine with autoplay, parallax & timeline
│   └── main.js           # Header scroll, mobile drawer, video hover preview & lightbox
├── images/
│   └── hero/             # 4K cinematic hero slide visual backdrops
└── WEBSITE/              # Source of truth: authentic founder photo and 3 video projects
```

---

## 🚀 Running Locally

Open `index.html` in any modern web browser or serve via any static server:

```powershell
# Using Python
python -m http.server 8080

# Or using Node.js / npx
npx serve .
```
