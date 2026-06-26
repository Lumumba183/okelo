import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normal;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
    float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + vPosition.y * 3.0);
    float alpha = fresnel * pulse * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function GeodesicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbitHintRef = useRef<HTMLSpanElement>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x22333b);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Icosahedron geometry
    const geometry = new THREE.IcosahedronGeometry(6, 2);
    const wireframe = new THREE.WireframeGeometry(geometry);

    // Shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(0xddbea9) },
        uOpacity: { value: 0.8 },
        uTime: { value: 0.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const lines = new THREE.LineSegments(wireframe, material);
    scene.add(lines);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.4;

    // Track interaction
    const onStart = () => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        if (orbitHintRef.current) {
          gsap.to(orbitHintRef.current, { opacity: 0, duration: 0.5 });
        }
      }
    };
    renderer.domElement.addEventListener('pointerdown', onStart);

    // Animation
    const clock = new THREE.Clock();
    const autoRotateSpeed = 6.0;
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      lines.rotation.y += (autoRotateSpeed * Math.PI / 180) * 0.016;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Content entrance animation
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const els = contentRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          els,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onStart);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireframe.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: '#22333B' }}
    >
      {/* WebGL Canvas */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0"
      />

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="absolute z-10 flex flex-col justify-center h-full px-[clamp(1.5rem,4vw,4rem)]"
        style={{ maxWidth: '680px' }}
      >
        <span className="animate-in block font-body text-xs font-medium tracking-[0.1em] text-caccent mb-4">
          OUR APPROACH
        </span>
        <h2
          className="animate-in font-display font-normal mb-6"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#F4F3EE',
          }}
        >
          Every System{' '}
          <span className="font-serif italic">Connected</span>
        </h2>
        <p
          className="animate-in font-body leading-relaxed mb-8"
          style={{
            fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)',
            color: 'rgba(244, 243, 238, 0.7)',
            maxWidth: '520px',
          }}
        >
          Sustainability is not a single intervention — it is an interconnected
          web of water, soil, economy, and community. Like the geodesic
          structure behind us, each element strengthens the whole.
        </p>
        <a
          href="#contact"
          className="animate-in group inline-flex items-center font-body text-sm font-medium tracking-[0.03em] text-caccent"
        >
          <span className="relative">
            Discover Our Methodology
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-caccent group-hover:w-full transition-all duration-300" />
          </span>
        </a>
      </div>

      {/* Orbit hint */}
      <span
        ref={orbitHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-body text-xs"
        style={{ color: 'rgba(244, 243, 238, 0.3)' }}
      >
        Drag to orbit
      </span>
    </section>
  );
}
