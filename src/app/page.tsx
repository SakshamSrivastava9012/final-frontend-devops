'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion';
import { 
  Shield, Zap, Infinity, BarChart3, Globe, Code2, Terminal, Cpu, Cloud, 
  Rocket, Database, Layers, ChevronRight, Users, 
  ArrowRight, Calendar, Image as ImageIcon, Activity, Layers3, CpuIcon, Boxes, Network
} from 'lucide-react';

import AppLayout from '@/components/AppLayout';
import Modal from '@/components/Modal';
import AuthForm from '@/components/AuthForm';
import { useModalStore } from '@/lib/modalStore';
import Link from 'next/link';

// --- RESPONSIVE ANIMATED BACKGROUND ---
const BackgroundSystem = () => (
  <div className="fixed inset-0 pointer-events-none z-0 bg-[#000000] overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-20">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse delay-1000" />
    </div>
    <div className="absolute inset-0 opacity-[0.05]" 
         style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: 'clamp(40px, 5vw, 80px) clamp(40px, 5vw, 80px)' }} />
  </div>
);

// --- MODERN STAT COMPONENT ---
const StatCard = ({ value, label }: { value: string, label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="p-8 lg:p-12 glass-dark border border-white/5 rounded-3xl lg:rounded-[40px] flex flex-col items-center justify-center text-center"
    >
      <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-2">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">{label}</div>
    </motion.div>
  );
};

export default function Home() {
  const { isAuthModalOpen, closeAuthModal, authModalType } = useModalStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <AppLayout>
      <BackgroundSystem />
      
      {/* --- HERO: RESPONSIVE & BOLD --- */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-2 glass border border-white/10 rounded-full mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">Bennett University Elite Node</span>
        </motion.div>

        <div className="max-w-[90rem] mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-black leading-[1.1] lg:leading-[0.85] tracking-tight text-white mb-12"
          >
            DEVOPS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-600">CLUB</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg md:text-2xl text-white/40 font-medium leading-relaxed mb-16 px-4"
          >
            Mastering the architecture of the modern web. From CI/CD pipelines to global cloud infrastructure, we build the reliable future.
          </motion.p>
        </div>

        {/* Hero Features Bar */}
        <div className="w-full max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {[
            { t: 'Automate', i: Zap },
            { t: 'Deploy', i: Rocket },
            { t: 'Scale', i: Activity },
            { t: 'Secure', i: Shield }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-6 glass border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group">
              <item.i className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{item.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="relative z-10 py-32 px-6">
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <StatCard value="99.9%" label="Uptime" />
          <StatCard value="1.4s" label="Deploy" />
          <StatCard value="15k+" label="Logs" />
          <StatCard value="A+" label="Security" />
        </div>
      </section>

      {/* --- OPERATIONS GRID (EVENTS & GALLERY) --- */}
      <section className="relative z-10 py-32 px-6 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Operations</h2>
            <p className="text-white/30 font-medium max-w-sm">The heartbeat of our technical activity and community milestones.</p>
          </div>

          {/* Side-by-Side Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Events Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative aspect-square lg:aspect-[4/3] rounded-[40px] lg:rounded-[60px] overflow-hidden border border-white/10 bg-black"
            >
              <img 
                src="https://images.unsplash.com/photo-1558494947-860d53281829?w=1200" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" 
                alt="Events"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-end">
                <Calendar className="text-blue-500 mb-6" size={40} />
                <h3 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">Mission Logs</h3>
                <Link href="/events" className="flex items-center gap-4 text-blue-400 font-bold text-[11px] uppercase tracking-widest group-hover:gap-8 transition-all">
                  View Events <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Gallery Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative aspect-square lg:aspect-[4/3] rounded-[40px] lg:rounded-[60px] overflow-hidden border border-white/10 bg-black"
            >
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" 
                alt="Gallery"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-end">
                <ImageIcon className="text-indigo-400 mb-6" size={40} />
                <h3 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">Vault</h3>
                <Link href="/gallery" className="flex items-center gap-4 text-indigo-400 font-bold text-[11px] uppercase tracking-widest group-hover:gap-8 transition-all">
                  Access Archive <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ARCHITECTS (LEADERSHIP) --- */}
      <section className="relative z-10 py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">Architects</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            {[
  { name: 'Ayush Rathore', role: 'President', img: '/leaders/presdent.jpg' },
  { name: 'Mehek Advani', role: 'Vice President', img: '/leaders/vice_pres.jpg' },
  { name: 'Aditya Pandey', role: 'Gen Sec', img: '/leaders/gensec.webp' }
]
.map((leader, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center group text-center"
              >
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
                  <div className="absolute inset-0 rounded-[40px] border border-white/10 group-hover:border-blue-500 transition-colors" />
                  <div className="absolute inset-3 rounded-[32px] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-white/5">
                    <img src={leader.img} className="w-full h-full object-cover" alt={leader.name} />

                  </div>
                  <div className="absolute -bottom-2 right-4 glass px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-widest">Active</span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">{leader.name}</h3>
                <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em]">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- METHODOLOGY (REPLACEMENT SECTION) --- */}
      <section className="relative z-10 py-32 px-6">
        <div className="container mx-auto max-w-6xl glass rounded-[40px] md:rounded-[80px] border border-white/10 p-8 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
                System <br /> <span className="text-blue-500">Methodology</span>
              </h2>
              <div className="space-y-6">
                {[
                  { t: 'Decentralized Intelligence', d: 'Fostering a peer-to-peer ecosystem where knowledge flows without barriers.', icon: Network },
                  { t: 'Industrial Sync', d: 'Our curriculum mirrors current Big Tech infrastructure standards and toolsets.', icon: Boxes },
                  { t: 'Reliability Engineering', d: 'Teaching SRE principles to build systems that withstand massive failure.', icon: Shield }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 glass border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors">
                      <item.icon size={20} className="text-white group-hover:text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white uppercase mb-1">{item.t}</h4>
                      <p className="text-white/30 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center items-center relative">
              <motion.div 
                animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}

                className="w-full aspect-square border-2 border-dashed border-blue-500/10 rounded-full flex items-center justify-center"
              >
                <div className="w-[80%] aspect-square border border-white/5 rounded-full flex items-center justify-center">
                  <CpuIcon size={80} className="text-blue-500/20" />
                </div>
              </motion.div>
              <button className="absolute px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-2xl">
                Join System
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/5 bg-black">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CpuIcon className="text-white" size={16} />
            </div>
            <span className="text-lg font-black text-white uppercase tracking-tighter">DevOps Club</span>
          </div>
          <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] text-center md:text-left">
            Built for scalability // Bennett University 2026
          </div>
          <div className="flex gap-6">
            <button className="text-[10px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest">Connect</button>
            <button className="text-[10px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest">Source</button>
          </div>
        </div>
      </footer>

      {/* Auth Modal remains unchanged */}
      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal} title={authModalType === 'login' ? 'Authentication' : 'Registration'}>
        <AuthForm isOpen={isAuthModalOpen} onClose={closeAuthModal} type={authModalType} />
      </Modal>
    </AppLayout>
  );
}