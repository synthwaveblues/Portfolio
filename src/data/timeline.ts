export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  detail: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Goodszilla Inc.',
    role: 'Full-Stack Developer',
    period: 'Jun 2026 – Present',
    location: 'Remote (Toronto, Canada)',
    points: [
      'Develop and maintain the Node.js/TypeScript backend of a charitable-giving platform (MongoDB, AWS, Docker).',
      'Build features across the React/Remix Shopify app and merchant dashboards.',
      'Develop a Kotlin/Jetpack Compose Android app for payment terminals.',
    ],
  },
  {
    company: 'Słodkiewicz Gym & Fitness',
    role: 'Full-Stack Developer (2-month contract)',
    period: 'Apr 2026 – Jun 2026',
    location: 'Poznań, Poland',
    points: [
      'Developed full-stack features for a gym management platform using NestJS, React and TypeScript within an Nx monorepo.',
      'Designed relational databases with Prisma and PostgreSQL, with GraphQL APIs and JWT multi-role authentication.',
      'Built scheduling modules with email notifications; containerized with Docker and deployed via GitHub Actions.',
    ],
  },
  {
    company: 'Sysmo.pl',
    role: 'Backend Developer Intern',
    period: 'Jul 2025 – Sep 2025',
    location: 'Poznań, Poland',
    points: [
      'Contributed to commercial web apps using NestJS and PostgreSQL, focusing on modular architecture and scalable database design.',
      'Developed and extended RESTful API endpoints with strict DTO validation and TypeORM-managed migrations.',
      'Integrated external services and optimized DB queries to improve response times.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    school: 'Poznan University of Technology',
    degree: 'Master of Science — ICT',
    period: 'Mar 2026 – Present',
    detail: 'Major: Artificial Intelligence & Machine Learning',
  },
  {
    school: 'Poznan University of Technology',
    degree: 'Engineer — ICT',
    period: 'Oct 2022 – Feb 2026',
    detail: 'Thesis: "Student Helper — AI-Powered Exam Preparation Platform"',
  },
];