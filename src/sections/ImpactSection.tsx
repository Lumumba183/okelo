import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 12, suffix: '', label: 'Countries Served' },
  { value: 25, suffix: '+', label: 'Years of Expertise' },
  { value: 50, suffix: 'K+', label: 'Lives Impacted' },
];

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!numbersRef.current) return;

      const numberEls = numbersRef.current.querySelectorAll('.stat-number');
      const labelEls = labelsRef.current?.querySelectorAll('.stat-label');

      numberEls.forEach((el) => {
        const target = parseInt(el.getAttribute('data-value') || '0', 10);
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(proxy.val).toString();
          },
        });
      });

      if (labelEls) {
        gsap.fromTo(
          labelEls,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.2,
            delay: 1.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
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
      ref={sectionRef}
      className="w-full py-[clamp(4rem,10vh,8rem)]"
      style={{ background: '#F4F3EE' }}
    >
      <div
        className="mx-auto px-[clamp(1.5rem,4vw,4rem)]"
        style={{ maxWidth: '1440px' }}
      >
        <div
          ref={numbersRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div
                className="border-t pt-6 mb-2"
                style={{ borderColor: 'rgba(221, 190, 169, 0.3)' }}
              >
                <span
                  className="stat-number font-display font-normal text-cprimary"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: 1,
                  }}
                  data-value={stat.value}
                >
                  0
                </span>
                <span
                  className="font-display font-normal text-cprimary"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: 1,
                  }}
                >
                  {stat.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          ref={labelsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <span className="stat-label font-body text-sm text-cprimary/60 opacity-0">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
