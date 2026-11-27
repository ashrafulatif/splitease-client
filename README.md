# SplitEase

SplitEase is a modern, full-stack web application for managing shared expenses, house memberships, and subscriptions. It is designed for multi-role usage (Admin, Manager, Member) and provides a seamless, analytics-driven experience for bill splitting, financial tracking, and operational management in shared living environments.

---

## Live URL

- **Production:** https://splitease-client.vercel.app

---

## Features

- Role-based dashboards (Admin, Manager, Member)
- User authentication and profile management
- House, member, and plan management
- Subscription and payment integration (Stripe or similar)
- Real-time analytics and statistics
- Toast notifications and feedback
- Secure JWT-based session handling
- Zod-based validation for all forms
- Secure and modern authentication flow, API proxied via Next.js rewrites.
- Built with Radix UI, shadcn, Tailwind CSS.
- Robust forms powered by TanStack React Form and validated with Zod.
- Insightful data visualizations with Recharts.
- Cloudinary support and optimizations for images via Next.js config.
- Modular components and utilities, following best React and TypeScript patterns.
- Configurable and secure API calls via proxy and environment-driven endpoints.

---

## Technologies Used

- **React 19**
- **Next.js 16** (`app/` directory and server components)
- **TypeScript**
- **Bun** (for Next.js server runtime/scripts)
- **Tailwind CSS 4** (and plugins)
- **Radix UI & shadcn UI**
- **TanStack React Form**
- **date-fns** (date utilities)
- **Zod** (validation)
- **Recharts** (charts)
- **ESLint**, **PostCSS**
- **Cloudinary** (image optimization)
- **JWT, better-auth** (authentication libs)
- Additional libraries: Lucide React Icons, Class Variance Authority, clsx, etc.

---

## Architecture & Project Structure

```
/ (root)
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── public/
├── src/
│   ├── apiInstance.ts         # API endpoint definitions
│   ├── env.ts                 # Environment variable management
│   ├── app/                   # Next.js App Router structure
│   │   ├── (commonLayout)/    # Shared layouts/pages
│   │   ├── (dashboardLayout)/ # Role-based dashboards
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, etc.
│   │   ├── module/            # Feature modules (Admin, Auth, Dashboard, etc.)
│   │   ├── ui/                # UI primitives (buttons, cards, dialogs, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions (auth, cookies, icons, etc.)
│   ├── service/               # API service wrappers
│   ├── types/                 # TypeScript types/interfaces
│   ├── zod/                   # Zod validation schemas
├── tsconfig.json
```

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd splitease-client
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   bun install
   ```
   Installing dependencies sets up Husky. The pre-commit hook runs ESLint on
   staged JavaScript and TypeScript files and applies safe fixes automatically.
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in required values.
4. **Run the development server:**
   ```bash
   pnpm dev
   # or
   bun dev
   ```
5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Run with Docker

The Docker Compose setup runs the frontend in development mode with the source
directory mounted for live updates. You need Docker Engine and the Docker Compose
plugin installed.

1. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Replace the placeholder values for `BACKEND_URL`, `FRONTENDURL`,
   `JWT_ACCESS_SECRET`, and `NEXT_PUBLIC_API_BASE_URL`. The public API URL must
   be reachable by your browser (for example, `http://localhost:4000/api/v1` if
   the backend publishes port 4000 on your machine).

2. **Make sure the Docker network exists:**
   The Compose file uses the external `splitease-network` network. If your backend
   already creates this network, start it first and make sure it is attached to
   the same network. Otherwise, create the network:

   ```bash
   docker network create splitease-network
   ```

3. **Build and start the frontend:**

   ```bash
   docker compose up
   ```

4. Open [http://localhost:3000](http://localhost:3000). Stop the container with
   `Ctrl+C`, or run `docker compose down` in another terminal.

---

## License

MIT
