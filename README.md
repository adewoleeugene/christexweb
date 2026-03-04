# Christex Web
A modern web application for Christex Foundation, built with Next.js, React, and Tailwind CSS.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository and navigate into the project directory.
2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🛠️ Tech Stack
- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)

## 📝 Scripts
- `dev`: Starts the development server.
- `build`: Creates an optimized production build.
- `start`: Starts the Next.js production server.
- `lint`: Runs ESLint to catch syntax and style issues.
- `gallery:process`: Script to process gallery assets.
- `images:optimize`: Recompresses large images in-place with WebP for faster page loads.

### Image Optimization Usage
The image optimizer is scriptable for any folder and supports optional tuning:

```bash
# Default target: public/images/team, max dimension 1600, quality 78, min size 700000 bytes
npm run images:optimize

# Custom target and settings
./scripts/optimize-images.sh public/images/gallery 1920 80 500000
```

Requirements:
- `cwebp` must be installed and available in PATH.
