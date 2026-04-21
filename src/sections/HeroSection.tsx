import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';

function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(132, 188, 73, 1)');
  gradient.addColorStop(0.3, 'rgba(80, 140, 31, 0.8)');
  gradient.addColorStop(1, 'rgba(80, 140, 31, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

function Mesh() {
  const meshRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  const particleTexture = useMemo(() => createParticleTexture(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.05;
      meshRef.current.rotation.y = time * 0.1;
    }
    if (pointsRef.current && meshRef.current) {
      pointsRef.current.rotation.x = meshRef.current.rotation.x;
      pointsRef.current.rotation.y = meshRef.current.rotation.y;
    }
    if (pointLightRef.current) {
      pointLightRef.current.intensity = Math.abs(Math.sin(time * 0.5)) * 0.5 + 0.5;
    }
  });

  return (
    <>
      <pointLight ref={pointLightRef} color="#508c1f" intensity={1} distance={20} position={[5, 5, 5]} />
      <group ref={meshRef}>
        <icosahedronGeometry args={[5, 1]} />
        <meshBasicMaterial color="#0f2a05" wireframe transparent />
        <points ref={pointsRef}>
          <icosahedronGeometry args={[5, 1]} />
          <pointsMaterial
            color="#84bc49"
            size={0.15}
            map={particleTexture}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0.8}
          />
        </points>
      </group>
      <mesh>
        <icosahedronGeometry args={[5, 1]} />
        <meshBasicMaterial color="#508c1f" wireframe transparent />
      </mesh>
    </>
  );
}

function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (state.camera) {
      state.camera.position.x += (mouse.current.x * 2 - state.camera.position.x) * 0.02;
      state.camera.position.y += (mouse.current.y * 2 - state.camera.position.y) * 0.02;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export default function HeroSection() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(row1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(row2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.65')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');

    return () => { tl.kill(); };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a1a05',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Three.js Background */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <Canvas
          gl={{ antialias: false, alpha: false }}
          camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 15] }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#0a1a05']} />
          <EffectComposer>
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.7}
              kernelSize={KernelSize.LARGE}
            />
          </EffectComposer>
          <HeroScene />
          <Mesh />
        </Canvas>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 32px',
        }}
      >
        <div ref={row1Ref} style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <h1
            style={{
              fontFamily: 'Onest, sans-serif',
              fontSize: 'clamp(42px, 8vw, 72px)',
              fontWeight: 500,
              color: '#f5f5f5',
              lineHeight: 1.2,
              letterSpacing: '-2px',
              margin: 0,
            }}
          >
            IT-аутсорсинг
          </h1>
        </div>

        <div ref={row2Ref} style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <h1
            style={{
              fontFamily: 'Onest, sans-serif',
              fontSize: 'clamp(42px, 8vw, 72px)',
              fontWeight: 500,
              color: '#508c1f',
              lineHeight: 1.2,
              letterSpacing: '-2px',
              margin: 0,
            }}
          >
            для бизнеса
          </h1>
        </div>

        <p
          ref={subtitleRef}
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            fontFamily: 'Onest, sans-serif',
            fontSize: 18,
            fontWeight: 400,
            color: '#d9d9d9',
            maxWidth: 640,
            lineHeight: 1.5,
            marginTop: 24,
          }}
        >
          Обслуживание компьютеров, серверов и сетей организаций. Работаем по договору с фиксированной ежемесячной оплатой.
        </p>

        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            display: 'flex',
            gap: 16,
            marginTop: 40,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="btn-primary">
            Рассчитать стоимость
          </a>
          <a href="tel:+74991134028" className="btn-secondary">
            Позвонить
          </a>
        </div>

        <div
          ref={statsRef}
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            display: 'flex',
            gap: 'clamp(32px, 6vw, 64px)',
            marginTop: 64,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { number: '15+', label: 'лет на рынке IT' },
            { number: '500+', label: 'обслуживаемых рабочих мест' },
            { number: '30 мин', label: 'среднее время реакции' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 'clamp(20px, 3vw, 32px)',
                  fontWeight: 500,
                  color: '#508c1f',
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#d9d9d9',
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
