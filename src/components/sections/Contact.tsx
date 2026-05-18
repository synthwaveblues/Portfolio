const CONTACT_ROWS = [
  {label: 'mail', value: 'synthwaveblues@gmail.com'},
  {label: 'location', value: 'Poznań, Poland / Remote'},
  {label: 'languages', value: 'English · Polish · Ukrainian'},
  {label: 'github', value: 'github.com/synthwaveblues', href: 'https://github.com/synthwaveblues'},
  {
    label: 'linkedin',
    value: 'linkedin.com/in/anton-shevchenko',
    href: 'https://www.linkedin.com/in/anton-shevchenko-8a4827357/'
  },
] as const;

const ASCII_ART = String.raw`                      __  .__                              ___.   .__
  _________.__. _____/  |_|  |____  _  _______ ___  __ ____\_ |__ |  |  __ __   ____   ______
 /  ___<   |  |/    \   __\  |  \ \/ \/ /\__  \\  \/ // __ \| __ \|  | |  |  \_/ __ \ /  ___/
 \___ \ \___  |   |  \  | |   Y  \     /  / __ \\   /\  ___/| \_\ \  |_|  |  /\  ___/ \___ \
/____  >/ ____|___|  /__| |___|  /\/\_/  (____  /\_/  \___  >___  /____/____/  \___  >____  >
     \/ \/         \/          \/             \/          \/    \/                 \/     \/ `;

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="fz-inner">
        <div className="section-label">
          <span className="section-label-slash">//</span>
          <span className="section-label-text">CONTACT</span>
        </div>
        <div className="section-title">Get in Touch</div>

        <div className="contact-grid">

          <div className="contact-rows">
            {CONTACT_ROWS.map(({label, value, href}) => (
              <div key={label} className="contact-row">
                <span className="contact-row-label">{label}</span>
                {href
                  ? <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer"
                       className="contact-row-value contact-row-link">{value}</a>
                  : <span className="contact-row-value">{value}</span>
                }
              </div>
            ))}
          </div>

          <div className="contact-aside">
            <p className="contact-blurb">
              Open to full-time roles, freelance projects,<br/>
              and interesting collabs. Let's build something.
            </p>
            <pre className="contact-art">{ASCII_ART}</pre>
          </div>

        </div>

        <div className="contact-footer">
          <span className="contact-footer-logo">{'<AS/>'}</span>
          <span className="contact-footer-built">Built with Astro &amp; React</span>
          <span className="contact-footer-copy">© 2025 Anton Shevchenko</span>
        </div>
      </div>
    </section>
  );
}
