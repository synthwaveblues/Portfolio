import {useState, useEffect, useRef} from 'react';

const NAV_LINKS = ['projects', 'stack', 'experience', 'fun', 'contact'] as const;
type NavLink = typeof NAV_LINKS[number];

export default function Nav() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [light, setLight] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<NavLink | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    setLight(isLight);
    requestAnimationFrame(() => {
      toggleRef.current?.setAttribute('data-ready', '');
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY === 0;
      setScrolled(!atTop);
      if (atTop) {
        setActiveSection(null);
        history.replaceState(null, '', window.location.pathname);
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const visible = new Map<NavLink, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as NavLink;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }
        if (visible.size === 0 || window.scrollY === 0) {
          setActiveSection(null);
          history.replaceState(null, '', window.location.pathname);
          return;
        }
        const top = [...visible.entries()].reduce((a, b) => a[1] >= b[1] ? a : b)[0];
        setActiveSection(top);
        history.replaceState(null, '', `#${top}`);
      },
      {threshold: [0, 0.1, 0.25, 0.5]}
    );

    NAV_LINKS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
          <a key={s} className={`nav-link${activeSection === s ? ' nav-link-active' : ''}`} href={`#${s}`}>{s}</a>
        ))}
      </div>
      <div className="nav-right">
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
