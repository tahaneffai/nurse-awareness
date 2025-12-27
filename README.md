# Nursing Voice - Premium Awareness Platform

A premium, modern platform for nursing trainees to learn about their rights, share experiences anonymously, and access support resources.

## Features

- **Premium Design**: Glassmorphism effects, animated backgrounds, and smooth transitions
- **Anonymous Voice**: Share experiences safely and anonymously
- **Rights & Guidance**: Learn about your legal rights as a nursing trainee
- **Contact & Support**: Form to contact training institutions when rights are not respected
- **How It Works**: Interactive timeline showing the three-step process
- **Articles & Resources**: Educational content and guidance

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- React 18
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles, Tailwind imports, animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Premium homepage
├── components/
│   ├── Navbar.tsx           # Premium navigation bar with glassmorphism
│   ├── Hero.tsx             # Animated hero section with blobs and particles
│   ├── FeatureCard.tsx      # Glassmorphism feature card component
│   ├── SectionTitle.tsx     # Animated section title component
│   └── Footer.tsx           # Footer component
├── tailwind.config.ts       # Tailwind configuration with custom colors
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Design

The website features a premium, modern healthcare-focused design with:
- Dark green gradient backgrounds (#0F2D22 to #335842)
- Gold accents (#C7AB50)
- Off-white text (#F4F5F4)
- Glassmorphism effects with backdrop blur
- Animated floating blobs and particles
- Subtle grain overlay
- Smooth scroll animations
- Hover micro-interactions
- Responsive design for mobile and desktop

## Build for Production

```bash
npm run build
npm start
```

## License

This project is created for educational and awareness purposes.

