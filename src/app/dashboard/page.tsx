'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, 
  LogOut, 
  LayoutDashboard,
  Clock,
  CheckCircle2,
  Terminal,
  Cloud,
  Cpu,
  ShieldCheck,
  Rocket,
  Zap,
  Activity,
  Globe,
  Lock,
  Database
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import AppLayout from '@/components/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Events', href: '/dashboard/events', icon: Calendar },
];

const devopsTips = [
  { 
    title: 'Cloud Optimization', 
    tip: 'Use spot instances for non-critical workloads to save up to 90% on cloud costs.',
    icon: Cloud,
    color: 'text-blue-400'
  },
  { 
    title: 'Kubernetes Secret', 
    tip: 'Always set resource limits on your pods to prevent "noisy neighbor" issues.',
    icon: Cpu,
    color: 'text-purple-400'
  },
  { 
    title: 'Security First', 
    tip: 'Implement automated vulnerability scanning in your CI/CD pipelines.',
    icon: ShieldCheck,
    color: 'text-cyan-400'
  },
  { 
    title: 'Linux Mastery', 
    tip: 'Master "grep", "awk", and "sed" for powerful log analysis and stream processing.',
    icon: Terminal,
    color: 'text-green-400'
  },
  { 
    title: 'Infrastructure as Code', 
    tip: 'Treat your infrastructure like code: version it, test it, and review it.',
    icon: Database,
    color: 'text-orange-400'
  },
  { 
    title: 'Observability', 
    tip: 'Use the "USE" method (Utilization, Saturation, Errors) for monitoring resources.',
    icon: Activity,
    color: 'text-red-400'
  }
];

export default function DashboardPage() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <AppLayout>
      <div className="pt-24 min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 hidden md:flex flex-col p-6 sticky top-24 h-[calc(100vh-6rem)]">
          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-8 px-4">Navigation</div>
          <div className="space-y-2 flex-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  pathname === link.href 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-8 border-t border-white/5">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary rounded-full blur-[2px]" />
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-black tracking-tighter text-white"
              >
                UNIT_COMMANDER: {user?.name?.toUpperCase() || 'OPERATOR'}
              </motion.h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-2 font-mono text-xs uppercase tracking-widest">
                <Terminal className="w-4 h-4 text-primary" />
                STATUS: <span className="text-green-400">OPERATIONAL</span> // SESSION_TOKEN: {Math.random().toString(36).substring(7).toUpperCase()}
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-4 glass p-4 rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Avatar className="h-14 w-14 border-2 border-primary/30 relative z-10">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-black text-xl">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="pr-4">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">{user?.role}</div>
                <div className="text-sm font-black text-white/90">{user?.email}</div>
              </div>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Stat Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Events Registered', value: '12', icon: Calendar, color: 'bg-blue-500/10 text-blue-400', border: 'border-blue-500/20' },
                  { label: 'System Uptime', value: '99.98%', icon: Activity, color: 'bg-green-500/10 text-green-400', border: 'border-green-500/20' },
                  { label: 'Unit Rank', value: '#42', icon: Globe, color: 'bg-purple-500/10 text-purple-400', border: 'border-purple-500/20' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`glass-dark p-6 rounded-[32px] border ${stat.border} relative overflow-hidden group`}
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <stat.icon className="w-16 h-16" />
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-6`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-4xl font-black mb-1 tabular-nums tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* DevOps Insight Cards */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black uppercase tracking-[0.2em] text-white/80">Operational Intel</h3>
                  <div className="h-px flex-1 mx-6 bg-white/5" />
                  <Link href="/events" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">Deploy New Mission</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {devopsTips.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="glass p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all group cursor-default"
                    >
                      <tip.icon className={`w-5 h-5 ${tip.color} mb-4 group-hover:scale-110 transition-transform`} />
                      <h4 className="text-xs font-black uppercase tracking-widest mb-2 text-white/90">{tip.title}</h4>
                      <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">{tip.tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mission History */}
              <section className="glass-dark p-8 rounded-[40px] border border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
                <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-10 flex items-center gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <Clock className="w-5 h-5" />
                  </span>
                  Command History
                </h3>
                <div className="space-y-8 relative">
                  <div className="absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-primary/50 via-white/5 to-transparent" />
                  {[
                    { title: 'Kubernetes Masterclass Access', time: '12h ago', desc: 'Successfully registered for the upcoming cluster orchestration event.' },
                    { title: 'System Credentials Updated', time: '2d ago', desc: 'Security protocol update: password and 2FA settings modified.' },
                    { title: 'Unit Enrollment Confirmed', time: '5d ago', desc: 'Welcome to DevOps Club Unit-01. Initial onboarding complete.' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-12 group"
                    >
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center z-10 group-hover:border-primary/50 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-primary group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all" />
                      </div>
                      <div className="text-sm font-black text-white group-hover:text-primary transition-colors tracking-tight">{item.title}</div>
                      <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-bold">{item.time}</div>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Side Analytics */}
            <div className="space-y-8">
              <section className="glass-dark p-8 rounded-[40px] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Zap className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/60 mb-8 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Unit Progress
                </h3>
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Current Class</div>
                      <div className="text-lg font-black text-primary tracking-tight">ELITE_ARCHITECT</div>
                    </div>
                    <div className="text-3xl font-black tabular-nums tracking-tighter">92%</div>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[pulse_2s_infinite]" />
                    </motion.div>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest font-bold">
                    NEXT LEVEL: <span className="text-white">SYSTEM_ADMINISTRATOR</span> // REQ: 2 MISSIONS
                  </p>
                  <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] bg-primary text-black hover:scale-105 transition-all rounded-2xl shadow-xl shadow-primary/20">
                    Accelerate Training
                  </button>
                </div>
              </section>

              <section className="p-8 rounded-[40px] bg-gradient-to-br from-primary/20 via-background to-secondary/20 border border-white/5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-black text-lg mb-3 tracking-tight">Security Protocol</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  Our new multi-factor authentication system is now active for all elite operators. 
                  Secure your unit access today.
                </p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-all">
                  Configure Vault
                  <Lock className="w-3 h-3" />
                </button>
              </section>

              <div className="glass-dark rounded-[40px] p-8 border border-white/5 text-center group">
                <div className="relative inline-block mb-2">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
                  <div className="text-5xl font-black relative z-10 tracking-tighter tabular-nums group-hover:scale-110 transition-transform">#01</div>
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-black">Global Efficiency Rank</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
