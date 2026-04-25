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
        <div className="hero-badge">
          <span className="hero-badge-dot"/>
          <span className="hero-badge-text">AVAILABLE FOR OPPORTUNITIES</span>
        </div>

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
          clean APIs and Fullstack solutions. <br/>MSc ICT · Poznan University of Technology.
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
            href='https://github.com/synthwaveblues'
            target='_blank' // open the link in a new tab or window instead of navigating away from your website
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className='hero-button-secondary'
            href='https://www.linkedin.com/in/anton-shevchenko-8a4827357/'
            target='_blank' // open the link in a new tab or window instead of navigating away from your website
            rel="noreferrer"
          >
            LinkedIn ↗
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
        <pre
          className="hero-code-pre"
          dangerouslySetInnerHTML={{
            __html: `<span style="color:#6e6e78">// developer.ts</span>
<span style="color:#d42b4c">const</span> <span style="color:#7ec8e3">developer</span> = {
  name: <span style="color:#a8d8a8">"Anton Shevchenko"</span>,
  stack: [<span style="color:#a8d8a8">"TypeScript"</span>, <span style="color:#a8d8a8">"NestJS"</span>, <span style="color:#a8d8a8">"React"</span>, <span style="color:#a8d8a8">"PostgreSQL"</span>],
  thesis: <span style="color:#a8d8a8">"AI-Powered Exam Platform"</span>,
  passion: <span style="color:#a8d8a8">"systems that scale"</span>,
  status: <span style="color:#a8d8a8">"open_to_work ✓ "</span>
};`,
          }}
        />
      </div>

      {/* scroll hint */}
      <div className="hero-scroll-hint">
        <span>SCROLL</span>
        <div className="hero-scroll-line"/>
      </div>
    </section>
  )
}