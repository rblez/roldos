# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Casa Roldós** — A single-page static website for a hamburger restaurant/cafetería in Santiago de Cuba. The entire application lives in a single file: `inde.html`.

- **Currency**: All prices are in CUP (Cuban pesos)
- **Ordering**: Orders are sent via WhatsApp (+53 63807214)
- **Languages**: Spanish (es)

## Architecture

Everything is contained in `inde.html` — no build system, no bundler, no framework.

### Dependencies (CDN)
- **Tailwind CSS** (`cdn.tailwindcss.com`) — utility classes, minimal usage
- **QRCode.js** (`cdnjs.cloudflare.com`) — QR code generation for sharing the menu URL
- **Google Fonts** — Bebas Neue (display) + Libre Franklin (body)

### Structure (single file)
1. **CSS** (lines 10–129): Custom styles for glass-morphism, product cards, cart, animations, responsive breakpoints
2. **HTML sections** (lines 132–462):
   - Animated geometric canvas background
   - Mobile menu overlay
   - Sticky navigation bar (liquid glass + noise effect)
   - Hero section with CTA buttons
   - Menu catalog with filter tabs + search
   - Cart overlay + sidebar
   - QR code sharing section
   - About section
   - Map (Google Maps embed)
   - Footer with contact info and social links
3. **JavaScript** (lines 482–839):
   - `PRODUCTS` array (~20 items across 5 categories: hamburguesas, sandwiches, bebidas, postres, combos)
   - Cart state management (in-memory `cartState` object)
   - Product rendering, filtering, and search
   - WhatsApp order integration
   - QR code generation
   - Scroll reveal animations
   - Geometric animated canvas background

### Key Functions
- `renderProducts(list)` — renders product cards to the grid
- `filterProducts(btn, cat)` / `searchProducts(q)` / `applyFilterSearch(q, cat)` — filtering logic
- `addToCart()` / `removeFromCart()` / `clearCart()` / `updateCartUI()` — cart management
- `sendWhatsApp()` — formats cart as WhatsApp message and opens wa.me link
- `initCanvas()` — animated geometric shapes on canvas background

### Responsive Design
- Mobile breakpoint at 768px (hides nav links, shows hamburger menu)
- Cart sidebar goes full-width at 480px
- CSS Grid auto-fill for product cards

## Development

This is a static HTML file — open it directly in a browser or serve it with any static file server. No build/dev server required.

To serve locally:
```bash
python -m http.server 8000
# or
npx serve .
```
