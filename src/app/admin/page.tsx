'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import AnimatedButton from '@/components/AnimatedButton';
import { 
  Plus, 
  Users, 
  Calendar, 
  Trash2, 
  MoreVertical,
  Search,
  Settings,
  ShieldCheck,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockRegistrations = [
  { id: '1', user: 'Alice Smith', event: 'Kubernetes Workshop', date: '2026-03-01', status: 'Approved' },
  { id: '2', user: 'Bob Johnson', event: 'DevOps Summit', date: '2026-03-02', status: 'Pending' },
  { id: '3', user: 'Charlie Brown', event: 'Kubernetes Workshop', date: '2026-03-05', status: 'Approved' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'registrations'>('events');

  return (
    <AppLayout>
      <div className="pt-32 pb-20 container mx-auto px-6">
        <header className="flex flex-col md:row items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black flex items-center gap-3">
              <ShieldCheck className="w-10 h-10 text-primary" />
              Command Center
            </h1>
            <p className="text-muted-foreground mt-2">Level 4 Administrator Access Granted</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass p-1 rounded-xl flex">
              <button 
                onClick={() => setActiveTab('events')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'events' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                Events
              </button>
              <button 
                onClick={() => setActiveTab('registrations')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'registrations' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                Registrations
              </button>
            </div>
          </div>
        </header>

        {activeTab === 'events' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between glass-dark p-6 rounded-2xl border border-white/5">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary transition-colors" placeholder="Search systems..." />
              </div>
              <AnimatedButton size="sm">
                <Plus className="w-4 h-4" />
                Deploy New Event
              </AnimatedButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="glass-dark p-6 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-muted-foreground hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="glass-dark border-white/10 text-white" align="end">
                        <DropdownMenuItem className="focus:bg-white/5 cursor-pointer">Edit Event</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-red-500/20 text-red-400 cursor-pointer">Delete Event</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-lg font-bold mb-1">Infrastructure Summit 2026</h3>
                  <p className="text-xs text-muted-foreground mb-4">Active // 156 Registered</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <button className="text-[10px] uppercase font-bold tracking-widest text-primary hover:underline">View Analytics</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">User</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Mission</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Timestamp</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-4">
                      <div className="font-medium">{reg.user}</div>
                    </td>
                    <td className="px-8 py-4 text-sm text-muted-foreground">{reg.event}</td>
                    <td className="px-8 py-4 text-sm text-muted-foreground">{reg.date}</td>
                    <td className="px-8 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${reg.status === 'Approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary"><Eye className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-red-400/20 rounded-lg transition-colors text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
