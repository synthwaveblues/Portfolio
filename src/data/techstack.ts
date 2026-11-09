import {
  siTypescript, siJavascript, siNodedotjs, siNestjs, siExpress, siGraphql, siStripe, siPaypal,
  siReact, siRemix, siAstro, siTailwindcss, siShopify, siKotlin,
  siPostgresql, siMongodb, siPrisma, siTypeorm, siDocker, siLinux,
  siGit, siGithubactions, siJest, siSwagger, siNx, siTurborepo, siOpenjdk, siPython,
} from 'simple-icons';

export interface SkillIcon {
  title: string;
  path: string;
}

export interface Skill {
  name: string;
  icons: SkillIcon[];
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
  icon: string;
}

// Drawn locally: AWS isn't in simple-icons and microservices isn't a brand
const cloudIcon: SkillIcon = {
  title: 'Cloud',
  path: 'M6.5 20a5.5 5.5 0 0 1-.9-10.93A7 7 0 0 1 19.2 8.3 5.85 5.85 0 0 1 18 20z',
};
const servicesIcon: SkillIcon = {
  title: 'Services',
  path: 'M2 2h8v8H2zm12 0h8v8h-8zM8 14h8v8H8zM10 5h4v2h-4zm-5 5h2v5H5zm12 0h2v5h-2zM5 15h3v2H5zm11 0h3v2h-3z',
};

export const TECH_STACK: SkillGroup[] = [
  {
    category: 'Backend',
    icon: '{}',
    skills: [
      {name: 'TypeScript / JavaScript', icons: [siTypescript, siJavascript]},
      {name: 'Node.js, NestJS & Express', icons: [siNodedotjs, siNestjs, siExpress]},
      {name: 'REST, GraphQL & WebSockets', icons: [siGraphql]},
      {name: 'Microservices', icons: [servicesIcon]},
      {name: 'Stripe & PayPal', icons: [siStripe, siPaypal]},
    ],
  },
  {
    category: 'Frontend & Mobile',
    icon: '◧',
    skills: [
      {name: 'React & Remix', icons: [siReact, siRemix]},
      {name: 'Astro', icons: [siAstro]},
      {name: 'Tailwind', icons: [siTailwindcss]},
      {name: 'Shopify Apps', icons: [siShopify]},
      {name: 'Kotlin (Android)', icons: [siKotlin]},
    ],
  },
  {
    category: 'Data & Cloud',
    icon: '◈',
    skills: [
      {name: 'PostgreSQL & MongoDB', icons: [siPostgresql, siMongodb]},
      {name: 'Prisma & TypeORM', icons: [siPrisma, siTypeorm]},
      {name: 'AWS (EC2, S3)', icons: [cloudIcon]},
      {name: 'Docker', icons: [siDocker]},
      {name: 'Linux', icons: [siLinux]},
    ],
  },
  {
    category: 'Tools & Testing',
    icon: '⬡',
    skills: [
      {name: 'Git & GitHub Actions', icons: [siGit, siGithubactions]},
      {name: 'Jest', icons: [siJest]},
      {name: 'Swagger / OpenAPI', icons: [siSwagger]},
      {name: 'Nx / Turborepo', icons: [siNx, siTurborepo]},
      {name: 'Java & Python', icons: [siOpenjdk, siPython]},
    ],
  },
]
