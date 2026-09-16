import type {
  ExperienceItem,
  PortfolioProject,
  Profile,
  ProofPoint,
  SkillGroup,
} from '@/types/portfolio'

export const profile = {
  name: 'Sergey Dushevski',
  title: 'Senior Full-Stack & Mobile Developer',
  experienceLabel: '7+ years shipping web and mobile products',
  location: 'Tel Aviv District, Israel',
  summary:
    'React Native and TypeScript specialist with full-stack depth in Node.js and NestJS, focused on accessible systems, product performance, and maintainable delivery.',
  email: 'sergeydushevski@gmail.com',
  githubUrl: 'https://github.com/sergeydus',
} satisfies Profile

export const proofPoints = [
  {
    id: 'accessibility',
    label: 'Accessibility systems',
    detail: 'WCAG-focused components, CI rules, and screen-reader testing',
    href: '#experience',
  },
  {
    id: 'mobile-performance',
    label: 'Mobile performance',
    detail: 'React Native startup and delivery improvements across real products',
    href: '#experience',
  },
  {
    id: 'modernization',
    label: 'Full-stack modernization',
    detail: 'Frontend migrations and backend query optimization',
    href: '#experience',
  },
] satisfies readonly ProofPoint[]

export const experiences = [
  {
    id: 'enterprise-banking-2026',
    title: 'React Native Accessibility Lead',
    company: 'Enterprise Banking Program',
    period: 'Apr 2026 - Aug 11, 2026',
    description:
      'Delivered React Native features for enterprise banking applications while owning accessibility and test-automation foundations.',
    achievements: [
      'Built reusable accessible components and code-review checks aligned with WCAG 2.2 AA practices',
      'Strengthened test-identifier infrastructure used by automated mobile QA',
      'Tested mobile flows with VoiceOver and TalkBack, improving focus, semantics, and component behavior',
    ],
  },
  {
    id: 'freelance-2025',
    title: 'Frontend Developer',
    company: 'Freelance',
    period: 'Dec 2025 - Mar 2026',
    description: 'Delivered focused frontend and mobile work for client projects.',
    achievements: [
      'Built the frontend for an AI chat proof of concept using React and TypeScript',
      'Prepared and published a mobile application release to the Google Play Store',
    ],
  },
  {
    id: 'firstoffer',
    title: 'Full-Stack Developer',
    company: 'FirstOffer',
    period: 'Jun 2023 - Dec 2024',
    description: 'Built internal ad-tech products with Vue 2/3, NestJS, and MySQL.',
    achievements: [
      'Led an end-to-end migration from Vue 2 to Vue 3',
      'Optimized backend queries and substantially reduced system load times',
      'Shipped full-stack features and mentored developers across frontend and backend work',
    ],
  },
  {
    id: 'abra',
    title: 'Full-Stack & Mobile Developer',
    company: 'ABRA',
    period: 'Dec 2018 - Jun 2023',
    description:
      'Delivered React and React Native products across community technology, precision agriculture, and ageing-tech.',
    projects: [
      {
        id: 'mekome',
        name: 'Mekome',
        role: 'Full-Stack Developer',
        description:
          'A communication platform connecting municipalities, communities, and residents.',
        image: {
          src: '/experience/mekome-interface.webp',
          alt: 'Mekome mobile finance screen showing community charges and balances in Hebrew',
          fit: 'contain',
          position: 'center',
        },
        publicUrl: 'https://mekome.net/',
        achievements: [
          'Enabled Hermes and lazy loading to materially improve application startup',
          'Built mobile and web experiences for messaging, events, and community services',
          'Used native Android where React Native alone was not sufficient',
        ],
      },
      {
        id: 'supplant',
        name: 'SupPlant',
        role: 'Full-Stack Developer',
        description:
          'A precision-irrigation platform turning sensor, plant, soil, and climate data into operational guidance.',
        image: {
          src: '/experience/supplant-map.webp',
          alt: 'SupPlant Map View showing farm plots that need attention on a mobile device',
          fit: 'contain',
          position: 'center',
        },
        publicUrl: 'https://play.google.com/store/apps/details?id=me.supplant.dss',
        achievements: [
          'Built responsive React Native and React dashboards for real-time data',
          'Worked across product and data teams to make complex signals actionable',
          'Mentored developers while delivering shared product capabilities',
        ],
      },
      {
        id: 'sparko',
        name: 'Sparko',
        role: 'Mobile Developer',
        description:
          'An accessibility-first virtual retirement community spanning mobile apps and a custom Android set-top box.',
        image: {
          src: '/experience/sparko-tv.webp',
          alt: 'Sparko accessible TV interface for community activities, messages, contacts, and interests',
          fit: 'contain',
          position: 'center',
        },
        publicUrl: 'https://www.ageuk.org.uk/kentrivers/about-us/news/articles/2021/sparkotv/',
        achievements: [
          'Created an intuitive experience for older adults across touch and TV interfaces',
          'Combined React Native and native Android for video calling, classes, messaging, and events',
        ],
      },
    ],
  },
] satisfies readonly ExperienceItem[]

export const skillGroups = [
  {
    id: 'mobile',
    category: 'Mobile',
    items: ['React Native', 'Expo', 'Reanimated', 'Hermes', 'Native Android', 'Performance profiling'],
  },
  {
    id: 'accessibility-quality',
    category: 'Accessibility & Quality',
    items: ['WCAG 2.2 AA', 'VoiceOver', 'TalkBack', 'Jest', 'Appium', 'ESLint automation'],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    items: ['React', 'Next.js', 'Vue 2/3', 'Nuxt', 'Angular', 'TypeScript', 'Tailwind CSS', 'MUI'],
  },
  {
    id: 'backend-data',
    category: 'Backend & Data',
    items: ['Node.js', 'NestJS', 'Express', 'REST APIs', 'MySQL', 'MongoDB', 'SQLite', 'TypeORM'],
  },
  {
    id: 'engineering',
    category: 'Engineering',
    items: ['Architecture planning', 'Code review', 'Mentoring', 'Fastlane', 'Git', 'Agile / Scrum', 'Figma'],
  },
] satisfies readonly SkillGroup[]

export const projects = [
  {
    kind: 'repository',
    id: 'agent-bridge',
    title: 'Agent Bridge',
    description:
      'A local coordination layer for Codex CLI and Claude Code, built around human-guided collaboration, reciprocal review, safe worktrees, and recoverable sessions.',
    technologies: ['TypeScript', 'Node.js', 'Agent workflows', 'Terminal UX'],
    repositoryUrl: 'https://github.com/sergeydus/agent-bridge',
    accent: 'purple',
  },
  {
    kind: 'demo',
    id: 'deadlock-draft-oracle',
    title: 'Deadlock Draft Oracle',
    description:
      'A roster-aware hero randomizer for solo players and squads, with role coverage, filters, shareable draws, localization, and offline PWA support.',
    technologies: ['React 19', 'TypeScript', 'MobX', 'Vite', 'PWA'],
    liveUrl: 'https://sergeydus.github.io/deadlock-draft-oracle/',
    repositoryUrl: 'https://github.com/sergeydus/deadlock-draft-oracle',
    image: {
      src: '/projects/deadlock-draft-oracle.webp',
      alt: 'Deadlock Draft Oracle project interface with its bold lime title and feature labels',
    },
    accent: 'green',
  },
  {
    kind: 'demo',
    id: 'domino-fill',
    title: 'Domino Fill',
    description:
      'An interactive puzzle game where players place domino tiles to fill a grid, with responsive controls and smooth feedback.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Vercel'],
    liveUrl: 'https://domino-fill.vercel.app/',
    repositoryUrl: 'https://github.com/sergeydus/domino_fill',
    image: {
      src: '/projects/domino-fill.webp',
      alt: 'Domino Fill puzzle board with numbered rows, columns, and placed domino tiles',
      position: 'center 34%',
    },
    accent: 'blue',
  },
  {
    kind: 'demo',
    id: 'greenpark',
    title: 'GreenPark',
    description:
      'A concept for sustainable parking infrastructure with solar energy, water management, EV charging, and smart-space optimization.',
    technologies: ['Next.js', 'TypeScript', 'React', 'CSS'],
    liveUrl: 'https://sergeydus.github.io/GreenPark/',
    repositoryUrl: 'https://github.com/sergeydus/GreenPark',
    image: {
      src: '/projects/greenpark.webp',
      alt: 'GreenPark landing page presenting nature-friendly parking solutions',
    },
    accent: 'green',
  },
  {
    kind: 'packages',
    id: 'angular-packages',
    title: 'Angular Packages',
    description: 'Focused Angular utilities for signals and Tailwind class composition.',
    technologies: ['Angular', 'Tailwind CSS', 'TypeScript', 'npm'],
    repositoryUrl: 'https://github.com/sergeydus/ng-tailwind-workspace',
    packages: [
      {
        id: 'ng-signals-utils',
        name: '@sergeydus/ng-signals-utils',
        url: 'https://www.npmjs.com/package/@sergeydus/ng-signals-utils',
        description: 'Reactive programming utilities for Angular signals',
      },
      {
        id: 'ng-tailwind-merge',
        name: 'ng-tailwind-merge',
        url: 'https://www.npmjs.com/package/ng-tailwind-merge',
        description: 'Dynamic Tailwind class management for Angular applications',
      },
    ],
    accent: 'orange',
  },
  {
    kind: 'demo',
    id: 'dither-it',
    title: 'DitherIT',
    description:
      'An image-processing experiment that applies classic dithering algorithms through modern browser canvas APIs.',
    technologies: ['JavaScript', 'Canvas API', 'Image Processing'],
    liveUrl: 'https://sergeydus.github.io/DitherIT/',
    repositoryUrl: 'https://github.com/sergeydus/DitherIT',
    image: {
      src: '/projects/dither-it-art.webp',
      alt: 'A vivid mountain landscape transformed with an ordered color-dithering pattern',
    },
    accent: 'purple',
  },
] satisfies readonly PortfolioProject[]

export const education = {
  degree: "Bachelor's Degree in Computer Science",
  institution: 'Tel-Hai College, Israel',
  period: '2015 - 2019',
}

export const certifications = [
  'Agentic AI: Building Data-First AI Agents',
  'LangChain.js for JavaScript Developers',
] as const

export const languages = ['Hebrew — native', 'English — professional working', 'Russian — limited working'] as const
