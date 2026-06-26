const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: '#22333B', padding: '3rem 0 2rem' }}
    >
      <div
        className="mx-auto px-[clamp(1.5rem,4vw,4rem)]"
        style={{ maxWidth: '1440px' }}
      >
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#home"
            className="font-display text-2xl tracking-tight"
            style={{ color: '#F4F3EE' }}
          >
            CEDIS
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm transition-colors duration-300 hover:text-[#F4F3EE]"
                style={{ color: 'rgba(244, 243, 238, 0.6)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="#"
              className="transition-colors duration-300 hover:text-[#F4F3EE]"
              style={{ color: 'rgba(244, 243, 238, 0.4)' }}
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="#"
              className="transition-colors duration-300 hover:text-[#F4F3EE]"
              style={{ color: 'rgba(244, 243, 238, 0.4)' }}
              aria-label="Twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8"
          style={{ borderTop: '1px solid rgba(244, 243, 238, 0.1)' }}
        />

        {/* Row 3 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span
            className="font-body text-xs"
            style={{ color: 'rgba(244, 243, 238, 0.4)' }}
          >
            Clean Earth Development and Investment Solutions
          </span>
          <span
            className="font-body text-xs"
            style={{ color: 'rgba(244, 243, 238, 0.4)' }}
          >
            &copy; 2026 All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
