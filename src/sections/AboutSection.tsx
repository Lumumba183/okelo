import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column elements
      if (leftColRef.current) {
        const leftEls = leftColRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          leftEls,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Right column image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-[clamp(4rem,10vh,8rem)]"
      style={{ background: '#F4F3EE' }}
    >
      <div className="mx-auto px-[clamp(1.5rem,4vw,4rem)]" style={{ maxWidth: '1440px' }}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left column */}
          <div ref={leftColRef} className="lg:w-[45%]">
            <span className="animate-in block font-body text-xs font-medium tracking-[0.1em] text-caccentDeep mb-4 uppercase">
              Independent Consultancy
            </span>
            <h2
              className="animate-in font-display font-normal text-cprimary mb-8"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              International Development &amp; Sustainability
            </h2>
            <p className="animate-in font-body text-cprimary/80 leading-relaxed mb-6">
              We are an independent consultancy dedicated to international
              development and sustainability. Led by Roy Okoth Okello, we
              partner with governments, development agencies, and communities
              to deliver lasting impact through evidence-based environmental
              solutions.
            </p>
            <p className="animate-in font-body text-cprimary/80 leading-relaxed mb-8">
              From ESG strategy to water security, from soil engineering to blue
              economics — our multidisciplinary approach integrates science,
              policy, and local knowledge to address the complex challenges
              facing our planet.
            </p>
            <a
              href="#approach"
              className="animate-in group inline-flex items-center font-body text-sm font-medium tracking-[0.03em] text-cprimary"
            >
              <span className="relative">
                Learn More About Our Approach
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-caccentDeep group-hover:w-full transition-all duration-300" />
              </span>
            </a>
          </div>

          {/* Right column */}
          <div className="lg:w-[55%] flex items-center">
            <img
              ref={imageRef}
              src="/images/about-img.jpg"
              alt="Aerial view of lush green forest canopy with morning mist and winding river"
              className="w-full object-cover rounded-lg opacity-0"
              style={{
                aspectRatio: '4/3',
                boxShadow: '0 20px 60px rgba(34, 51, 59, 0.08)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
