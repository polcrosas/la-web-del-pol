# Website Redesign Plan

## Overview
Complete redesign of Pol Crosas' portfolio website with a focus on simplicity, functionality, and maintainability. All current files will be archived in a legacy folder, and a new minimal structure will be created from scratch.

## Active Entries Analysis

Based on [`HomePage.js`](src/components/pages/HomePage.js:13-273), the following entries are currently active (not commented out):

### 2025
1. **La Capella Exhibition** - External link to exhibition page

### 2024
2. **Guerra Mundial** - `/guerra_mundial` - Video for Ben Yart's mixtape with dome
3. **Foflas** - `/foflas` - AI generated shitpost with el foflas
4. **F (Barranco Fest)** - `/f` - Barranco fest aftermovie with dome

### 2023
5. **In/Out** - `/inout` - Final degree MA thesis exhibited in Tabakalera
6. **Juego del Teléfono** - `/juego_del_telefono` - Video essay about language and cameras
7. **Cundits en Euskalherria** - `/cundits_en_euskalherria` - Documentary about friends music tour
8. **Tapetum Lucidum** - `/tapetum_lucidum` - Custom dreambooth dog model with dome

### 2022
9. **Mu** - `/mu` - Monographic artist book
10. **Carglass** - External PDF link - atractive_smithers fanzine

### 2021
11. **Cundits** - External PDF link - els cundits fanzine
12. **Hiperpublicación** - External link to artefactosnativos.com
13. **Vertical** - `/vertical_but_rather_be_horizontal` - Video poem with cameras and the sea
14. **Tarot** - `/tarot` - Tarot set of dog panoramics

### 2020
15. **RXTX** - `/rxtx` - Virtual flamethrower in an online exhibition
16. **Serbal** - `/serbal` - Fanzine made during lockdown
17. **Cosas de Casa** - `/cosas_de_casa` - Video series made at home

## New Architecture

### Simplified Structure
```
/
├── legacy-website/          # All current files moved here
├── public/
│   ├── index.html          # Minimal HTML
│   └── favicon.ico
├── src/
│   ├── App.js              # Simple routing
│   ├── index.js            # Entry point
│   ├── index.css           # Minimal global styles
│   └── pages/
│       ├── Home.js         # Grid of entries
│       ├── GuerraMundial.js
│       ├── Foflas.js
│       ├── F.js
│       ├── Inout.js
│       ├── JuegoDelTelefono.js
│       ├── CunditsEuskalherria.js
│       ├── TapetumLucidum.js
│       ├── Mu.js
│       ├── Vertical.js
│       ├── Tarot.js
│       ├── Rxtx.js
│       ├── Serbal.js
│       └── CosasDeCasa.js
├── package.json
└── README.md
```

## Design Principles

### 1. Minimal Dependencies
- React (core functionality)
- React Router (navigation)
- No UI frameworks (no Mantine, Material-UI, Tailwind)
- No carousel libraries
- Basic CSS only

### 2. Simple Layout
- Clean grid layout for homepage
- Each entry shows: image, title, description, year
- Click to navigate to detail page or external link
- No hover effects, no animations
- Mobile responsive using CSS Grid/Flexbox

### 3. Content Structure
Each entry object contains:
```javascript
{
  id: string,
  title: string,
  description: string,
  year: string,
  image: string (URL),
  link: string (internal route or external URL),
  isExternal: boolean
}
```

### 4. Detail Pages
For internal routes, create simple pages that display:
- Title
- Embedded content (video/images)
- Description
- Back to home link

## Implementation Steps

### Phase 1: Archive Current Site
1. Create `legacy-website` folder at root
2. Move all current `src/`, `public/` contents to `legacy-website/`
3. Keep `package.json`, `.gitignore`, config files at root for now

### Phase 2: Create New Structure
1. Create new minimal `public/index.html`
2. Create new `src/index.js` entry point
3. Create new `src/App.js` with React Router
4. Create new `src/index.css` with basic styles

### Phase 3: Build Homepage
1. Create `src/pages/Home.js`
2. Define entries array with only active content
3. Implement simple grid layout
4. Add basic styling

### Phase 4: Create Detail Pages
1. Create individual page components for each internal route
2. Reuse content from legacy components where applicable
3. Simplify presentation (remove complex interactions)

### Phase 5: Update Dependencies
1. Update `package.json` to remove unused dependencies
2. Keep only: react, react-dom, react-router-dom, react-scripts
3. Test build process

### Phase 6: Testing
1. Verify all internal routes work
2. Verify all external links work
3. Test responsive layout
4. Ensure images load correctly

## Routes Map

```
/ → Home page (grid of all entries)
/guerra_mundial → Guerra Mundial detail page
/foflas → Foflas detail page
/f → F (Barranco Fest) detail page
/inout → In/Out detail page
/juego_del_telefono → Juego del Teléfono detail page
/cundits_en_euskalherria → Cundits en Euskalherria detail page
/tapetum_lucidum → Tapetum Lucidum detail page
/mu → Mu detail page
/vertical_but_rather_be_horizontal → Vertical detail page
/tarot → Tarot detail page
/rxtx → RXTX detail page
/serbal → Serbal detail page
/cosas_de_casa → Cosas de Casa detail page
```

## External Links (Direct)
- La Capella Exhibition → https://www.lacapella.barcelona/es/programacion/exposiciones/caca-banal/
- Carglass PDF → S3 bucket URL
- Cundits PDF → S3 bucket URL
- Hiperpublicación → https://artefactosnativos.com/hiperpublicacion.html

## Benefits of New Architecture

1. **Maintainability**: Simple, flat structure easy to understand
2. **Performance**: Minimal dependencies = faster load times
3. **Extensibility**: Easy to add new entries or pages
4. **Clarity**: No complex state management or UI libraries
5. **Focus**: Content-first approach without design distractions

## Next Steps

After plan approval:
1. Switch to Code mode to implement the changes
2. Follow the implementation steps sequentially
3. Test thoroughly before considering complete
