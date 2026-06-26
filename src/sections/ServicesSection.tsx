import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'ESG Consultancy',
    description:
      'Strategic environmental, social, and governance advisory to align business operations with global sustainability standards and stakeholder expectations.',
    tags: ['Strategy', 'Reporting', 'Compliance'],
    image: '/images/service-1.jpg',
  },
  {
    number: '02',
    title: 'Environmental & Social Impact Assessments',
    description:
      'Comprehensive ESIA studies that identify, predict, and evaluate potential environmental and social effects of development projects.',
    tags: ['Assessment', 'Mitigation', 'Monitoring'],
    image: '/images/service-2.jpg',
  },
  {
    number: '03',
    title: 'Water Security & WASH',
    description:
      'Integrated water resource management, hydrology, and Water, Sanitation & Hygiene programming for resilient communities.',
    tags: ['Hydrology', 'Sanitation', 'Programming'],
    image: '/images/service-3.jpg',
  },
  {
    number: '04',
    title: 'Circular & Blue Economics',
    description:
      'Transforming waste into value through circular economy models and sustainable blue economy frameworks for coastal and marine resources.',
    tags: ['Waste Management', 'Marine', 'Innovation'],
    image: '/images/service-4.jpg',
  },
  {
    number: '05',
    title: 'Resilience & Livelihoods',
    description:
      'Soil engineering technology, pollution monitoring, remediation, and climate-resilient livelihoods programming for vulnerable communities.',
    tags: ['Engineering', 'Remediation', 'Livelihoods'],
    image: '/images/service-5.jpg',
  },
  {
    number: '06',
    title: 'Construction Project Management',
    description:
      'End-to-end construction project management from planning and procurement to execution and handover, ensuring quality, timeline, and budget adherence.',
    tags: ['Planning', 'Procurement', 'Execution'],
    image: '/images/service-6.jpg',
  },
  {
    number: '07',
    title: 'Site Management',
    description:
      'Day-to-day construction site management coordinating labour, materials, equipment, and subcontractors to deliver safe and efficient project outcomes.',
    tags: ['Coordination', 'Supervision', 'Quality Control'],
    image: '/images/service-7.jpg',
  },
  {
    number: '08',
    title: 'Health, Safety & Environment',
    description:
      'Comprehensive HSE management including risk assessments, safety audits, incident investigation, and compliance monitoring for construction and industrial sites.',
    tags: ['Risk Assessment', 'Safety Audits', 'Compliance'],
    image: '/images/service-8.jpg',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        const headerEls = headerRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          headerEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Horizontal scroll (desktop only)
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        if (!trackRef.current || !sectionRef.current) return;

        const totalWidth = trackRef.current.scrollWidth - window.innerWidth * 0.6;

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          animation: gsap.to(trackRef.current, {
            x: -totalWidth,
            ease: 'none',
          }),
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * services.length),
              services.length - 1
            );
            if (newIndex !== currentIndexRef.current) {
              currentIndexRef.current = newIndex;
              setActiveIndex(newIndex);
            }
          },
        });

        return () => {
          st.kill();
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full pt-[clamp(4rem,10vh,8rem)] bg-white"
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-16 px-6">
        <span className="animate-in block font-body text-xs font-medium tracking-[0.1em] text-caccentDeep mb-4">
          WHAT WE DO
        </span>
        <h2
          className="animate-in font-display font-normal text-cprimary"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Comprehensive Sustainability Solutions
        </h2>
      </div>

      {/* Desktop: Horizontal scroll with sticky image */}
      <div className="hidden lg:flex relative" style={{ height: '100vh' }}>
        {/* Sticky Image */}
        <div
          ref={imageContainerRef}
          className="w-[40%] flex-shrink-0 relative"
          style={{ padding: '0 2rem' }}
        >
          <div className="sticky top-[20vh] h-[60vh] overflow-hidden rounded-lg">
            {services.map((service, i) => (
              <img
                key={i}
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: activeIndex === i ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-8 pl-8"
          style={{ height: '100vh', paddingRight: '20vw' }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card flex-shrink-0 flex flex-col justify-between rounded-lg p-[clamp(2rem,4vw,3rem)]"
              style={{
                width: '50vw',
                height: '70vh',
                background: '#F4F3EE',
              }}
            >
              <div>
                <span
                  className="block font-display font-normal text-caccent/40 mb-6"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1 }}
                >
                  {service.number}
                </span>
                <h3
                  className="font-display font-normal text-cprimary mb-4"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {service.title}
                </h3>
                <p className="font-body text-cprimary/70 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs font-medium tracking-[0.04em] text-caccentDeep px-3.5 py-1.5 rounded-full"
                    style={{ background: 'rgba(221, 190, 169, 0.2)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical card stack */}
      <div className="lg:hidden px-6 pb-16 space-y-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="rounded-lg p-6"
            style={{ background: '#F4F3EE' }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <span className="block font-display text-5xl font-normal text-caccent/40 mb-4">
              {service.number}
            </span>
            <h3 className="font-display text-xl font-normal text-cprimary mb-3">
              {service.title}
            </h3>
            <p className="font-body text-cprimary/70 leading-relaxed mb-4 text-sm">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs font-medium tracking-[0.04em] text-caccentDeep px-3 py-1 rounded-full"
                  style={{ background: 'rgba(221, 190, 169, 0.2)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
