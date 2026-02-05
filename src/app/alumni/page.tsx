'use client';

import { motion } from 'framer-motion';
import { 
  ExternalLink,
  GraduationCap,
  Terminal,
  Layers
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';

export default function AlumniPage() {
  return (
    <AppLayout>
      <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">

        {/* Glow Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <GraduationCap className="w-3 h-3" />
              Legacy of Excellence
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-black mb-6 tracking-tighter"
            >
              Alumni <span className="neon-text-blue">Unit</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
            >
              This space will showcase engineers who began their DevOps journey here
              and went on to build real-world infrastructure.
            </motion.p>
          </div>

          {/* Coming Soon Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-[48px] border border-white/5 p-20 text-center max-w-3xl mx-auto"
          >
            <Layers className="w-16 h-16 mx-auto mb-6 text-primary opacity-80" />

            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Alumni Section <span className="text-primary">Coming Soon</span>
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              Our DevOps legacy is still being written.
              Once our first batch of engineers graduate into industry,
              their profiles and journeys will appear here.
            </p>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-16 glass-dark rounded-[56px] border border-white/5 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                Are you a <span className="text-primary">Legacy Operator?</span>
              </h2>

              <p className="text-muted-foreground mb-12 max-w-xl mx-auto text-lg leading-relaxed">
                Join our alumni network once launched and help mentor the next wave
                of DevOps engineers.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <button className="px-10 py-5 bg-primary text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-primary/20">
                  Join Alumni Unit
                </button>

                <button className="px-10 py-5 glass text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/5 hover:scale-105 transition-all">
                  Become Mentor
                </button>
              </div>
            </div>

            <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none">
              <Terminal className="w-32 h-32" />
            </div>
          </motion.div>

        </div>
      </div>
    </AppLayout>
  );
}
