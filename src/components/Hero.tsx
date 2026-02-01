'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';
import { ChevronRight, Terminal, Cpu, Cloud, Settings } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite rotation for logo
      gsap.to(logoRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      // Floating particles parallax
      const particles = document.querySelectorAll('.particle');
      particles.forEach((p, i) => {
        gsap.to(p, {
          y: 'random(-100, 100)',
          x: 'random(-50, 50)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-12 relative inline-block"
        >
          {/* Central Spinning Logo */}
          <div ref={logoRef} className="w-32 h-32 md:w-48 md:h-48 relative">
            <div className="absolute inset-0 border-[3px] border-dashed border-primary/50 rounded-full animate-spin-slow" />
            <div className="absolute inset-4 border-[2px] border-secondary/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                <Settings className="w-8 h-8 md:w-12 md:h-12 text-black -rotate-45" />
              </div>
            </div>
          </div>
          
          {/* Floating Orbiting Icons */}
          <div className="absolute -top-4 -right-4 w-10 h-10 glass rounded-lg flex items-center justify-center animate-float">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <div className="absolute -bottom-2 -left-6 w-12 h-12 glass rounded-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
            <Cloud className="w-6 h-6 text-secondary" />
          </div>
          <div className="absolute top-1/2 -right-12 w-8 h-8 glass rounded-lg flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
            <Cpu className="w-4 h-4 text-accent" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-6 hero-gradient"
        >
          Build. Deploy. <br />
          <span className="text-white">Automate.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Welcome to the official DevOps Club platform. <br />
          The future of infrastructure starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <AnimatedButton size="lg" className="group">
            Join Club
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </AnimatedButton>
          <AnimatedButton variant="outline" size="lg">
            View Events
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Hero Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-0 right-0 hidden md:block"
      >
        <div className="container mx-auto px-6 flex justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System Status: Operational
          </div>
          <div>EST. 2026 // DEVOPS UNIT</div>
          <div>Uptime: 99.99%</div>
        </div>
      </motion.div>
    </section>
  );
}
