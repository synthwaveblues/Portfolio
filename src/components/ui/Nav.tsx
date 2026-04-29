import {useState, useEffect} from 'react';

const NAV_LINKS = ['projects', 'stack', 'experience', 'fun'] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <span
        className="nav-logo"
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        {'<synthwaveblues/>'}
      </span>
      <div className="nav-links">
        {NAV_LINKS.map(s => (
          <a key={s} className="nav-link" href={`#${s}`}>{s}</a>
        ))}
        <a
          className='nav-link'
          href='https://github.com/synthwaveblues'
          target='_blank' // open the link in a new tab or window instead of navigating away from your website
          rel="noreferrer" // prevent leaking referrer information to the linked site
        >
          github ↗
        </a>
        <a
          className='nav-link'
          href='https://www.linkedin.com/in/anton-shevchenko-8a4827357/'
          target='_blank' // open the link in a new tab or window instead of navigating away from your website
          rel="noreferrer" // prevent leaking referrer information to the linked site
        >
          linkedin ↗
        </a>
      </div>
    </nav>
  )
}