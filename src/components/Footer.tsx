'use client';

import { motion } from 'framer-motion';
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Cpu, 
  Terminal, 
  Globe, 
  Shield, 
  Zap, 
  Rocket, 
  Heart,
  ChevronRight,
  Mail,
  MapPin,
  ArrowUpRight,
  Database,
  Layers,
  Activity,
  Infinity as InfinityIcon
} from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Mission Log', href: '/events' },
      { name: 'Gallery Vault', href: '/gallery' },
      { name: 'Alumni Elite', href: '/alumni' },
      { name: 'Unit Command', href: '/dashboard' },
      { name: 'Judge Console', href: '/judge' },
    ]
  },
  {
    title: 'Directives',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Security Protocol', href: '#' },
      { name: 'Cloud Infrastructure', href: '#' },
      { name: 'Performance Metrics', href: '#' },
      { name: 'Open Source', href: '#' },
    ]
  },
  {
    title: 'Community',
    links: [
      { name: 'Discord Command', href: '#' },
      { name: 'GitHub Repo', href: '#' },
      { name: 'Twitter Feed', href: '#' },
      { name: 'LinkedIn Unit', href: '#' },
      { name: 'Events Archive', href: '#' },
    ]
  }
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-32 pb-12 overflow-hidden border-t border-white/5 bg-background">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <motion.div 
                whileHover={{ rotate: 180 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:shadow-primary/50 transition-all"
              >
                <Terminal className="w-6 h-6 text-black" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none">
                  DEVOPS<span className="text-primary">CLUB</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors">
                  Legacy Infrastructure // v4.0
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-10 text-lg max-w-sm">
              The premier ecosystem for infrastructure pioneers. Engineering the 
              standard for next-gen automation and cloud reliability.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Globe].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.5)' }}
                  className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8 relative inline-block">
                  {column.title}
                  <div className="absolute -bottom-2 left-0 w-4 h-0.5 bg-primary" />
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-primary" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact/Status Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8 relative inline-block">
              Ops Status
              <div className="absolute -bottom-2 left-0 w-4 h-0.5 bg-green-500" />
            </h4>
            <div className="space-y-6">
              <div className="p-6 glass-dark rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Operational</span>
                </div>
                <div className="text-2xl font-black text-white mb-1 tabular-nums tracking-tighter">99.98%</div>
                <div className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Global Uptime</div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="w-full py-4 glass rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] border-white/10 hover:border-primary/50 transition-all group"
              >
                Return To Top
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              <span>© 2026 DEVOPS CLUB</span>
              <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full" />
              <span className="hidden md:block">UNIT-01 // PRODUCTION</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/10">
              <Cpu className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase">Kernel v4.2.0-STABLE</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Privacy_Protocol</Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Terms_Of_Service</Link>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> by the <span className="text-white">Ops Community</span>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Decorative Infinity Symbol */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-[0.02] pointer-events-none">
        <InfinityIcon className="w-[800px] h-[400px] text-white" />
      </div>
    </footer>
  );
}
