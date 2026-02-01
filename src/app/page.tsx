'use client';

import Hero from '@/components/Hero';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Infinity, 
  BarChart3, 
  Globe, 
  Code2, 
  Terminal, 
  Cpu, 
  Cloud, 
  Rocket, 
  Database, 
  Layers, 
  ChevronRight,
  Quote,
  HelpCircle,
  Users,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  GraduationCap
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import Modal from '@/components/Modal';
import AuthForm from '@/components/AuthForm';
import { useModalStore } from '@/lib/modalStore';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

const features = [
  {
    title: 'Continuous Innovation',
    description: 'Automate everything from infrastructure to deployment with cutting-edge tools.',
    icon: Infinity,
    color: 'text-primary',
    glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
  },
  {
    title: 'Cloud Native',
    description: 'Scalable, resilient architectures built for the modern multi-cloud ecosystem.',
    icon: Globe,
    color: 'text-secondary',
    glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
  },
  {
    title: 'Security First',
    description: 'DevSecOps integrated into the core of every pipeline for maximum reliability.',
    icon: Shield,
    color: 'text-accent',
    glow: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
  },
  {
    title: 'Real-time Metrics',
    description: 'Advanced observability and monitoring to keep systems performing at peak.',
    icon: BarChart3,
    color: 'text-green-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]'
  },
  {
    title: 'Infrastructure as Code',
    description: 'Version-controlled infrastructure that deploys in seconds, not days.',
    icon: Code2,
    color: 'text-orange-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]'
  },
  {
    title: 'High Performance',
    description: 'Lightning-fast delivery cycles optimized for rapid growth and scaling.',
    icon: Zap,
    color: 'text-yellow-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]'
  },
];
const clubLeaders = [
  { name: 'Saksham Srivastava', role: 'President', image: '/leaders/leader1.jpg' },
  { name: 'Aarav Sharma', role: 'Vice President', image: '/leaders/leader2.jpg' },
  { name: 'Riya Patel', role: 'Technical Lead', image: '/leaders/leader3.jpg' },
];

const seniorTeam = [
  '/team/1.jpg',
  '/team/2.jpg',
  '/team/3.jpg',
  '/team/4.jpg',
  '/team/5.jpg',
  '/team/6.jpg',
];

const techStack = [
  { name: 'Docker', icon: Layers, color: 'text-blue-500' },
  { name: 'Kubernetes', icon: Cloud, color: 'text-blue-600' },
  { name: 'Terraform', icon: Code2, color: 'text-purple-500' },
  { name: 'GitHub Actions', icon: Rocket, color: 'text-white' },
  { name: 'Prometheus', icon: BarChart3, color: 'text-orange-600' },
  { name: 'AWS', icon: Globe, color: 'text-yellow-500' },
  { name: 'Redis', icon: Database, color: 'text-red-500' },
  { name: 'Go', icon: Terminal, color: 'text-cyan-400' },
];

const roadmap = [
  { quarter: 'Q1', title: 'System Init', desc: 'Global launch of the DevOps platform and member onboarding.' },
  { quarter: 'Q2', title: 'Scaling Up', desc: 'Integration of automated laboratory environments for members.' },
  { quarter: 'Q3', title: 'Deep Tech', desc: 'Advanced workshops on Chaos Engineering and eBPF observability.' },
  { quarter: 'Q4', title: 'Summit', desc: 'Annual Flagship DevOps Summit and Global Hackathon.' },
];

const stats = [
  { label: 'System Uptime', value: '99.98%' },
  { label: 'Average Deployment', value: '1.4s' },
  { label: 'Security Score', value: 'A+' },
  { label: 'Unit Efficiency', value: '94%' },
];

const mentors = [
  { name: 'Alex Rivera', role: 'Staff SRE @ Netflix', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { name: 'Sophia Wang', role: 'DevOps Lead @ Google', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Jordan Smith', role: 'Platform Architect @ AWS', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Cloud Engineer @ Stripe',
    text: 'Joining the DevOps Club was the turning point in my career. The hands-on labs are industrial grade.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    name: 'Michael Chen',
    role: 'SRE @ Datadog',
    text: 'The community here is unmatched. We\'re solving real-world infrastructure problems every single day.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

const faqs = [
  { q: 'What is the DevOps Club?', a: 'DevOps Club is a community focused on mastering automation, cloud-native technologies, and site reliability engineering.' },
  { q: 'How can I join?', a: 'Simply click the "Join Club" button, create an account, and complete your profile to get started.' },
  { q: 'Are the events free?', a: 'Most of our workshops and seminars are free for active club members.' },
  { q: 'Do I need prior experience?', a: 'While some events are advanced, we have plenty of "Zero to Hero" tracks for beginners.' },
];

export default function Home() {
  const { isAuthModalOpen, closeAuthModal, authModalType } = useModalStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <AppLayout>
      <Hero />

      {/* Intro Section */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                <Terminal className="w-3 h-3" />
                Mission Protocol // 01
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
                THE FUTURE IS <br />
                <span className="neon-text-blue">AUTOMATED</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed mb-10 max-w-xl">
                We bridge the gap between development and operations. By cultivating a culture of 
                technical excellence, we prepare our members to lead in 
                the world's most complex cloud environments.
              </p>
              <div className="space-y-6">
                {[
                  { text: 'Industrial-grade lab environments', icon: Cpu },
                  { text: 'Direct mentorship from Big Tech SREs', icon: Users },
                  { text: 'Global cloud infrastructure access', icon: Globe },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-white/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-110 animate-pulse" />
              <div className="glass-dark rounded-[64px] border border-white/10 p-12 relative z-10 overflow-hidden group">
                <div className="aspect-square rounded-[48px] bg-black/60 border border-white/5 flex items-center justify-center overflow-hidden relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-[2px] border-dashed border-primary/20 rounded-full scale-[0.8]"
                  />
                  <div className="relative z-10 flex flex-col items-center">
                    <Rocket className="w-32 h-32 text-primary animate-bounce-slow" />
                    <div className="mt-8 text-center">
                      <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-2">Build Status</div>
                      <div className="text-3xl font-black text-white tabular-nums">100% STABLE</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 grid grid-cols-2 gap-8">
                  <div className="p-6 glass rounded-3xl border border-white/5">
                    <div className="text-3xl font-black text-white mb-1">1.2k+</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Active Units</div>
                  </div>
                  <div className="p-6 glass rounded-3xl border border-white/5">
                    <div className="text-3xl font-black text-white mb-1">45k+</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Deployments</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Ecosystem Section */}
      <section className="py-32 relative border-y border-white/5 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">Our Core <span className="text-primary">Ecosystem</span></h2>
            <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">The industrial-grade tools we master every day</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all group"
              >
                <tech.icon className={`w-12 h-12 ${tech.color} group-hover:scale-110 transition-transform`} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights Preview */}
      <section className="py-32 relative bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black mb-6 tracking-tighter text-white">MISSION <span className="text-primary">LOGS</span></h2>
              <p className="text-muted-foreground text-lg uppercase tracking-widest font-bold">Upcoming Deployment Windows</p>
            </div>
            <Link href="/events" className="group flex items-center gap-4 px-8 py-4 glass rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all border border-white/10">
              View All Missions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-dark rounded-[48px] border border-white/5 overflow-hidden group"
              >
                <div className="aspect-[16/10] bg-zinc-900 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1${i === 1 ? '558494947-860d53281829' : i === 2 ? '667676653237' : '451976426702'}?w=800&q=80`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute top-6 right-6 px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                    Mission #{i}
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                    <Calendar className="w-3 h-3" />
                    Feb 1{i}, 2026
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-white">Kubernetes Cluster Architecture {i}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    Deep dive into production-grade cluster orchestration and scaling strategies.
                  </p>
                  <button className="w-full py-4 glass rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:bg-primary group-hover:text-black transition-all border border-white/10">
                    Deploy Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section (Updated) */}
      <section className="py-24 relative bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center relative group"
              >
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl md:text-7xl font-black mb-2 tabular-nums tracking-tighter relative z-10">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-black relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Strategic <span className="neon-text-blue">Roadmap</span></h2>
            <p className="text-muted-foreground uppercase tracking-[0.3em] text-xs font-black">Path toward total system dominance</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 hidden lg:block -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roadmap.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-dark p-10 rounded-[40px] border border-white/5 relative z-10 group hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all border border-primary/20">
                    <span className="text-xl font-black">{item.quarter}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & Alumni Preview */}
      <section className="py-32 bg-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-dark p-12 rounded-[56px] border border-white/5 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <ImageIcon className="w-12 h-12 text-primary mb-8" />
                <h3 className="text-4xl font-black mb-6 tracking-tight">GALLERY <span className="text-primary">VAULT</span></h3>
                <p className="text-muted-foreground mb-12 max-w-md text-lg leading-relaxed">
                  A visual repository of our most significant deployments and community hackathons.
                </p>
                <Link href="/gallery" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all">
                  Open Vault
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-40 h-40 bg-white/10 rounded-3xl" />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-dark p-12 rounded-[56px] border border-white/5 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <GraduationCap className="w-12 h-12 text-secondary mb-8" />
                <h3 className="text-4xl font-black mb-6 tracking-tight">ALUMNI <span className="text-secondary">ELITE</span></h3>
                <p className="text-muted-foreground mb-12 max-w-md text-lg leading-relaxed">
                  Meet the architects who graduated from our ranks and now lead global infrastructure.
                </p>
                <Link href="/alumni" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-black transition-all">
                  Access Dossier
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute -bottom-20 -right-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <Users className="w-80 h-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
{/* Club Leaders */}
<section className="py-32 bg-background">
  <div className="container mx-auto px-6 text-center">

    <h2 className="text-5xl font-black mb-20 tracking-tighter uppercase">
      Club <span className="text-primary">Leadership</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
      {clubLeaders.map((leader, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -12 }}
          className="glass-dark p-12 rounded-[48px] border border-white/5 group"
        >
          <Avatar className="h-40 w-40 mx-auto mb-8 border-4 border-primary/30 group-hover:border-primary transition">
            <AvatarImage src={leader.image} />
          </Avatar>

          <h3 className="text-2xl font-black mb-2">{leader.name}</h3>
          <p className="text-primary uppercase tracking-widest text-xs font-black">{leader.role}</p>
        </motion.div>
      ))}
    </div>

    <h3 className="text-4xl font-black mb-12 tracking-tight">
      Senior <span className="text-secondary">Core Team</span>
    </h3>

  



  </div>
</section>


      {/* Testimonials */}
      <section className="py-32 bg-white/5 relative border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <Quote className="w-16 h-16 text-primary/20 mb-8" />
              <h2 className="text-5xl font-black mb-8 tracking-tighter text-white uppercase">Operator <span className="text-primary">Intel</span></h2>
              <p className="text-muted-foreground text-xl leading-relaxed italic">
                "The DevOps Club provided the environment I needed to scale my skills from zero to industrial grade. 
                Now I'm managing multi-region clusters at one of the world's biggest fintech platforms."
              </p>
              <div className="mt-12 flex items-center gap-6">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={testimonials[0].avatar} />
                </Avatar>
                <div>
                  <div className="text-lg font-black text-white">{testimonials[0].name}</div>
                  <div className="text-[10px] text-primary font-black uppercase tracking-widest">{testimonials[0].role}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {testimonials.slice(1).map((t, i) => (
                <motion.div 
                  key={i}
                  className="glass-dark p-12 rounded-[48px] border border-white/5 relative"
                >
                  <p className="text-lg text-muted-foreground italic mb-10 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={t.avatar} />
                    </Avatar>
                    <div>
                      <div className="font-black text-white">{t.name}</div>
                      <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase text-white flex items-center justify-center gap-6">
                <HelpCircle className="w-12 h-12 text-primary" />
                Query Log
              </h2>
              <p className="text-muted-foreground uppercase tracking-[0.3em] font-black text-xs">Standard operating procedures and information</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className={`glass-dark rounded-[32px] border transition-all cursor-pointer group p-8 ${
                    activeFaq === i ? 'border-primary/50 bg-primary/5' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <h4 className="text-xl font-black text-white group-hover:text-primary transition-colors tracking-tight">
                      {faq.q}
                    </h4>
                    <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-primary text-black' : ''}`}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-8 text-muted-foreground leading-relaxed text-lg border-t border-white/5 mt-8">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-24 rounded-[72px] bg-gradient-to-br from-primary/20 via-background to-secondary/20 border border-white/10 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary blur-[200px] rounded-full" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-12 border border-white/10">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase text-white leading-[0.9]">
                Ready to Join the <br />
                <span className="text-primary uppercase tracking-widest block mt-4">Elite?</span>
              </h2>
              <p className="text-muted-foreground text-xl mb-16 leading-relaxed">
                Deploy your potential. Join the most active DevOps community and 
                start your transformation today.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <button className="px-12 py-6 bg-primary text-black font-black uppercase tracking-[0.4em] text-xs rounded-3xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                  Execute Setup
                </button>
                <button className="px-12 py-6 glass text-white font-black uppercase tracking-[0.4em] text-xs rounded-3xl hover:bg-white/10 transition-all border border-white/10">
                  Contact Ops
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Auth Modal */}
      <Modal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        title={authModalType === 'login' ? 'Authentication' : 'Registration'}
      >
        <AuthForm isOpen={isAuthModalOpen} onClose={closeAuthModal} type={authModalType} />
      </Modal>
    </AppLayout>
  );
}
