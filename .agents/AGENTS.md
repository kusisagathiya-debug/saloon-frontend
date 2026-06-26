# Workspace Customizations & Project Memory: Sadhana Salon & Spa

This document contains rules, memory, and design details for the **Sadhana Salon & Spa** web application project. It serves as persistent memory for any coding assistant working in this workspace.

## Project Metadata
- **Project Name**: Sadhana Luxury Salon & Spa
- **Directory**: `C:\Users\Admin\.gemini\antigravity\scratch\sadhana-salon`
- **Tech Stack**: React (Single Page Application) + Three.js (3D door scene) + Firebase Client (with LocalStorage fallback)
- **Local Dev Server**: Served via a built-in Python HTTP server (`run_server.py`) and browser-transpiled via Babel-standalone due to Node.js not being pre-installed in this environment.

---

## Design System Rules
Coding assistants must respect the following luxury brand style guides at all times:
- **Primary Color**: `#C9A227` (Gold - Luxury accents)
- **Background**: `#FFFFFF` (White - Clean and spacious)
- **Secondary Color**: `#F5EFE6` (Warm Beige - Container backgrounds and highlights)
- **Text Color**: `#222222` (Near Black - Strong readability and contrast)
- **Accent Color**: `#E8D5B7` (Soft Gold - Boarders and gradients)
- **Success Color**: `#27AE60` (Green - Bookings and confirmations)
- **Typography**: Poppins font family (Bold for displays/headings, Regular for content, SemiBold for labels).
- **Aesthetic Feel**: Glassmorphism (`backdrop-filter: blur(12px)`), subtle gold gradients, micro-animations on hover, and custom thin gold scrollbars.

---

## Architecture Rules & Fallbacks
1. **Three.js Entry Doors**: The 3D scene is written in pure Three.js rather than React Three Fiber hooks to maintain reliability when loading from CDNs/Import maps without a compilation step. It plays a custom synthesized doorbell chime using the browser's Web Audio API and signals the React app to fade in.
2. **Database Fallback**: The application uses a database client (`db.js`) that automatically hooks up to Firebase Firestore if environment keys are supplied. Otherwise, it gracefully falls back to a mock local database stored in `localStorage`, pre-seeded with services, stylists, mock reviews, and active coupons.
3. **No-Node Buildless Setup**: Due to Node.js's absence in the local runtime environment:
   - Provide a standard `package.json` for compilation on machines with Node.js.
   - For local execution in this container, use import maps in `index.html` to resolve npm modules dynamically and use Babel-standalone in-browser transpilation.
   - Run the site locally by executing `python run_server.py` in the workspace directory.
