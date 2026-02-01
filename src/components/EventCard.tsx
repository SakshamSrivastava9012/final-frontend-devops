'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { Event } from '@/lib/api';
import AnimatedButton from './AnimatedButton';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[450px] w-full rounded-2xl glass-dark border border-white/10 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Section */}
      <div className="h-1/2 w-full overflow-hidden relative">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
        <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
          {event.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col h-1/2 justify-between relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
            <Calendar className="w-3 h-3" />
            {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <AnimatedButton variant="ghost" size="sm" className="group/btn">
            Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </AnimatedButton>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
            <ExternalLink className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors rounded-2xl pointer-events-none" />
    </motion.div>
  );
}
