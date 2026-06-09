'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { CoffeeCup } from '../3d/CoffeeCup';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef, Suspense } from 'react';

import Link from 'next/link';

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.hero-reveal',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power4.out' }
    );
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
            <directionalLight position={[-5, 5, 2]} intensity={0.8} />
            <pointLight position={[0, 3, -2]} intensity={0.5} />
            <CoffeeCup />
            {/* <OrbitControls enableZoom={false} /> */}
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.h1 
          className="hero-reveal text-6xl md:text-8xl font-bold mb-6 text-gradient"
        >
          Artisan Brews <br /> & Culinary Excellence
        </motion.h1>
        <motion.p 
          className="hero-reveal text-xl md:text-2xl text-[var(--cream)] opacity-80 mb-10 max-w-2xl mx-auto font-light"
        >
          Experience the intersection of luxury and taste in our immersive 3D cafe and restaurant. Crafted for the connoisseur.
        </motion.p>
        <div className="hero-reveal flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/menu" className="btn-premium flex items-center justify-center">
            Explore Menu
          </Link>
          <Link 
            href="/reservations" 
            className="px-8 py-3 rounded-full border border-[var(--primary)] text-[var(--primary)] font-medium hover:bg-[var(--primary)] hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            Book a Table
          </Link>
        </div>
      </div>

      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none" />
    </section>
  );
}
