# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive
- 🌙 Dark mode support
- ⚡ Fast and optimized
- 🎯 SEO friendly

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

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   └── components/       # React components
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       └── Contact.tsx
├── public/               # Static files
└── tailwind.config.ts    # Tailwind configuration
```

## Customization

### Update Personal Information

Edit the component files in `src/components/` to update:
- Contact information in `Contact.tsx`
- Work experience in `Experience.tsx`
- Skills in `Skills.tsx`
- Projects in `Projects.tsx`
- About section in `About.tsx`

### Styling

Modify `tailwind.config.ts` to customize colors, fonts, and other design tokens.

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## License

MIT License - feel free to use this template for your own portfolio!
