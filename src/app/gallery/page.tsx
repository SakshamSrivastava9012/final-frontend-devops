'use client';

import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api, GalleryItem } from '@/lib/api';
import { Star, ZoomIn, Loader2 } from 'lucide-react';

const mockGallery: GalleryItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070', author: 'Operator_01', score: 9.5 },
  { id: '2', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020', author: 'SysAdmin_99', score: 8.8 },
  { id: '3', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070', author: 'CyberGhost', score: 9.2 },
  { id: '4', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070', author: 'DevOps_Ninja', score: 9.9 },
  { id: '5', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070', author: 'Kernel_Panic', score: 7.5 },
  { id: '6', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072', author: 'CloudMaster', score: 8.5 },
];

export default function GalleryPage() {
  return (
    <AppLayout>
      <div className="pt-32 pb-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 hero-gradient">Visual Archive</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated collection of project snapshots and community highlights.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {mockGallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden glass border border-white/10 break-inside-avoid"
            >
              <img src={item.url} alt={`Gallery ${item.id}`} className="w-full h-auto transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white/90">@{item.author}</span>
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-4 h-4 fill-primary" />
                    <span className="text-sm font-bold">{item.score}</span>
                  </div>
                </div>
                <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500" />
                <button className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                  <ZoomIn className="w-4 h-4" />
                  Expand Feed
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
            <Loader2 className="w-5 h-5 animate-spin" />
            Synchronizing more data...
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
