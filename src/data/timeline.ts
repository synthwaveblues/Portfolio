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
  {
    company: 'Poznan University of Technology',
    role: 'Student Projects & Practices',
    period: 'Oct 2022 – Present',
    location: 'Poznań, Poland',
    points: [
      "Architected and deployed a microservices-based AI platform (Engineer's Thesis) with high availability through service isolation.",
      'Collaborated in team and solo projects across diverse task types.',
      'Developed software and hardware compatibility solutions.',
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