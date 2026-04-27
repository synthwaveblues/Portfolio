export interface Project {
  id: string;
  num: string;
  name: string;
  tagline: string;
  tags: string[];
  desc: string;
  videodesc: string;
  year: string;
  github: string;
  videoUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'student-helper',
    num: '01',
    name: 'Student Helper',
    tagline: 'AI-Powered Exam Preparation Platform',
    tags: ['NestJS', 'Microservices', 'Gemini 2.5', 'PostgreSQL', 'TypeScript', 'OCR'],
    desc: 'Architected a microservices system with 5 autonomous services — API Gateway, Auth, CDN, Processing, and Quiz. Integrated Google Gemini 2.5 Flash for AI-generated quizzes, flashcards, and summaries from uploaded PDFs.',
    videodesc: 'A full walkthrough of the AI exam platform — uploading a PDF, triggering OCR processing, and watching Gemini generate structured quizzes and flashcards in real time.',
    year: '2025–2026',
    github: 'https://github.com/StudentHelperCom/student-helper-backend',
    videoUrl: '',
  },
  {
    id: 'movie-checklist',
    num: '02',
    name: 'MovieChecklist',
    tagline: 'Android Movie Tracking App',
    tags: ['Kotlin', 'Android', 'Google Firebase', 'SQLite', 'MVVM'],
    desc: 'Android app for tracking movies you want to watch — and checking them off once you do. Built with modern Android architecture, Kotlin, and a sleek Material design system.',
    videodesc: 'App walkthrough on an Android device — browsing the watchlist, marking movies as watched, adding new titles, and the smooth Material animations throughout.',
    year: '2025-2026',
    github: 'https://github.com/MiOnMu/MovieChecklist',
    videoUrl: '',
  },
  {
    id: 'natours',
    num: '03',
    name: 'Natours',
    tagline: 'Full-Stack Tour Booking Platform',
    tags: ['Node.js', 'JavaScript', 'Express.js', 'MongoDB', 'JWT', 'Stripe', 'REST API', 'TypeScript'],
    desc: 'Feature-rich tour booking web app with JWT authentication, role-based access control, Stripe payments, email notifications, image uploads, and a full REST API — built with the MVC pattern on Node.js and MongoDB.',
    videodesc: 'Full walkthrough of the Natours platform — browsing tours, signing up, booking a tour with Stripe checkout, managing your account, and the admin panel for tour and user management.',
    year: '2026',
    github: 'https://github.com/synthwaveblues/Natours',
    videoUrl: '',
  }
]

export const PROJECT_ICONS: Record<string, string> = {
  'student-helper': '🎓',
  'natours': '🍃',
  'movie-checklist': '🎬',
};

export const PROJECT_LABELS: Record<string, string> = {
  'student-helper': '[ AI Platform ]',
  'natours': '[ Tour Booking App ]',
  'movie-checklist': '[ Android App ]',
};
