## Project Summary
The DevOps Club website is a flagship, hyper-modern frontend built to represent a community of automation and infrastructure engineers. It features a dark cyber-devops aesthetic with heavy use of animations, glassmorphism, and neon accents to deliver a startup-grade user experience.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS 4 (Dark theme, Glassmorphism, Neon effects)
- **Animations:** GSAP (Hero logo/particles), Framer Motion (Page transitions, 3D Tilt, Modals)
- **State Management:** Zustand (Auth state, Modal management)
- **Data Fetching:** React Query (Events, Gallery)
- **UI Components:** ShadCN UI (Radix-based primitives)
- **Icons:** Lucide Icons

## Architecture
- **src/app:** Route handlers and page components.
- **src/components:** Reusable UI components (Navbar, Footer, Modals, Cards).
- **src/lib:** Store definitions, API abstractions, and utility functions.
- **src/hooks:** Custom React hooks for shared logic.

## User Preferences
- **Theme:** Exclusively dark/cyberpunk aesthetic.
- **Interactions:** Heavy but professional animations (GSAP/Framer).
- **Layout:** Sticky blurred navbar, fixed glass modals.

## Project Guidelines
- No placeholders; use high-quality mock data for development.
- All client-side API calls should use the `api` abstraction in `src/lib/api.ts`.
- Follow "Apple + Vercel level polish" in UI/UX design.

## Common Patterns
- **Auth:** Managed via `useAuthStore` with simulated JWT flow.
- **Modals:** Managed via `useModalStore` for global accessibility.
- **Responsive:** Mobile-first design with complex desktop interactions (3D tilt, parallax).
