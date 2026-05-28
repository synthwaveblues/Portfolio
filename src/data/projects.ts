export interface DemoSection {
  title: string;
  body?: string;
  items?: string[];
}

export interface Project {
  id: string;
  num: string;
  name: string;
  tagline: string;
  tags: string[];
  desc: string;
  videodesc: string;
  demoDetails?: DemoSection[];
  year: string;
  github: string;
  videoUrl: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'student-helper',
    num: '01',
    name: 'Student Helper',
    tagline: 'AI-Powered Exam Preparation Platform',
    tags: ['NestJS', 'Microservices', 'REST API', 'Gemini 2.5', 'PostgreSQL', 'TypeScript', 'OCR'],
    desc: 'Architected a microservices system with 5 autonomous services — API Gateway, Auth, CDN, Processing, and Quiz. Integrated Google Gemini 2.5 Flash for AI-generated quizzes, flashcards, and summaries from uploaded PDFs.',
    videodesc: 'A full walkthrough of the AI exam platform — uploading a PDF, triggering OCR processing, and watching Gemini generate structured quizzes and flashcards in real time.',
    demoDetails: [
      {
        title: 'Project Overview',
        body: 'A production-ready educational platform designed to automate exam preparation through a scalable, multi-service backend. The system extracts raw text from uploaded learning materials via OCR and processes it using advanced generative AI to instantly deliver structured summaries, smart flashcards, and interactive multiple-choice quizzes.',
      },
      {
        title: 'Stack',
        items: [
          'Monorepo: Turborepo · 5 microservices (Gateway, Auth, CDN, Processing, Quiz)',
          'Backend: NestJS · TypeScript · JavaScript · REST API',
          'AI & OCR: Gemini 2.5 Flash · Tesseract.js',
          'Data: PostgreSQL · TypeORM · AWS S3',
          'DevOps: Docker · Docker Compose',
          'Security: JWT · bcrypt · NestJS Guards',
        ],
      },
    ],
    year: '2025–2026',
    github: 'https://github.com/StudentHelperCom/student-helper-backend',
    videoUrl: 'https://www.youtube.com/watch?v=XUZOPHQHnKQ',
    image: 'student_helper.png',
  },
  {
    id: 'movie-checklist',
    num: '02',
    name: 'MovieChecklist',
    tagline: 'Android Movie Tracking App',
    tags: ['Kotlin', 'Android', 'Google Firebase', 'SQLite', 'MVVM'],
    desc: 'Android app for tracking movies you want to watch — and checking them off once you do. Built with modern Android architecture, Kotlin, and a sleek Material design system.',
    videodesc: 'App walkthrough on an Android device — browsing the watchlist, marking movies as watched, adding new titles, and the smooth Material animations throughout.',
    demoDetails: [
      {
        title: 'Project Overview',
        body: 'A production-ready native Android application designed to track and organize personal watchlists for movies and TV series. The app integrates real-time search using the remote TMDB API, securely synchronizes user libraries via cloud database hosting, and leverages background task workers to intelligently schedule custom local push notifications recommending randomized titles from a user\'s planned watch queue.',
      },
      {
        title: 'Stack',
        items: [
          'Architecture: MVVM · Repository Pattern · Unidirectional Data Flow (StateFlow)',
          'Frontend: Kotlin · Jetpack Compose · Material 3 · Coil',
          'Data: Room Database (SQLite) · TypeConverters · Coroutines Flow',
          'Cloud & Auth: Firebase Authentication · Firebase Firestore',
          'Networking: Retrofit · OkHttp · Gson · TMDB API',
          'DevOps: Dagger Hilt · WorkManager · ConnectivityManager',
        ],
      },
    ],
    year: '2025-2026',
    github: 'https://github.com/MiOnMu/MovieChecklist',
    videoUrl: 'https://youtube.com/shorts/DvitnGht1JI?feature=share',
    image: 'movie_checklist.png',
  },
  {
    id: 'natours',
    num: '03',
    name: 'Natours',
    tagline: 'Full-Stack Tour Booking Platform',
    tags: ['Node.js', 'JavaScript', 'Express.js', 'MongoDB', 'JWT', 'Stripe', 'REST API', 'TypeScript'],
    desc: 'Feature-rich tour booking web app with JWT authentication, role-based access control, Stripe payments, email notifications, image uploads, and a full REST API — built with the MVC pattern on Node.js and MongoDB.',
    videodesc: 'Full walkthrough of the Natours platform — browsing tours, signing up, booking a tour with Stripe checkout, managing your account, and the admin panel for tour and user management.',
    demoDetails: [
      {
        title: 'Project Overview',
        body: 'A comprehensive full-stack tour booking platform featuring server-side rendering, advanced multi-resource relationships, and secure transactional checkout workflows. The architecture utilizes a production-grade RESTful API to manage core platform data—including tours, bookings, users, and community reviews—while serving dynamic, mobile-responsive views natively through integrated server-side template compilation.',
      },
      {
        title: 'Stack',
        items: [
          'Backend: Node.js · Express · RESTful API',
          'Frontend & Build: Pug Templates · JavaScript · Parcel Bundler',
          'Database: MongoDB · Mongoose ORM',
          'Integrations: Stripe Webhooks · Nodemailer · Multer · Sharp',
          'Security: JWT · bcryptjs · Helmet · express-rate-limit · mongoSanitize · xss-clean · hpp',
        ],
      },
    ],
    year: '2026',
    github: 'https://github.com/synthwaveblues/Natours',
    videoUrl: 'https://youtu.be/QT03tw4Zv9M',
    image: 'natours.png',
  }
]
