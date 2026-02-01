'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function AnimatedButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: AnimatedButtonProps) {
  const variants = {
    primary: 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-primary/90',
    secondary: 'bg-secondary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:bg-secondary/90',
    outline: 'border border-primary/50 text-primary hover:bg-primary/10',
    ghost: 'text-muted-foreground hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base font-semibold',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'rounded-full transition-all duration-300 flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
