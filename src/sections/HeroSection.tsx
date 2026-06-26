import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 1. Video fade in
      tl.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      );

      // 2. Panel slide in
      tl.fromTo(
        overlayRef.current,
        { x: '-100%' },
        { x: '0%', duration: 1.2, ease: 'power2.inOut' },
        0.2
      );

      // 3. Micro label fade up
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      // 4. Headline gradient text reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.reveal-word');
        words.forEach((word, i) => {
          tl.call(
            () => word.classList.add('visible'),
            [],
            0.8 + i * 0.15
          );
        });
      }

      // 5. Subheadline fade up
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.2
      );

      // 6. CTA fade up
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.5
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (videoRef.current) {
            gsap.set(videoRef.current, {
              y: self.progress * 150,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split headline into word spans
  const headlineWords = 'Clean Earth Development & Investment Solutions'.split(' ');

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0 }}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Liquid Glass Overlay Panel */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 h-full z-[1] flex flex-col justify-center"
        style={{
          width: '55%',
          background: 'rgba(244, 243, 238, 0.25)',
          backdropFilter: 'blur(24px) saturate(140%)',
          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow:
            'inset 0 0 0 1px rgba(255, 255, 255, 0.05), 4px 0 24px rgba(0, 0, 0, 0.04)',
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
          paddingTop: '64px',
          transform: 'translateX(-100%)',
        }}
      >
        {/* Micro label */}
        <span
          ref={labelRef}
          className="font-body text-[11px] font-medium tracking-[0.12em] text-cprimary/60 mb-6 opacity-0 uppercase"
        >
          International Development &amp; Sustainability
        </span>

        {/* Headline with gradient text reveal */}
        <h1
          ref={headlineRef}
          className="font-display font-normal text-cprimary mb-6"
          style={{
            fontSize: 'clamp(3rem, 7vw, 8rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
          }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="reveal-word mr-[0.3em]"
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="font-body text-cprimary/75 mb-8 opacity-0"
          style={{
            fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)',
            lineHeight: 1.5,
            maxWidth: '480px',
          }}
        >
          An independent consultancy partnering with governments, development
          agencies, and communities to deliver evidence-based solutions in ESG,
          environmental assessment, water security, and resilient infrastructure.
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#services"
          className="group inline-flex items-center font-body text-sm font-medium tracking-[0.03em] text-cprimary opacity-0"
        >
          <span className="relative">
            Explore Our Services
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-caccentDeep group-hover:w-full transition-all duration-300" />
          </span>
          <svg
            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Mobile overlay - simplified */}
      <div
        className="absolute bottom-0 left-0 w-full z-[2] lg:hidden"
        style={{
          height: '70vh',
          background: 'rgba(244, 243, 238, 0.85)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          borderRadius: '16px 16px 0 0',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          paddingTop: '3rem',
        }}
      >
        <span className="font-body text-[10px] font-medium tracking-[0.12em] text-cprimary/60 mb-4 block uppercase">
          International Development &amp; Sustainability
        </span>
        <h1
          className="font-display font-normal text-cprimary mb-4"
          style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          Clean Earth Development &amp; Investment Solutions
        </h1>
        <p className="font-body text-cprimary/75 mb-6 text-base leading-relaxed">
          An independent consultancy partnering with governments, development
          agencies, and communities to deliver evidence-based solutions in ESG,
          environmental assessment, water security, and resilient infrastructure.
        </p>
        <a
          href="#services"
          className="group inline-flex items-center font-body text-sm font-medium tracking-[0.03em] text-cprimary"
        >
          <span className="relative">
            Explore Our Services
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-caccentDeep group-hover:w-full transition-all duration-300" />
          </span>
        </a>
      </div>
    </section>
  );
}
