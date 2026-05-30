import {useState, useEffect} from 'react';

const PHRASES = ['Full-Stack Developer', 'NestJS Architect', 'AI Integrator', 'Backend Engineer'] as const;

type WindowState = 'open' | 'closing' | 'closed';

export default function Hero() {
  const [typed, setTyped] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [phraseIdx, setPhraseIdx] = useState<number>(0);
  const [windowState, setWindowState] = useState<WindowState>('open');
  const [reopening, setReopening] = useState<boolean>(false);
  const [scrollHintOpacity, setScrollHintOpacity] = useState<number>(1);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true));
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero') as HTMLElement | null;
      if (!hero) return;
      const ratio = Math.min(window.scrollY / hero.offsetHeight, 1);
      setScrollHintOpacity(1 - ratio);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleRedDot = () => {
    if (windowState !== 'open') return;
    setWindowState('closing');
    setTimeout(() => setWindowState('closed'), 150);
    setTimeout(() => {
      setWindowState('open');
      setReopening(true);
      setTimeout(() => setReopening(false), 400);
    }, 950);
  };

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2400)
      }
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 40);
      } else {
        timeout = setTimeout(() => setDeleting(false));
        setPhraseIdx((phraseIdx + 1) % PHRASES.length)
      }
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, phraseIdx]);

  return (
    <section className="hero">
      <div className="hero-dot-grid"/>
      <div className="hero-glow"/>

      { /* LEFT SIDE*/}
      <div className="hero-content"
           style={{
             opacity: visible ? 1 : 0,
             transform: visible ? 'none' : 'translateY(20px)',
           }}
      >
        <div className="hero-name">
          <span className="hero-name-first">Anton</span>
          <span className="hero-name-last">Shevchenko</span>
        </div>

        <div className="hero-type-row">
          <span className="hero-prompt">$</span>
          <span>{typed}</span>
          <span className="hero-cursor">▋</span>
        </div>

        <div className="hero-bio">
          Building scalable microservices, AI-powered platforms, clean APIs and Fullstack solutions.
        </div>

        <div className="hero-button">
          <a
            href="#projects"
            className="hero-button-main"
          >
            View Projects
          </a>
          <a
            className='hero-button-secondary'
            href='/CV%20-%20Anton%20Shevchenko.pdf'
            download
          >
            Download CV ↓
          </a>
        </div>

        <div className="hero-socials">
          <a className="hero-social-link" href="mailto:synthwaveblues@gmail.com" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a className="hero-social-link" href="https://github.com/synthwaveblues" target="_blank" rel="noreferrer"
             aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a className="hero-social-link" href="https://www.linkedin.com/in/anton-shevchenko-8a4827357/" target="_blank"
             rel="noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a className="hero-social-link" href="https://t.me/synthwaveblues" target="_blank" rel="noreferrer"
             aria-label="Telegram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.12 14.063l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.696.523z"/>
            </svg>
          </a>
          <a className="hero-social-link" href="https://instagram.com/synthwaveblues" target="_blank" rel="noreferrer"
             aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
        </div>
      </div>

      { /* RIGHT SIDE*/}
      <div
        className={`hero-code-card${reopening ? ' hero-code-card-reopen' : ''}`}
        style={(() => {
          if (!visible) return {opacity: 0, transform: 'translateY(20px)'};
          if (windowState === 'closing') return {
            opacity: 0,
            transform: 'scale(0.94) translateY(6px)',
            transition: 'opacity 0.15s ease, transform 0.15s ease'
          };
          if (windowState === 'closed') return {
            opacity: 0,
            transform: 'scale(0.94)',
            transition: 'none',
            pointerEvents: 'none' as const
          };
          return {opacity: 1, transform: 'none'};
        })()}
      >
        <div className="hero-code-dots">
          {(['#ff5f57', '#febc2e', '#28c840'] as const).map((c, i) => (
            <span
              key={c}
              onClick={i === 0 ? handleRedDot : undefined}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: c,
                display: 'inline-block',
                cursor: i === 0 ? 'pointer' : 'default'
              }}
            />
          ))}
        </div>
        <pre className="hero-code-pre">{
        }<span className="ct-comment">{'// developer.ts'}</span>{'\n'
        }<span className="ct-kw">const</span>{' '}<span className="ct-var">developer</span>{' = {\n'
        }{'  name: '}<span className="ct-str">{"\"Anton Shevchenko\""}</span>{',\n'
        }{'  stack: ['}<span className="ct-str">{"\"TypeScript\""}</span>{', '}<span
          className="ct-str">{"\"NestJS\""}</span>{', '}<span className="ct-str">{"\"React\""}</span>{', '}<span
          className="ct-str">{"\"PostgreSQL\""}</span>{'],\n'
        }{'  thesis: '}<span className="ct-str">{"\"AI-Powered Exam Platform\""}</span>{',\n'
        }{'  passion: '}<span className="ct-str">{"\"systems that scale\""}</span>{',\n'
        }{'  status: '}<span className="ct-str">{"\"open_to_work ✓ \""}</span>{'\n'
        }{'};'}</pre>
      </div>

      {/* scroll hint */}
      <div className="hero-scroll-hint" style={{opacity: scrollHintOpacity}}>
        <span>SCROLL</span>
        <div className="hero-scroll-line"/>
      </div>
    </section>
  )
}