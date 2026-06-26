import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SlideInMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

export default function SlideInMenu({ isOpen, onClose }: SlideInMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
      gsap.to(panelRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      itemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: 0.2 + i * 0.08,
            }
          );
        }
      });
    } else {
      gsap.to(panelRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power2.inOut',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'none',
        delay: 0.1,
      });
    }
  }, [isOpen]);

  const handleItemClick = () => {
    onClose();
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[150] pointer-events-none"
        style={{ background: 'rgba(34, 51, 59, 0.08)', opacity: 0 }}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full z-[160] flex flex-col justify-center px-10 lg:px-16"
        style={{
          width: 'clamp(280px, 40vw, 500px)',
          background: 'rgba(244, 243, 238, 0.25)',
          backdropFilter: 'blur(24px) saturate(140%)',
          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05), -4px 0 24px rgba(0, 0, 0, 0.04)',
          transform: 'translateX(100%)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-cprimary hover:opacity-60 transition-opacity"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        <div className="flex flex-col gap-6 mt-8">
          {menuItems.map((item, i) => (
            <a
              key={item.label}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              href={item.href}
              onClick={handleItemClick}
              className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-normal text-cprimary hover:text-caccentDeep transition-colors duration-300 opacity-0"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
