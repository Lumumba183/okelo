import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        const els = leftRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          els,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — would connect to backend
    alert('Thank you for your message. We will get back to you shortly.');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-[clamp(4rem,10vh,8rem)]"
      style={{ background: '#FFFFFF' }}
    >
      <div
        className="mx-auto px-[clamp(1.5rem,4vw,4rem)]"
        style={{ maxWidth: '1200px' }}
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left column */}
          <div ref={leftRef} className="lg:w-1/2">
            <span className="animate-in block font-body text-xs font-medium tracking-[0.1em] text-caccentDeep mb-4">
              GET IN TOUCH
            </span>
            <h2
              className="animate-in font-display font-normal text-cprimary mb-10"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              Let's Build Something Sustainable
            </h2>

            <div className="animate-in mb-2">
              <h3
                className="font-display font-normal text-cprimary"
                style={{
                  fontSize: 'clamp(1.3rem, 2vw, 2rem)',
                  lineHeight: 1.15,
                }}
              >
                Roy Okoth Okello
              </h3>
              <p className="font-body text-cprimary/60">
                Director, CEDIS
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+254725814211"
                className="animate-in flex items-center gap-3 font-body text-cprimary hover:text-caccentDeep transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CB997E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +254 725 814 211
              </a>

              <a
                href="mailto:royfrokello@yahoo.com"
                className="animate-in flex items-center gap-3 font-body text-cprimary hover:text-caccentDeep transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CB997E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                royfrokello@yahoo.com
              </a>

              <a
                href="mailto:roy.okoth.okello@gmail.com"
                className="animate-in flex items-center gap-3 font-body text-cprimary hover:text-caccentDeep transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CB997E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                roy.okoth.okello@gmail.com
              </a>
            </div>

            <p className="animate-in mt-8 font-body text-sm font-medium text-cprimary/80">
              Clean Earth Development and Investment Solutions
            </p>
          </div>

          {/* Right column - Form */}
          <div ref={rightRef} className="lg:w-1/2 opacity-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block font-body text-xs font-medium text-cprimary/60 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b py-3 font-body text-cprimary outline-none transition-colors focus:border-caccentDeep"
                  style={{ borderColor: 'rgba(34, 51, 59, 0.2)' }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-cprimary/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b py-3 font-body text-cprimary outline-none transition-colors focus:border-caccentDeep"
                  style={{ borderColor: 'rgba(34, 51, 59, 0.2)' }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-cprimary/60 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-transparent border-b py-3 font-body text-cprimary outline-none transition-colors resize-none focus:border-caccentDeep"
                  style={{ borderColor: 'rgba(34, 51, 59, 0.2)' }}
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full lg:w-auto font-body text-sm font-medium tracking-[0.03em] px-10 py-4 rounded-md transition-colors duration-300"
                style={{
                  background: '#22333B',
                  color: '#F4F3EE',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#CB997E';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#22333B';
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
