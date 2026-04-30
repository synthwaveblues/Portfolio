export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
  icon: string;
}

export const TECH_STACK: SkillGroup[] = [
  {
    category: 'Fullstack & Architecture',
    icon: '{}',
    skills: [
      {name: 'JavaScript & TypeScript', level: 90},
      {name: 'Node.js', level: 87},
      {name: 'Microservices & Monorepos', level: 80},
      {name: 'HTML5 & CSS3', level: 80},
      {name: 'Websockets', level: 65},
      {name: 'System Security (JWT/ACID)', level: 70}
    ],
  },
  {
    category: 'Frameworks & Libraries',
    icon: '⚙',
    skills: [
      {name: 'NestJS', level: 90},
      {name: 'React', level: 78},
      {name: 'Astro', level: 75},
      {name: 'Express', level: 80},
      {name: 'Bun & Hono', level: 70}
    ]
  },
  {
    category: 'Data & Cloud',
    icon: '◈',
    skills: [
      {name: 'PostgreSQL', level: 82},
      {name: 'TypeORM', level: 80},
      {name: 'Prisma', level: 72},
      {name: 'MongoDB', level: 65},
      {name: 'AWS S3', level: 60},
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: '⬡',
    skills: [
      {name: 'Docker', level: 80},
      {name: 'GitHub Actions (CI/CD)', level: 70},
      {name: 'Linux / Bash', level: 75},
      {name: 'Git / GitHub', level: 88},
      {name: 'Swagger / OpenAPI', level: 75},
      {name: 'Jest', level: 60}
    ]
  }
]