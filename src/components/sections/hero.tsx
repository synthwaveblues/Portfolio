import {useState, useEffect} from 'react';

const PHRASES = ['Full-Stack Developer', 'Backend Engineer', 'React Developer'] as const;

type WindowState = 'open' | 'closing' | 'closed';

export default function Hero() {
  const [typed, setTyped] = useState<string>('');
  const [deleting, setDeleting] = useState<boolean>(false);
  const [phraseIdx, setPhraseIdx] = useState<number>(0);
  const [windowState, setWindowState] = useState<WindowState>('open');
  const [reopening, setReopening] = useState<boolean>(false);
  const [scrollHintOpacity, setScrollHintOpacity] = useState<number>(1);

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

      { /* LEFT SIDE: fades in with CSS (hero.css), so it shows before React loads */}
      <div className="hero-content">
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
          Full-stack developer building scalable backends, clean APIs and modern web and mobile apps.
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
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a className="hero-social-link" href="https://github.com/synthwaveblues" target="_blank" rel="noreferrer"
             aria-label="GitHub">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a className="hero-social-link" href="https://www.linkedin.com/in/anton-shevchenko-8a4827357/" target="_blank"
             rel="noreferrer" aria-label="LinkedIn">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a className="hero-social-link" href="https://t.me/synthwaveblues" target="_blank" rel="noreferrer"
             aria-label="Telegram">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </div>
      </div>

      { /* RIGHT SIDE*/}
      <div
        className={`hero-code-card${reopening ? ' hero-code-card-reopen' : ''}`}
        style={(() => {
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
                width: 14,
                height: 14,
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
          className="ct-str">{"\"Node.js\""}</span>{', '}<span className="ct-str">{"\"React\""}</span>{', '}<span
          className="ct-str">{"\"Kotlin\""}</span>{'],\n'
        }{'  currently: '}<span className="ct-str">{"\"Full-Stack Developer\""}</span>{',\n'
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