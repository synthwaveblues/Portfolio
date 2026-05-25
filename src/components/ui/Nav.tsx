import {useState, useEffect, useRef} from 'react';

const NAV_LINKS = ['projects', 'stack', 'experience', 'fun', 'contact'] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [light, setLight] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    setLight(isLight);
    // Enable transition only after state is synced — prevents animation on load
    requestAnimationFrame(() => {
      toggleRef.current?.setAttribute('data-ready', '');
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const applyTheme = (isLight: boolean) => {
    setLight(isLight);
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  };

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <span
        className="nav-logo"
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        {'<AS/>'}
      </span>
      <div className="nav-links">
        {NAV_LINKS.map(s => (
          <a key={s} className="nav-link" href={`#${s}`}>{s}</a>
        ))}
        <a
          className='nav-link'
          href='https://github.com/synthwaveblues'
          target='_blank'
          rel="noreferrer"
        >
          github ↗
        </a>
        <a
          className='nav-link'
          href='https://www.linkedin.com/in/anton-shevchenko-8a4827357/'
          target='_blank'
          rel="noreferrer"
        >
          linkedin ↗
        </a>
        <button
          ref={toggleRef}
          className="theme-toggle"
          onClick={() => applyTheme(!light)}
          aria-label="Toggle theme"
          suppressHydrationWarning
        >
          <div className="theme-toggle-track">
            <span>☾</span>
            <span>☀</span>
          </div>
          <div className="theme-toggle-thumb"/>
        </button>
      </div>
    </nav>
  );
}
