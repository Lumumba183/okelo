import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  onMenuOpen: () => void;
}

export default function Navigation({ onMenuOpen }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const descriptorRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: '100vh top',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (descriptorRef.current) {
      gsap.to(descriptorRef.current, {
        opacity: scrolled ? 0 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [scrolled]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 lg:px-10 z-[100] transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(244, 243, 238, 0.25)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(34, 51, 59, 0.06)' : '1px solid transparent',
      }}
    >
      <a
        href="#home"
        className="font-display text-xl tracking-tight text-cprimary hover:opacity-70 transition-opacity"
      >
        CEDIS
      </a>

      <span
        ref={descriptorRef}
        className="hidden lg:block font-body text-[11px] font-medium tracking-[0.06em] text-cprimary/60"
      >
        Clean Earth Development &amp; Investment Solutions
      </span>

      <button
        onClick={onMenuOpen}
        className="flex flex-col gap-[5px] group p-2"
        aria-label="Open menu"
      >
        <span className="block w-5 h-[1.5px] bg-cprimary transition-transform duration-300 group-hover:translate-x-1" />
        <span className="block w-5 h-[1.5px] bg-cprimary transition-transform duration-300" />
        <span className="block w-5 h-[1.5px] bg-cprimary transition-transform duration-300 group-hover:-translate-x-1" />
      </button>
    </nav>
  );
}
