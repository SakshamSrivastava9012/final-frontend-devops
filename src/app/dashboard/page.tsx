'use client';

import { motion } from 'framer-motion';
import {
  Terminal,
  Shield,
  Cpu,
  Cloud,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';

const thoughts = [
  {
    title: 'Infrastructure is a Product',
    desc: 'Treat infra like software. Version it. Review it. Ship it.'
  },
  {
    title: 'Automation over Heroics',
    desc: 'If it needs manual intervention twice — automate it.'
  },
  {
    title: 'Failure is Normal',
    desc: 'Design for failure, not perfection.'
  }
];

const accordion = [
  {
    title: 'What is DevOps?',
    content:
      'DevOps is the cultural and technical bridge between development and operations — focused on fast delivery, reliability, and automation.'
  },
  {
    title: 'Why Linux matters',
    content:
      'Every serious backend system runs on Linux. Learn processes, networking, filesystems and shell deeply.'
  },
  {
    title: 'Cloud is just someone else’s computer',
    content:
      'Cloud simplifies hardware, not architecture. You still design everything.'
  },
  {
    title: 'Observability',
    content:
      'If you cannot see your system, you cannot fix your system.'
  }
];

export default function DashboardPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AppLayout>
      <div className="pt-28 min-h-screen bg-black px-6">

        <div className="max-w-5xl mx-auto space-y-24">

          {/* Header */}
          <section className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tight"
            >
              Operator Dashboard
            </motion.h1>

            <p className="text-white/40 mt-6 max-w-xl mx-auto">
              Welcome to the DevOps Club system.
              This is your personal learning command center.
            </p>
          </section>

          {/* Thoughts */}
          <section className="grid md:grid-cols-3 gap-6">
            {thoughts.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark border border-white/5 rounded-3xl p-8"
              >
                <Cpu className="text-blue-400 mb-4" />
                <h3 className="font-black text-white mb-2">{t.title}</h3>
                <p className="text-sm text-white/40">{t.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* Accordions */}
          <section className="glass-dark border border-white/5 rounded-[40px] p-10">
            <h2 className="text-3xl font-black text-white mb-10">DevOps Knowledge</h2>

            <div className="space-y-4">
              {accordion.map((a, i) => (
                <div
                  key={i}
                  className="border border-white/5 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex justify-between items-center p-5 text-left"
                  >
                    <span className="font-bold text-white">{a.title}</span>
                    <ChevronDown
                      className={`transition-transform ${
                        open === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {open === i && (
                    <div className="px-5 pb-5 text-sm text-white/40">
                      {a.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section className="text-center space-y-6">
            <Terminal className="mx-auto text-blue-400" size={48} />
            <p className="text-white/50 max-w-xl mx-auto">
              Real DevOps engineers don’t chase tools.
              They master fundamentals: Linux, Networking,
              Systems, Automation, Reliability.
            </p>
          </section>

          {/* Footer */}
          <footer className="text-center text-white/20 text-xs uppercase tracking-widest pb-20">
            DevOps Club // Bennett University
          </footer>

        </div>
      </div>
    </AppLayout>
  );
}
