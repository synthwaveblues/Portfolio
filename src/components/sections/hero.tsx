import {useState, useEffect} from 'react';

const PHRASES = ['Full-Stack Developer', 'NestJS Architect', 'AI Integrator', 'Backend Engineer'] as const;

export default function Hero() {
  const [typed, setTyped] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [phraseIdx, setPhraseIdx] = useState<number>(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true));
    return () => clearTimeout(t);
  }, [])

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
          Building scalable microservices, AI-powered platforms,<br/>
          clean APIs and Fullstack solutions.
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
            href='/cv.pdf'
            download
          >
            Download CV ↓
          </a>
        </div>
      </div>

      { /* RIGHT SIDE*/}
      <div className="hero-code-card"
           style={{
             opacity: visible ? 1 : 0,
             transform: visible ? 'none' : 'translateY(20px)',
           }}
      >
        <div className="hero-code-dots">
          {(['#ff5f57', '#febc2e', '#28c840'] as const).map(c => (
            <span
              key={c}
              style={{width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block'}}
            />
          ))}
        </div>
        <pre className="hero-code-pre">{
}<span className="ct-comment">{'// developer.ts'}</span>{'\n'
}<span className="ct-kw">const</span>{' '}<span className="ct-var">developer</span>{' = {\n'
}{'  name: '}<span className="ct-str">{"\"Anton Shevchenko\""}</span>{',\n'
}{'  stack: ['}<span className="ct-str">{"\"TypeScript\""}</span>{', '}<span className="ct-str">{"\"NestJS\""}</span>{', '}<span className="ct-str">{"\"React\""}</span>{', '}<span className="ct-str">{"\"PostgreSQL\""}</span>{'],\n'
}{'  thesis: '}<span className="ct-str">{"\"AI-Powered Exam Platform\""}</span>{',\n'
}{'  passion: '}<span className="ct-str">{"\"systems that scale\""}</span>{',\n'
}{'  status: '}<span className="ct-str">{"\"open_to_work ✓ \""}</span>{'\n'
}{'};'}</pre>
      </div>

      {/* scroll hint */}
      <div className="hero-scroll-hint">
        <span>SCROLL</span>
        <div className="hero-scroll-line"/>
      </div>
    </section>
  )
}