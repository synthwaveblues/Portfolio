import { c as createComponent } from './astro-component_B1FvaBVy.mjs';
import 'piccolore';
import { r as renderTemplate, l as renderSlot, n as renderComponent, o as renderHead, m as maybeRenderHead } from './entrypoint_DlwlYHrq.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useCallback } from 'react';

const NAV_LINKS = ["projects", "stack", "experience", "fun", "contact"];
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const toggleRef = useRef(null);
  useEffect(() => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    setLight(isLight);
    requestAnimationFrame(() => {
      toggleRef.current?.setAttribute("data-ready", "");
    });
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const visible = /* @__PURE__ */ new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }
        if (visible.size === 0) {
          setActiveSection(null);
          history.replaceState(null, "", window.location.pathname);
          return;
        }
        const top = [...visible.entries()].reduce((a, b) => a[1] >= b[1] ? a : b)[0];
        setActiveSection(top);
        history.replaceState(null, "", `#${top}`);
      },
      { threshold: [0, 0.1, 0.25, 0.5] }
    );
    NAV_LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const applyTheme = (isLight) => {
    setLight(isLight);
    document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };
  return /* @__PURE__ */ jsxs("nav", { className: `nav ${scrolled ? "nav-scrolled" : ""}`, children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "nav-logo",
        onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        children: "<AS/>"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "nav-links", children: NAV_LINKS.map((s) => /* @__PURE__ */ jsx("a", { className: `nav-link${activeSection === s ? " nav-link-active" : ""}`, href: `#${s}`, children: s }, s)) }),
    /* @__PURE__ */ jsx("div", { className: "nav-right", children: /* @__PURE__ */ jsxs(
      "button",
      {
        ref: toggleRef,
        className: "theme-toggle",
        onClick: () => applyTheme(!light),
        "aria-label": "Toggle theme",
        suppressHydrationWarning: true,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "theme-toggle-track", children: [
            /* @__PURE__ */ jsx("span", { children: "☾" }),
            /* @__PURE__ */ jsx("span", { children: "☀" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "theme-toggle-thumb" })
        ]
      }
    ) })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"><head><meta charset="utf-8"><title>', `</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Anton Shevchenko — Full-Stack Developer portfolio"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><script>
    (function () {
      var t = localStorage.getItem('theme');
      if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    })();
    document.documentElement.classList.add('preload');
    window.addEventListener('DOMContentLoaded', function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.remove('preload');
      });
    });
  <\/script>`, "</head> <body> ", " ", " </body></html>"])), title, renderHead(), renderComponent($$result, "Nav", Nav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/components/ui/Nav", "client:component-export": "default" }), renderSlot($$result, $$slots["default"]));
}, "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/layouts/layout.astro", void 0);

const PHRASES = ["Full-Stack Developer", "NestJS Architect", "AI Integrator", "Backend Engineer"];
function Hero() {
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [windowState, setWindowState] = useState("open");
  const [reopening, setReopening] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true));
    return () => clearTimeout(t);
  }, []);
  const handleRedDot = () => {
    if (windowState !== "open") return;
    setWindowState("closing");
    setTimeout(() => setWindowState("closed"), 150);
    setTimeout(() => {
      setWindowState("open");
      setReopening(true);
      setTimeout(() => setReopening(false), 400);
    }, 950);
  };
  useEffect(() => {
    const current = PHRASES[phraseIdx];
    let timeout;
    if (!deleting) {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2400);
      }
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 40);
      } else {
        timeout = setTimeout(() => setDeleting(false));
        setPhraseIdx((phraseIdx + 1) % PHRASES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, phraseIdx]);
  return /* @__PURE__ */ jsxs("section", { className: "hero", children: [
    /* @__PURE__ */ jsx("div", { className: "hero-dot-grid" }),
    /* @__PURE__ */ jsx("div", { className: "hero-glow" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "hero-content",
        style: {
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "hero-name", children: [
            /* @__PURE__ */ jsx("span", { className: "hero-name-first", children: "Anton" }),
            /* @__PURE__ */ jsx("span", { className: "hero-name-last", children: "Shevchenko" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hero-type-row", children: [
            /* @__PURE__ */ jsx("span", { className: "hero-prompt", children: "$" }),
            /* @__PURE__ */ jsx("span", { children: typed }),
            /* @__PURE__ */ jsx("span", { className: "hero-cursor", children: "▋" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hero-bio", children: [
            "Building scalable microservices, AI-powered platforms,",
            /* @__PURE__ */ jsx("br", {}),
            "clean APIs and Fullstack solutions."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hero-button", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#projects",
                className: "hero-button-main",
                children: "View Projects"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                className: "hero-button-secondary",
                href: "/cv.pdf",
                download: true,
                children: "Download CV ↓"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hero-socials", children: [
            /* @__PURE__ */ jsx("a", { className: "hero-social-link", href: "mailto:synthwaveblues@gmail.com", "aria-label": "Email", children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" }) }) }),
            /* @__PURE__ */ jsx("a", { className: "hero-social-link", href: "https://github.com/synthwaveblues", target: "_blank", rel: "noreferrer", "aria-label": "GitHub", children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" }) }) }),
            /* @__PURE__ */ jsx("a", { className: "hero-social-link", href: "https://www.linkedin.com/in/anton-shevchenko-8a4827357/", target: "_blank", rel: "noreferrer", "aria-label": "LinkedIn", children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }) }),
            /* @__PURE__ */ jsx("a", { className: "hero-social-link", href: "https://t.me/synthwaveblues", target: "_blank", rel: "noreferrer", "aria-label": "Telegram", children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.12 14.063l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.696.523z" }) }) }),
            /* @__PURE__ */ jsx("a", { className: "hero-social-link", href: "https://instagram.com/synthwaveblues", target: "_blank", rel: "noreferrer", "aria-label": "Instagram", children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" }) }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `hero-code-card${reopening ? " hero-code-card-reopen" : ""}`,
        style: (() => {
          if (!visible) return { opacity: 0, transform: "translateY(20px)" };
          if (windowState === "closing") return { opacity: 0, transform: "scale(0.94) translateY(6px)", transition: "opacity 0.15s ease, transform 0.15s ease" };
          if (windowState === "closed") return { opacity: 0, transform: "scale(0.94)", transition: "none", pointerEvents: "none" };
          return { opacity: 1, transform: "none" };
        })(),
        children: [
          /* @__PURE__ */ jsx("div", { className: "hero-code-dots", children: ["#ff5f57", "#febc2e", "#28c840"].map((c, i) => /* @__PURE__ */ jsx(
            "span",
            {
              onClick: i === 0 ? handleRedDot : void 0,
              style: { width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block", cursor: i === 0 ? "pointer" : "default" }
            },
            c
          )) }),
          /* @__PURE__ */ jsxs("pre", { className: "hero-code-pre", children: [
            /* @__PURE__ */ jsx("span", { className: "ct-comment", children: "// developer.ts" }),
            "\n",
            /* @__PURE__ */ jsx("span", { className: "ct-kw", children: "const" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "ct-var", children: "developer" }),
            " = {\n",
            "  name: ",
            /* @__PURE__ */ jsx("span", { className: "ct-str", children: '"Anton Shevchenko"' }),
            ",\n",
            "  stack: [",
            /* @__PURE__ */ jsx("span", { className: "ct-str", children: '"TypeScript"' }),
            ", ",
            /* @__PURE__ */ jsx("span", { className: "ct-str", children: '"NestJS"' }),
            ", ",
            /* @__PURE__ */ jsx("span", { className: "ct-str", children: '"React"' }),
            ", ",
            /* @__PURE__ */ jsx("span", { className: "ct-str", children: '"PostgreSQL"' }),
            "],\n",
            "  thesis: ",
            /* @__PURE__ */ jsx("span", { className: "ct-str", children: '"AI-Powered Exam Platform"' }),
            ",\n",
            "  passion: ",
            /* @__PURE__ */ jsx("span", { className: "ct-str", children: '"systems that scale"' }),
            ",\n",
            "  status: ",
            /* @__PURE__ */ jsx("span", { className: "ct-str", children: '"open_to_work ✓ "' }),
            "\n",
            "};"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-scroll-hint", children: [
      /* @__PURE__ */ jsx("span", { children: "SCROLL" }),
      /* @__PURE__ */ jsx("div", { className: "hero-scroll-line" })
    ] })
  ] });
}

const PROJECTS = [
  {
    id: "student-helper",
    num: "01",
    name: "Student Helper",
    tagline: "AI-Powered Exam Preparation Platform",
    tags: ["NestJS", "Microservices", "Gemini 2.5", "PostgreSQL", "TypeScript", "OCR"],
    desc: "Architected a microservices system with 5 autonomous services — API Gateway, Auth, CDN, Processing, and Quiz. Integrated Google Gemini 2.5 Flash for AI-generated quizzes, flashcards, and summaries from uploaded PDFs.",
    videodesc: "A full walkthrough of the AI exam platform — uploading a PDF, triggering OCR processing, and watching Gemini generate structured quizzes and flashcards in real time.",
    demoDetails: [
      {
        title: "Project Overview",
        body: "A production-ready educational platform designed to automate exam preparation through a scalable, multi-service backend. The system extracts raw text from uploaded learning materials via OCR and processes it using advanced generative AI to instantly deliver structured summaries, smart flashcards, and interactive multiple-choice quizzes."
      },
      {
        title: "Technical Architecture & Stack",
        items: [
          "Architecture: Monorepo managed by Turborepo coordinating 5 decoupled microservices (Gateway, Auth, CDN, Processing, Quiz).",
          "Core Framework: NestJS & TypeScript utilizing strict type-checking and decoupled local packages (@repo/common, @repo/database).",
          "AI & Parsing: Google Gemini 2.5 Flash API for structured content generation and Tesseract.js for local optical character recognition.",
          "Data & Storage: PostgreSQL handled via TypeORM alongside AWS S3 for secure, distributed document hosting.",
          "DevOps: Fully containerized via Docker & Docker Compose featuring automated service health checking, custom network bridging, and strict resource capping."
        ]
      }
    ],
    year: "2025–2026",
    github: "https://github.com/StudentHelperCom/student-helper-backend",
    videoUrl: "https://www.youtube.com/watch?v=XUZOPHQHnKQ",
    image: "student_helper.png"
  },
  {
    id: "movie-checklist",
    num: "02",
    name: "MovieChecklist",
    tagline: "Android Movie Tracking App",
    tags: ["Kotlin", "Android", "Google Firebase", "SQLite", "MVVM"],
    desc: "Android app for tracking movies you want to watch — and checking them off once you do. Built with modern Android architecture, Kotlin, and a sleek Material design system.",
    videodesc: "App walkthrough on an Android device — browsing the watchlist, marking movies as watched, adding new titles, and the smooth Material animations throughout.",
    year: "2025-2026",
    github: "https://github.com/MiOnMu/MovieChecklist",
    videoUrl: "https://youtube.com/shorts/DvitnGht1JI?feature=share",
    image: "movie_checklist.png"
  },
  {
    id: "natours",
    num: "03",
    name: "Natours",
    tagline: "Full-Stack Tour Booking Platform",
    tags: ["Node.js", "JavaScript", "Express.js", "MongoDB", "JWT", "Stripe", "REST API", "TypeScript"],
    desc: "Feature-rich tour booking web app with JWT authentication, role-based access control, Stripe payments, email notifications, image uploads, and a full REST API — built with the MVC pattern on Node.js and MongoDB.",
    videodesc: "Full walkthrough of the Natours platform — browsing tours, signing up, booking a tour with Stripe checkout, managing your account, and the admin panel for tour and user management.",
    year: "2026",
    github: "https://github.com/synthwaveblues/Natours",
    videoUrl: "https://youtu.be/QT03tw4Zv9M",
    image: "natours.png"
  }
];

function VideoPanel({ project, onClose }) {
  const isYoutube = project.videoUrl && (project.videoUrl.includes("youtube") || project.videoUrl.includes("youtu.be"));
  const isVideo = project.videoUrl && !isYoutube;
  return /* @__PURE__ */ jsxs("div", { className: "demo-panel", children: [
    /* @__PURE__ */ jsx("div", { className: "demo-panel-header", children: /* @__PURE__ */ jsx("span", { className: "demo-panel-close", onClick: onClose, children: "×" }) }),
    /* @__PURE__ */ jsxs("div", { className: "demo-panel-body", children: [
      /* @__PURE__ */ jsx("div", { className: "demo-video-wrap", children: isYoutube ? /* @__PURE__ */ jsx(
        "iframe",
        {
          src: project.videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/").replace("youtube.com/shorts/", "youtube.com/embed/").split("?")[0],
          className: "demo-iframe",
          allow: "autoplay; fullscreen"
        }
      ) : isVideo ? /* @__PURE__ */ jsx("video", { src: project.videoUrl, controls: true, className: "demo-video" }) : /* @__PURE__ */ jsxs("div", { className: "demo-placeholder", children: [
        /* @__PURE__ */ jsx("div", { className: "demo-placeholder-icon", children: "▶" }),
        /* @__PURE__ */ jsx("div", { className: "demo-placeholder-text", children: "video placeholder" }),
        /* @__PURE__ */ jsxs("div", { className: "demo-placeholder-sub", children: [
          "set ",
          /* @__PURE__ */ jsx("code", { children: "videoUrl" }),
          " in ",
          /* @__PURE__ */ jsx("code", { children: "projects.ts" })
        ] })
      ] }) }),
      project.demoDetails ? /* @__PURE__ */ jsx("div", { className: "demo-desc demo-desc-rich", children: project.demoDetails.map((section, i) => /* @__PURE__ */ jsxs("div", { className: "demo-section", children: [
        /* @__PURE__ */ jsx("div", { className: "demo-section-title", children: section.title }),
        section.body && /* @__PURE__ */ jsx("p", { className: "demo-section-body", children: section.body }),
        section.items && /* @__PURE__ */ jsx("ul", { className: "demo-section-list", children: section.items.map((item, j) => /* @__PURE__ */ jsxs("li", { className: "demo-section-item", children: [
          /* @__PURE__ */ jsx("span", { className: "demo-section-bullet", children: "—" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, j)) })
      ] }, i)) }) : /* @__PURE__ */ jsx("p", { className: "demo-desc", children: project.videodesc })
    ] })
  ] });
}
function ProjectCard({ project, isOpen, onToggle }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `project-card ${isOpen ? "project-card-open" : ""}`,
      "data-project-id": project.id,
      onClick: onToggle,
      children: /* @__PURE__ */ jsxs("div", { className: "project-card-inner", children: [
        /* @__PURE__ */ jsx("div", { className: "project-thumbnail", children: project.image ? /* @__PURE__ */ jsx("img", { src: project.image, alt: project.name, className: "project-thumbnail-img" }) : /* @__PURE__ */ jsx("span", { className: "project-thumbnail-placeholder", children: "no preview" }) }),
        /* @__PURE__ */ jsx("div", { className: "project-name", children: project.name }),
        /* @__PURE__ */ jsx("div", { className: "project-tagline", children: project.tagline }),
        /* @__PURE__ */ jsx("div", { className: "project-desc", children: project.desc }),
        /* @__PURE__ */ jsx("div", { className: "project-tags", children: project.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "project-tag", children: tag }, tag)) }),
        /* @__PURE__ */ jsxs("div", { className: "project-footer", children: [
          /* @__PURE__ */ jsx("span", { className: "project-year", children: project.year }),
          /* @__PURE__ */ jsx("span", { className: "project-demo-btn", children: isOpen ? "↑ close demo" : "↓ live demo" })
        ] })
      ] })
    }
  );
}
function getCols() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}
function Projects() {
  const [openId, setOpenId] = useState(null);
  const [displayId, setDisplayId] = useState(null);
  const [cols, setCols] = useState(getCols);
  const demoRef = useRef(null);
  const colsRef = useRef(cols);
  useEffect(() => {
    const update = () => {
      const next = getCols();
      if (next !== colsRef.current) {
        colsRef.current = next;
        setCols(next);
        setOpenId(null);
        setDisplayId(null);
      }
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const panelRef = useCallback((el) => {
    demoRef.current = el;
  }, []);
  const waitForClose = (el, cb) => {
    const onEnd = (e) => {
      if (e.propertyName !== "max-height") return;
      el.removeEventListener("transitionend", onEnd);
      cb();
    };
    el.addEventListener("transitionend", onEnd);
  };
  const close = () => {
    const card = openId ? document.querySelector(`[data-project-id="${openId}"]`) : null;
    setOpenId(null);
    if (card) {
      const top = card.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    const el = demoRef.current;
    if (el) {
      waitForClose(el, () => setDisplayId(null));
    } else {
      setTimeout(() => setDisplayId(null), 300);
    }
  };
  const scrollToPanel = () => {
    const el = demoRef.current;
    if (!el) return;
    waitForClose(el, () => {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };
  const toggle = (id) => {
    if (id === openId) {
      close();
      return;
    }
    const wasOpen = !!openId;
    if (colsRef.current === 3) {
      setOpenId(id);
      setDisplayId(id);
      if (!wasOpen) scrollToPanel();
    } else {
      setOpenId(null);
      setDisplayId(id);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setOpenId(id);
          const el = demoRef.current;
          if (el) {
            waitForClose(el, () => {
              const top = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top, behavior: "smooth" });
            });
          }
        });
      });
    }
  };
  const displayProject = PROJECTS.find((p) => p.id === displayId);
  const displayIndex = displayId ? PROJECTS.findIndex((p) => p.id === displayId) : -1;
  const openRowIdx = displayIndex >= 0 ? Math.floor(displayIndex / cols) : -1;
  const renderGrid = () => {
    if (cols === 3) {
      return PROJECTS.map((p) => /* @__PURE__ */ jsx(ProjectCard, { project: p, isOpen: openId === p.id, onToggle: () => toggle(p.id) }, p.id));
    }
    const items = [];
    PROJECTS.forEach((p, i) => {
      items.push(
        /* @__PURE__ */ jsx(ProjectCard, { project: p, isOpen: openId === p.id, onToggle: () => toggle(p.id) }, p.id)
      );
      const rowIdx = Math.floor(i / cols);
      const isLastInRow = (i + 1) % cols === 0 || i === PROJECTS.length - 1;
      if (isLastInRow) {
        const isThisOpen = rowIdx === openRowIdx && !!openId;
        items.push(
          /* @__PURE__ */ jsx("div", { style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ jsx(
            "div",
            {
              ref: rowIdx === openRowIdx ? panelRef : void 0,
              className: `demo-panel-wrap${isThisOpen ? " demo-panel-wrap-open" : ""}`,
              children: rowIdx === openRowIdx && displayProject && /* @__PURE__ */ jsx(VideoPanel, { project: displayProject, onClose: close })
            }
          ) }, `panel-row-${rowIdx}`)
        );
      }
    });
    return items;
  };
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "projects-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-label", children: [
      /* @__PURE__ */ jsx("span", { className: "section-label-slash", children: "//" }),
      /* @__PURE__ */ jsx("span", { className: "section-label-text", children: "FEATURED WORK" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section-title", children: "Projects" }),
    /* @__PURE__ */ jsx("div", { className: "projects-grid", children: renderGrid() }),
    cols === 3 && /* @__PURE__ */ jsx(
      "div",
      {
        ref: panelRef,
        className: `demo-panel-wrap${openId ? " demo-panel-wrap-open" : ""}`,
        children: displayProject && /* @__PURE__ */ jsx(VideoPanel, { project: displayProject, onClose: close })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "projects-footer", children: [
      /* @__PURE__ */ jsx("span", { className: "projects-footer-text", children: "..and even more on my " }),
      /* @__PURE__ */ jsx("a", { className: "projects-footer-link", href: "https://github.com/synthwaveblues", target: "_blank", rel: "noreferrer", children: "GitHub" }),
      /* @__PURE__ */ jsx("span", { className: "projects-footer-text", children: ":)" })
    ] })
  ] }) });
}

const TECH_STACK = [
  {
    category: "Fullstack & Architecture",
    icon: "{}",
    skills: [
      { name: "JavaScript & TypeScript", level: 90 },
      { name: "Node.js", level: 87 },
      { name: "Microservices & Monorepos", level: 80 },
      { name: "HTML5 & CSS3", level: 80 },
      { name: "Websockets", level: 65 },
      { name: "System Security (JWT/ACID)", level: 70 }
    ]
  },
  {
    category: "Frameworks & Libraries",
    icon: "⚙",
    skills: [
      { name: "NestJS", level: 90 },
      { name: "React", level: 78 },
      { name: "Astro", level: 75 },
      { name: "Express", level: 80 },
      { name: "Bun & Hono", level: 70 }
    ]
  },
  {
    category: "Data & Cloud",
    icon: "◈",
    skills: [
      { name: "PostgreSQL", level: 82 },
      { name: "TypeORM", level: 80 },
      { name: "Prisma", level: 72 },
      { name: "MongoDB", level: 65 },
      { name: "AWS S3", level: 60 }
    ]
  },
  {
    category: "Tools & DevOps",
    icon: "⬡",
    skills: [
      { name: "Docker", level: 80 },
      { name: "GitHub Actions (CI/CD)", level: 70 },
      { name: "Linux / Bash", level: 75 },
      { name: "Git / GitHub", level: 88 },
      { name: "Swagger / OpenAPI", level: 75 },
      { name: "Jest", level: 60 }
    ]
  }
];

function SkillBar({ skill, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(skill.level), delay);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [skill.level, delay]);
  return /* @__PURE__ */ jsxs("div", { className: "skill-row", ref, children: [
    /* @__PURE__ */ jsxs("div", { className: "skill-name-row", children: [
      /* @__PURE__ */ jsx("span", { className: "skill-name", children: skill.name }),
      /* @__PURE__ */ jsxs(
        "span",
        {
          className: "skill-level",
          style: { opacity: width > 0 ? 1 : 0 },
          children: [
            skill.level,
            "%"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "skill-bar-bg", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "skill-bar-fill",
        style: {
          width: `${width}%`,
          transition: `width 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`
        }
      }
    ) })
  ] });
}
function CategoryCard({ category, cardIndex }) {
  return /* @__PURE__ */ jsxs("div", { className: "category-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "category-card-header", children: [
      /* @__PURE__ */ jsx("span", { className: "category-card-icon", children: category.icon }),
      /* @__PURE__ */ jsx("span", { className: "category-card-title", children: category.category })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "category-card-skills", children: category.skills.map((skill, skillIndex) => /* @__PURE__ */ jsx(
      SkillBar,
      {
        skill,
        delay: cardIndex * 80 + skillIndex * 60
      },
      skill.name
    )) })
  ] });
}
function TechStack() {
  return /* @__PURE__ */ jsx("section", { id: "stack", className: "techstack-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-label", children: [
      /* @__PURE__ */ jsx("span", { className: "section-label-slash", children: "//" }),
      /* @__PURE__ */ jsx("span", { className: "section-label-text", children: "PROFICIENCY" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section-title", children: "Tech Stack" }),
    /* @__PURE__ */ jsx("div", { className: "tech-grid", children: TECH_STACK.map((cat, index) => /* @__PURE__ */ jsx(
      CategoryCard,
      {
        category: cat,
        cardIndex: index
      },
      cat.category
    )) })
  ] }) });
}

const EXPERIENCE = [
  {
    company: "Sysmo.pl",
    role: "Backend Developer Intern",
    period: "Jul 2025 – Sep 2025",
    location: "Poznań, Poland",
    points: [
      "Contributed to commercial web apps using NestJS and PostgreSQL, focusing on modular architecture and scalable database design.",
      "Developed and extended RESTful API endpoints with strict DTO validation and TypeORM-managed migrations.",
      "Integrated external services and optimized DB queries to improve response times."
    ]
  },
  {
    company: "Poznan University of Technology",
    role: "Student Projects & Practices",
    period: "Oct 2022 – Present",
    location: "Poznań, Poland",
    points: [
      "Architected and deployed a microservices-based AI platform (Engineer's Thesis) with high availability through service isolation.",
      "Collaborated in team and solo projects across diverse task types.",
      "Developed software and hardware compatibility solutions."
    ]
  }
];
const EDUCATION = [
  {
    school: "Poznan University of Technology",
    degree: "Master of Science — ICT",
    period: "Mar 2026 – Present",
    detail: "Major: Artificial Intelligence & Machine Learning"
  },
  {
    school: "Poznan University of Technology",
    degree: "Engineer — ICT",
    period: "Oct 2022 – Feb 2026",
    detail: 'Thesis: "Student Helper — AI-Powered Exam Preparation Platform"'
  }
];

function ExperienceCard({ item, visible, index }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "timeline-item",
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "timeline-dot" }),
        /* @__PURE__ */ jsxs("div", { className: "timeline-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "timeline-meta", children: [
            /* @__PURE__ */ jsx("span", { className: "timeline-period", children: item.period }),
            /* @__PURE__ */ jsx("span", { className: "timeline-location", children: item.location })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "timeline-company", children: item.company }),
          /* @__PURE__ */ jsx("div", { className: "timeline-role", children: item.role }),
          /* @__PURE__ */ jsx("ul", { className: "timeline-points", children: item.points.map((point, i) => /* @__PURE__ */ jsx("li", { className: "timeline-point", children: point }, i)) })
        ] })
      ]
    }
  );
}
function EducationCard({ item, visible, index }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "timeline-item",
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "timeline-dot" }),
        /* @__PURE__ */ jsxs("div", { className: "timeline-content", children: [
          /* @__PURE__ */ jsx("div", { className: "timeline-meta", children: /* @__PURE__ */ jsx("span", { className: "timeline-period", children: item.period }) }),
          /* @__PURE__ */ jsx("div", { className: "timeline-company", children: item.school }),
          /* @__PURE__ */ jsx("div", { className: "timeline-role", children: item.degree }),
          /* @__PURE__ */ jsx("p", { className: "timeline-detail", children: item.detail })
        ] })
      ]
    }
  );
}
function Timeline() {
  const [visibleItems, setVisibleItems] = useState(/* @__PURE__ */ new Set());
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute("data-index");
            if (indexAttr) {
              const idx = Number(indexAttr);
              setVisibleItems((prev) => /* @__PURE__ */ new Set([...prev, idx]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach((ref) => ref && obs.observe(ref));
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("section", { id: "experience", className: "timeline-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-label", children: [
      /* @__PURE__ */ jsx("span", { className: "section-label-slash", children: "//" }),
      /* @__PURE__ */ jsx("span", { className: "section-label-text", children: "BACKGROUND" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section-title", children: "Experience & Education" }),
    /* @__PURE__ */ jsxs("div", { className: "timeline-cols", children: [
      /* @__PURE__ */ jsxs("div", { className: "timeline-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "timeline-col-header", children: [
          /* @__PURE__ */ jsx("span", { className: "timeline-col-title", children: "Work Experience" }),
          /* @__PURE__ */ jsx("div", { className: "timeline-col-line" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "timeline-col-body", children: EXPERIENCE.map((item, index) => /* @__PURE__ */ jsx(
          "div",
          {
            ref: (el) => {
              refs.current[index] = el;
            },
            "data-index": index,
            children: /* @__PURE__ */ jsx(
              ExperienceCard,
              {
                item,
                index,
                visible: visibleItems.has(index)
              }
            )
          },
          `exp-${index}`
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "timeline-col-header", children: [
          /* @__PURE__ */ jsx("span", { className: "timeline-col-title", children: "Education" }),
          /* @__PURE__ */ jsx("div", { className: "timeline-col-line" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "timeline-col-body", children: EDUCATION.map((item, index) => {
          const globalIndex = index + EXPERIENCE.length;
          return /* @__PURE__ */ jsx(
            "div",
            {
              ref: (el) => {
                refs.current[globalIndex] = el;
              },
              "data-index": globalIndex,
              children: /* @__PURE__ */ jsx(
                EducationCard,
                {
                  item,
                  index: globalIndex,
                  visible: visibleItems.has(globalIndex)
                }
              )
            },
            `edu-${index}`
          );
        }) })
      ] })
    ] })
  ] }) });
}

function SpotifyWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const fetchData = async () => {
    try {
      const res = await fetch("/api/spotify");
      const json = await res.json();
      setData(json);
      setProgress(json.progress ?? 0);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3e4);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!data?.isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1e3, data.duration));
    }, 1e3);
    return () => clearInterval(interval);
  }, [data?.isPlaying, data?.duration]);
  const progressPct = data ? progress / data.duration * 100 : 0;
  const formatMs = (ms) => {
    const totalSecs = Math.floor(ms / 1e3);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "spotify-card", children: /* @__PURE__ */ jsxs("div", { className: "spotify-loading", children: [
      /* @__PURE__ */ jsx("span", { className: "spotifн-loading-dot" }),
      /* @__PURE__ */ jsx("span", { children: "Connecting to Spotify..." })
    ] }) });
  }
  if (!data?.title) {
    return /* @__PURE__ */ jsx("div", { className: "spotify-card", children: /* @__PURE__ */ jsx("div", { className: "spotify-offline", children: "nothing playing right now" }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fz-card-label", children: data.isPlaying ? "Now Playing" : "Played Recently" }),
    /* @__PURE__ */ jsxs("div", { className: "spotify-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "spotify-top", children: [
        /* @__PURE__ */ jsx("a", { href: data.songUrl, target: "_blank", rel: "noopener noreferrer", className: "spotify-album-art", children: data.albumArt ? /* @__PURE__ */ jsx("img", { src: data.albumArt, alt: "album art", className: "spotify-album-img" }) : /* @__PURE__ */ jsx("div", { className: "spotify-album-note", children: "♪" }) }),
        /* @__PURE__ */ jsxs("div", { className: "spotify-info", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: data.songUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "spotify-title",
              children: data.title
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "spotify-artist", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: data.artistUrl ?? void 0,
                target: "_blank",
                rel: "noreferrer",
                className: "spotify-meta-link",
                children: data.artist
              }
            ),
            " · ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: data.albumUrl ?? void 0,
                target: "_blank",
                rel: "noreferrer",
                className: "spotify-meta-link",
                children: data.album
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "spotify-progress-bar", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "spotify-progress-fill",
              style: { width: `${progressPct}%` }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "spotify-time", children: [
            /* @__PURE__ */ jsx("span", { children: formatMs(progress) }),
            /* @__PURE__ */ jsx("span", { children: formatMs(data.duration) })
          ] })
        ] })
      ] }),
      data.nextTrack && /* @__PURE__ */ jsxs("div", { className: "spotify-adjacent", children: [
        /* @__PURE__ */ jsx("div", { className: "spotify-adjacent-label", children: data.isPlaying ? "next in queue" : "played before" }),
        /* @__PURE__ */ jsxs("div", { className: "spotify-adjacent-row", children: [
          /* @__PURE__ */ jsx("a", { href: data.nextTrack.songUrl, target: "_blank", rel: "noreferrer", className: "spotify-adjacent-art", children: data.nextTrack.albumArt ? /* @__PURE__ */ jsx("img", { src: data.nextTrack.albumArt, alt: data.nextTrack.album }) : /* @__PURE__ */ jsx("span", { children: "♪" }) }),
          /* @__PURE__ */ jsxs("div", { className: "spotify-adjacent-info", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: data.nextTrack.songUrl,
                target: "_blank",
                rel: "noreferrer",
                className: "spotify-adjacent-title",
                children: data.nextTrack.title
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "spotify-adjacent-artist", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: data.nextTrack.artistUrl ?? void 0,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "spotify-meta-link",
                  children: data.nextTrack.artist
                }
              ),
              " · ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: data.nextTrack.albumUrl ?? void 0,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "spotify-meta-link",
                  children: data.nextTrack.album
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "spotify-branding", children: "spotify api · 2026" })
    ] })
  ] });
}

const SKILLS = [
  { label: "TypeScript", value: 0.9 },
  { label: "NestJS", value: 0.88 },
  { label: "PostgreSQL", value: 0.82 },
  { label: "React", value: 0.75 },
  { label: "Docker", value: 0.72 },
  { label: "Testing", value: 0.7 },
  { label: "Android", value: 0.62 },
  { label: "Cloud/AWS", value: 0.65 }
];
const CX = 130, CY = 130, R = 95;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1];
const DURATION = 500;
function SkillRadar() {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setProgress(eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const n = SKILLS.length;
  const getPoint = (i, val) => {
    const angle = i / n * 2 * Math.PI - Math.PI / 2;
    return [CX + Math.cos(angle) * R * val, CY + Math.sin(angle) * R * val];
  };
  const polyPoints = SKILLS.map((s, i) => getPoint(i, s.value * progress)).map(([x, y]) => `${x},${y}`).join(" ");
  return /* @__PURE__ */ jsx("div", { ref, className: "radar-wrap", children: /* @__PURE__ */ jsxs("svg", { width: 260, height: 260, style: { overflow: "visible" }, children: [
    GRID_LEVELS.map((level) => /* @__PURE__ */ jsx(
      "polygon",
      {
        points: SKILLS.map((_, i) => getPoint(i, level).join(",")).join(" "),
        fill: "none",
        stroke: "var(--border)",
        strokeWidth: 1
      },
      level
    )),
    SKILLS.map((_, i) => {
      const [x2, y2] = getPoint(i, 1);
      return /* @__PURE__ */ jsx("line", { x1: CX, y1: CY, x2, y2, stroke: "var(--border)", strokeWidth: 1 }, i);
    }),
    /* @__PURE__ */ jsx(
      "polygon",
      {
        points: polyPoints,
        fill: "rgba(212,43,76,0.15)",
        stroke: "var(--cherry)",
        strokeWidth: 2
      }
    ),
    SKILLS.map((s, i) => {
      const [x, y] = getPoint(i, s.value * progress);
      return /* @__PURE__ */ jsx("circle", { cx: x, cy: y, r: 3.5, fill: "var(--bg)", stroke: "var(--cherry)", strokeWidth: 2 }, i);
    }),
    SKILLS.map((s, i) => {
      const [x, y] = getPoint(i, 1.22);
      return /* @__PURE__ */ jsx(
        "text",
        {
          x,
          y,
          textAnchor: "middle",
          dominantBaseline: "middle",
          style: { fontFamily: "var(--mono)", fontSize: 10, fill: "var(--text-dim)" },
          children: s.label
        },
        i
      );
    })
  ] }) });
}

const CODE_SENTENCES = [
  "git push origin main",
  "npm run dev",
  "docker compose up -d",
  "SELECT * FROM users",
  "const x = await fetch(url)",
  "git commit -m 'fix: bug'",
  "git stash pop",
  "npm install --save-dev",
  "git checkout -b feature/auth",
  "console.log('hello world')",
  "throw new Error('not implemented')",
  "ALTER TABLE users ADD COLUMN age INT",
  "docker ps -a",
  "curl -X POST /api/login",
  "return res.status(200).json(data)",
  "git rebase -i HEAD~3",
  "export default function App()",
  "jest --watch --coverage"
];
function TypingGame() {
  const [gameState, setGameState] = useState("idle");
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);
  const [demoText, setDemoText] = useState("");
  const [demoIdx, setDemoIdx] = useState(0);
  const [demoDeleting, setDemoDeleting] = useState(false);
  useEffect(() => {
    if (gameState !== "idle") return;
    const current = CODE_SENTENCES[demoIdx];
    let timeout;
    if (!demoDeleting) {
      if (demoText.length < current.length) {
        timeout = setTimeout(() => setDemoText(current.slice(0, demoText.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setDemoDeleting(true), 1800);
      }
    } else {
      if (demoText.length > 0) {
        timeout = setTimeout(() => setDemoText(current.slice(0, demoText.length - 1)), 25);
      } else {
        setDemoDeleting(false);
        setDemoIdx((i) => (i + 1) % CODE_SENTENCES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [demoText, demoDeleting, demoIdx, gameState]);
  const sentence = CODE_SENTENCES[sentenceIdx];
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setElapsed(startTime ? Date.now() - startTime : 0);
    }, 100);
    return () => clearInterval(interval);
  }, [gameState, startTime]);
  const start = () => {
    setGameState("playing");
    setTyped("");
    setErrors(0);
    setElapsed(0);
    const now = Date.now();
    setStartTime(now);
    setWpm(null);
    setAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 50);
  };
  const handleInput = (e) => {
    const val = e.target.value;
    setTyped(val);
    const errs = val.split("").filter((c, i) => c !== sentence[i]).length;
    setErrors(errs);
    setAccuracy(Math.max(0, Math.round((1 - errs / Math.max(val.length, 1)) * 100)));
    if (val.length >= sentence.length) {
      const elapsed2 = (Date.now() - startTime) / 1e3 / 60;
      const words = sentence.split(" ").length;
      setWpm(Math.round(words / elapsed2));
      setGameState("done");
    }
  };
  const next = () => {
    setSentenceIdx((i) => (i + 1) % CODE_SENTENCES.length);
    start();
  };
  return /* @__PURE__ */ jsxs("div", { className: "typing-wrap", children: [
    gameState === "idle" && /* @__PURE__ */ jsxs("div", { className: "typing-idle", children: [
      /* @__PURE__ */ jsx("div", { className: "typing-sentence", children: CODE_SENTENCES[demoIdx].split("").map((char, i) => {
        const isTyped = i < demoText.length;
        const isCursor = i === demoText.length;
        return /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              color: isTyped ? "var(--text)" : "var(--text-muted)",
              position: "relative",
              borderBottom: isCursor ? "2px solid var(--cherry)" : "none",
              background: isCursor ? "var(--cherry-dim)" : "transparent"
            },
            children: char
          },
          i
        );
      }) }),
      /* @__PURE__ */ jsx("p", { className: "typing-idle-text", children: "How fast do you type code?" }),
      /* @__PURE__ */ jsx("button", { onClick: start, className: "typing-start-btn", children: "Start Test" })
    ] }),
    (gameState === "playing" || gameState === "done") && /* @__PURE__ */ jsxs("div", { className: "typing-active", children: [
      /* @__PURE__ */ jsx("div", { className: "typing-go-label", children: "TYPE! TYPE! TYPE!" }),
      /* @__PURE__ */ jsx("div", { className: "typing-sentence", children: sentence.split("").map((char, i) => {
        let color = "var(--text-muted)";
        if (i < typed.length) {
          color = typed[i] === char ? "var(--text)" : "var(--cherry)";
        }
        const isCursor = i === typed.length && gameState === "playing";
        return /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              color,
              position: "relative",
              borderBottom: isCursor ? "2px solid var(--cherry)" : "none",
              background: isCursor ? "var(--cherry-dim)" : "transparent"
            },
            children: char
          },
          i
        );
      }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: inputRef,
          value: typed,
          onChange: handleInput,
          disabled: gameState === "done",
          className: "typing-input",
          placeholder: "type the snippet above…",
          autoComplete: "off",
          autoCorrect: "off",
          autoCapitalize: "off",
          spellCheck: false
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "typing-stats", children: [["WPM", wpm ?? "—"], ["Accuracy", `${accuracy}%`], ["Errors", errors], ["Time", `${(elapsed / 1e3).toFixed(1)}s`]].map(([label, value]) => /* @__PURE__ */ jsxs("div", { className: "typing-stat", children: [
        /* @__PURE__ */ jsx("div", { className: "typing-stat-label", children: label }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "typing-stat-value",
            style: { color: label === "Errors" && errors > 0 ? "var(--cherry)" : "var(--text)" },
            children: value
          }
        )
      ] }, label)) }),
      /* @__PURE__ */ jsx("div", { className: "typing-done", children: gameState === "done" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "typing-done-label", children: "✓ complete!" }),
        /* @__PURE__ */ jsx("button", { onClick: next, className: "typing-next-btn", children: "Next →" })
      ] }) })
    ] })
  ] });
}

const COMMANDS = {
  help: () => [
    { t: "comment", v: "// available commands" },
    { t: "cmd", v: "about" },
    { t: "cmd", v: "skills" },
    { t: "cmd", v: "projects" },
    { t: "cmd", v: "contact" },
    { t: "cmd", v: "github" },
    { t: "cmd", v: "clear" }
  ],
  about: () => [
    { t: "text", v: "Anton Shevchenko — Full-Stack Developer" },
    { t: "text", v: "MSc ICT @ Poznan University of Technology" },
    { t: "text", v: "Passionate about microservices, AI integration," },
    { t: "text", v: "and building systems that scale." }
  ],
  skills: () => [
    { t: "text", v: "TypeScript · NestJS · PostgreSQL · Docker" },
    { t: "text", v: "React · GraphQL · REST · Microservices" },
    { t: "text", v: "Jest · AWS S3 · GitHub Actions · Prisma" }
  ],
  projects: () => [
    { t: "text", v: "[1] Student Helper — AI exam prep platform" },
    { t: "text", v: "[2] Ad Portal API — classifieds backend" },
    { t: "text", v: "[3] MovieChecklist — Android Kotlin app" }
  ],
  contact: () => [
    { t: "link", v: "github.com/synthwaveblues", href: "https://github.com/synthwaveblues" },
    { t: "link", v: "linkedin.com/in/anton-shevchenko-8a4827357", href: "https://linkedin.com/in/anton-shevchenko-8a4827357" }
  ],
  github: () => {
    window.open("https://github.com/synthwaveblues", "_blank");
    return [{ t: "text", v: "opening github..." }];
  },
  clear: () => "__clear__"
};
const LINE_COLORS = {
  comment: "var(--text-dim)",
  text: "var(--text)",
  error: "var(--cherry)",
  cmd: "#7ec8e3",
  input: "var(--text)",
  link: "#5ecf8a"
};
function Terminal({ onClose }) {
  const [lines, setLines] = useState([
    { t: "comment", v: "// welcome to anton's terminal. type 'help'" }
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);
  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [...lines, { t: "input", v: trimmed }];
    if (trimmed === "") {
      setLines(newLines);
      return;
    }
    const fn = COMMANDS[trimmed];
    if (!fn) {
      setLines([...newLines, { t: "error", v: `command not found: ${trimmed}. try 'help'` }]);
    } else {
      const result = fn();
      if (result === "__clear__") {
        setLines([]);
      } else {
        setLines([...newLines, ...result]);
      }
    }
    setHistory((h) => [trimmed, ...h.slice(0, 19)]);
    setHistIdx(-1);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      const ni = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(ni);
      setInput(history[ni] || "");
    } else if (e.key === "ArrowDown") {
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni);
      setInput(ni === -1 ? "" : history[ni]);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "game-overlay", onClick: (e) => e.target === e.currentTarget && onClose(), children: /* @__PURE__ */ jsxs("div", { className: "terminal-window", children: [
    /* @__PURE__ */ jsxs("div", { className: "terminal-titlebar", children: [
      /* @__PURE__ */ jsx("div", { className: "terminal-dots", children: ["#ff5f57", "#febc2e", "#28c840"].map((c, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "terminal-dot",
          style: { background: c, cursor: i === 0 ? "pointer" : "default" },
          onClick: i === 0 ? onClose : void 0
        },
        c
      )) }),
      /* @__PURE__ */ jsx("span", { className: "terminal-title", children: "anton@portfolio ~" }),
      /* @__PURE__ */ jsx("div", { style: { width: 54 } })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "terminal-body",
        onClick: () => inputRef.current?.focus(),
        children: [
          lines.map((line, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "terminal-line",
              style: { color: LINE_COLORS[line.t] || "var(--text)" },
              children: [
                line.t === "input" && /* @__PURE__ */ jsx("span", { style: { color: "var(--cherry)" }, children: "❯ " }),
                line.t === "cmd" && /* @__PURE__ */ jsx("span", { style: { color: "var(--text-muted)" }, children: "  › " }),
                line.t === "link" ? /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: line.href,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "terminal-link",
                    children: line.v
                  }
                ) : line.v
              ]
            },
            i
          )),
          /* @__PURE__ */ jsxs("div", { className: "terminal-input-row", children: [
            /* @__PURE__ */ jsx("span", { className: "terminal-prompt", children: "❯" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: inputRef,
                autoFocus: true,
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown,
                className: "terminal-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { ref: bottomRef })
        ]
      }
    )
  ] }) });
}

const CELL = 18, COLS = 22, ROWS = 18;
const DIR = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0]
};
function SnakeGame({ onClose }) {
  const [snake, setSnake] = useState([[5, 5], [4, 5], [3, 5]]);
  const [food, setFood] = useState([15, 9]);
  const [gameState, setGameState] = useState("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const nextDir = useRef([1, 0]);
  const canvasRef = useRef(null);
  const randFood = (s) => {
    let pos;
    do {
      pos = [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)];
    } while (s.some(([x, y]) => x === pos[0] && y === pos[1]));
    return pos;
  };
  const reset = () => {
    const s = [[5, 5], [4, 5], [3, 5]];
    setSnake(s);
    nextDir.current = [1, 0];
    setFood(randFood(s));
    setScore(0);
    setGameState("playing");
  };
  useEffect(() => {
    const onKey = (e) => {
      if (!DIR[e.key]) return;
      e.preventDefault();
      const [dx, dy] = DIR[e.key];
      const [cx, cy] = nextDir.current;
      if (dx !== -cx || dy !== -cy) nextDir.current = [dx, dy];
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const [dx, dy] = nextDir.current;
        const head = [
          (prev[0][0] + dx + COLS) % COLS,
          (prev[0][1] + dy + ROWS) % ROWS
        ];
        if (prev.some(([x, y]) => x === head[0] && y === head[1])) {
          setGameState("dead");
          setScore((s) => {
            setBest((b) => Math.max(b, s));
            return s;
          });
          return prev;
        }
        let newSnake;
        setFood((f) => {
          if (head[0] === f[0] && head[1] === f[1]) {
            newSnake = [head, ...prev];
            setScore((s) => s + 10);
            return randFood([head, ...prev]);
          }
          newSnake = [head, ...prev.slice(0, -1)];
          return f;
        });
        return newSnake || [head, ...prev.slice(0, -1)];
      });
    }, 120);
    return () => clearInterval(interval);
  }, [gameState]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const isLight = document.documentElement.dataset.theme === "light";
    const W = COLS * CELL, H = ROWS * CELL;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = isLight ? "#e0e0e8" : "#0a0a0e";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = isLight ? "#cacad6" : "#1a1a22";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0);
      ctx.lineTo(x * CELL, H);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL);
      ctx.lineTo(W, y * CELL);
      ctx.stroke();
    }
    ctx.fillStyle = "#d42b4c";
    ctx.beginPath();
    ctx.arc(food[0] * CELL + CELL / 2, food[1] * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    snake.forEach(([x, y], i) => {
      const ratio = i / snake.length;
      ctx.fillStyle = i === 0 ? "#d42b4c" : `rgba(212,43,76,${0.9 - ratio * 0.6})`;
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(x * CELL + pad, y * CELL + pad, CELL - pad * 2, CELL - pad * 2, i === 0 ? 4 : 3);
      ctx.fill();
    });
  }, [snake, food]);
  return /* @__PURE__ */ jsx("div", { className: "game-overlay", onClick: (e) => e.target === e.currentTarget && onClose(), children: /* @__PURE__ */ jsxs("div", { className: "snake-window", children: [
    /* @__PURE__ */ jsxs("div", { className: "terminal-titlebar", children: [
      /* @__PURE__ */ jsx("div", { className: "terminal-dots", children: ["#ff5f57", "#febc2e", "#28c840"].map((c, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "terminal-dot",
          style: { background: c, cursor: i === 0 ? "pointer" : "default" },
          onClick: i === 0 ? onClose : void 0
        },
        c
      )) }),
      /* @__PURE__ */ jsx("span", { className: "terminal-title", children: "snake.exe" }),
      /* @__PURE__ */ jsxs("span", { className: "snake-score", children: [
        "score: ",
        score,
        " · best: ",
        best
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "inline-block" }, children: [
      /* @__PURE__ */ jsx(
        "canvas",
        {
          ref: canvasRef,
          width: COLS * CELL,
          height: ROWS * CELL,
          style: { display: "block" }
        }
      ),
      gameState !== "playing" && /* @__PURE__ */ jsxs("div", { className: "snake-overlay", children: [
        gameState === "dead" && /* @__PURE__ */ jsx("div", { className: "snake-game-over", children: "GAME OVER" }),
        /* @__PURE__ */ jsx("button", { onClick: reset, className: "snake-start-btn", children: gameState === "idle" ? "Start Game" : "Play Again" }),
        /* @__PURE__ */ jsx("div", { className: "snake-hint", children: "use arrow keys" })
      ] })
    ] })
  ] }) });
}

function FunZone() {
  const [openGame, setOpenGame] = useState(null);
  return /* @__PURE__ */ jsxs("section", { id: "fun", className: "fz-section", children: [
    /* @__PURE__ */ jsxs("div", { className: "fz-inner", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-label", children: [
        /* @__PURE__ */ jsx("span", { className: "section-label-slash", children: "//" }),
        /* @__PURE__ */ jsx("span", { className: "section-label-text", children: "INTERACTIVE" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "section-title", children: "Fun Zone" }),
      /* @__PURE__ */ jsxs("div", { className: "fz-grid", children: [
        /* @__PURE__ */ jsx("div", { className: "fz-card", children: /* @__PURE__ */ jsx(SpotifyWidget, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "fz-card", children: [
          /* @__PURE__ */ jsx("div", { className: "fz-card-label", children: "Skill Radar" }),
          /* @__PURE__ */ jsx(SkillRadar, {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "fz-card", children: [
          /* @__PURE__ */ jsx("div", { className: "fz-card-label", children: "Typing Speed Game" }),
          /* @__PURE__ */ jsx(TypingGame, {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "fz-egg-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "fz-egg-card", onClick: () => setOpenGame("terminal"), children: [
            /* @__PURE__ */ jsx("span", { className: "fz-egg-icon", children: ">_" }),
            /* @__PURE__ */ jsx("div", { className: "fz-egg-title", children: "Terminal" }),
            /* @__PURE__ */ jsx("div", { className: "fz-egg-sub", children: "click to open" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "fz-egg-card", onClick: () => setOpenGame("snake"), children: [
            /* @__PURE__ */ jsx("span", { className: "fz-egg-icon", children: "~>" }),
            /* @__PURE__ */ jsx("div", { className: "fz-egg-title", children: "Snake" }),
            /* @__PURE__ */ jsx("div", { className: "fz-egg-sub", children: "click to open" })
          ] })
        ] })
      ] })
    ] }),
    openGame === "terminal" && /* @__PURE__ */ jsx(Terminal, { onClose: () => setOpenGame(null) }),
    openGame === "snake" && /* @__PURE__ */ jsx(SnakeGame, { onClose: () => setOpenGame(null) })
  ] });
}

const CONTACT_ROWS = [
  { label: "mail", value: "synthwaveblues@gmail.com" },
  { label: "location", value: "Poznań, Poland / Remote" },
  { label: "languages", value: "English · Polish · Ukrainian" },
  { label: "github", value: "github.com/synthwaveblues", href: "https://github.com/synthwaveblues" },
  { label: "linkedin", value: "linkedin.com/in/anton-shevchenko", href: "https://www.linkedin.com/in/anton-shevchenko-8a4827357/" },
  { label: "telegram", value: "@synthwaveblues", href: "https://t.me/synthwaveblues" },
  { label: "instagram", value: "@synthwaveblues", href: "https://instagram.com/synthwaveblues" }
];
const ASCII_ART = String.raw`                      __  .__                              ___.   .__
  _________.__. _____/  |_|  |____  _  _______ ___  __ ____\_ |__ |  |  __ __   ____   ______
 /  ___<   |  |/    \   __\  |  \ \/ \/ /\__  \\  \/ // __ \| __ \|  | |  |  \_/ __ \ /  ___/
 \___ \ \___  |   |  \  | |   Y  \     /  / __ \\   /\  ___/| \_\ \  |_|  |  /\  ___/ \___ \
/____  >/ ____|___|  /__| |___|  /\/\_/  (____  /\_/  \___  >___  /____/____/  \___  >____  >
     \/ \/         \/          \/             \/          \/    \/                 \/     \/ `;
function Contact() {
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "contact-section", children: /* @__PURE__ */ jsxs("div", { className: "fz-inner", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-label", children: [
      /* @__PURE__ */ jsx("span", { className: "section-label-slash", children: "//" }),
      /* @__PURE__ */ jsx("span", { className: "section-label-text", children: "CONTACT" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section-title", children: "Get in Touch" }),
    /* @__PURE__ */ jsxs("div", { className: "contact-grid", children: [
      /* @__PURE__ */ jsx("div", { className: "contact-rows", children: CONTACT_ROWS.map(({ label, value, href }) => /* @__PURE__ */ jsxs("div", { className: "contact-row", children: [
        /* @__PURE__ */ jsx("span", { className: "contact-row-label", children: label }),
        href ? /* @__PURE__ */ jsx(
          "a",
          {
            href,
            target: href.startsWith("mailto") ? void 0 : "_blank",
            rel: "noreferrer",
            className: "contact-row-value contact-row-link",
            children: value
          }
        ) : /* @__PURE__ */ jsx("span", { className: "contact-row-value", children: value })
      ] }, label)) }),
      /* @__PURE__ */ jsxs("div", { className: "contact-aside", children: [
        /* @__PURE__ */ jsxs("p", { className: "contact-blurb", children: [
          "Open to full-time roles, freelance projects,",
          /* @__PURE__ */ jsx("br", {}),
          "and interesting collabs. Let's build something."
        ] }),
        /* @__PURE__ */ jsx("pre", { className: "contact-art", children: ASCII_ART })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "contact-footer", children: [
      /* @__PURE__ */ jsx("span", { className: "contact-footer-logo", children: "<AS/>" }),
      /* @__PURE__ */ jsx("span", { className: "contact-footer-built", children: "Built with Astro & React" }),
      /* @__PURE__ */ jsx("span", { className: "contact-footer-copy", children: "© 2026 Anton Shevchenko" })
    ] })
  ] }) });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Anton Shevchenko - Full-Stack Developer" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p style="
    color: white;
    padding: 2rem;
  "></p> ${renderComponent($$result2, "Hero", Hero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/components/sections/hero.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Projects", Projects, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/components/sections/projects.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "TechStack", TechStack, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/components/sections/techStack", "client:component-export": "default" })} ${renderComponent($$result2, "Timeline", Timeline, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/components/sections/timeline.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "FunZone", FunZone, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/components/sections/FunZone/FunZone.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Contact", Contact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/components/sections/Contact.tsx", "client:component-export": "default" })} ` })}`;
}, "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/synthwaveblues/WebstormProjects/my-portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
