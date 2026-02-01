'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  LogOut,
  LayoutDashboard,
  Clock,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import AppLayout from '@/components/AppLayout';

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Events', href: '/dashboard/events', icon: Calendar },
];

const myEvents = [
  {
    id: 1,
    title: 'Kubernetes Cluster Architecture',
    date: 'Feb 12, 2026',
    time: '14:00 UTC',
    location: 'Virtual'
  },
  {
    id: 2,
    title: 'Advanced CI/CD Pipelines',
    date: 'Feb 15, 2026',
    time: '10:00 UTC',
    location: 'Discord'
  }
];

export default function MyEventsPage() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <AppLayout>
      <div className="pt-24 min-h-screen bg-background flex">

        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 hidden md:flex flex-col p-6 sticky top-24 h-[calc(100vh-6rem)]">
          <div className="space-y-2 flex-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>

          <button
            onClick={logout}
            className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 p-10 max-w-6xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black mb-10"
          >
            My Events
          </motion.h1>

          <div className="space-y-6">

            {myEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition"
              >
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>

                <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" />
                    {event.date} @ {event.time}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary" />
                    {event.location}
                  </div>
                </div>
              </motion.div>
            ))}

            {myEvents.length === 0 && (
              <div className="text-center py-24 text-muted-foreground">
                No registered events yet.
              </div>
            )}

          </div>
        </main>
      </div>
    </AppLayout>
  );
}
