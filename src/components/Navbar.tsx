'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useModalStore } from '@/lib/modalStore';
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  Calendar, 
  ChevronDown,
  Terminal,
  Activity,
  Layers,
  Users,
  Menu,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Alumni', href: '/alumni' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { openAuthModal } = useModalStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'py-3 bg-background/80 backdrop-blur-xl border-b border-white/5' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-primary/50 transition-all"
          >
            <Terminal className="w-5 h-5 text-black" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none text-white">
              DEVOPS<span className="text-primary">CLUB</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors">
              Unit-01 // Active
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 glass p-1 rounded-full border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full transition-all duration-300 ${
                pathname === link.href 
                  ? 'text-white bg-white/10' 
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 relative z-50">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 glass pl-2 pr-3 py-1.5 rounded-full border border-white/10 hover:border-primary/50 transition-all outline-none group">
                  <Avatar className="h-7 w-7 border border-white/10">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary/20 text-[10px] font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 glass-dark border-white/10 text-white p-2 rounded-2xl" align="end">
                <div className="px-3 py-4">
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{user?.role}</div>
                  <div className="text-sm font-bold truncate">{user?.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                </div>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <DropdownMenuItem asChild className="focus:bg-primary focus:text-black cursor-pointer rounded-xl py-3 mt-1 group">
                  <Link href="/dashboard" className="w-full flex items-center">
                    <LayoutDashboard className="mr-3 h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="font-bold uppercase tracking-widest text-[10px]">Command Center</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/5 cursor-pointer rounded-xl py-3 group">
                  <Link href="/dashboard/events" className="w-full flex items-center">
                    <Calendar className="mr-3 h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="font-bold uppercase tracking-widest text-[10px]">Mission Log</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <DropdownMenuItem onClick={logout} className="focus:bg-red-500/20 text-red-400 cursor-pointer rounded-xl py-3 group">
                  <LogOut className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Terminate Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={() => openAuthModal('login')}
                className="text-[10px] font-black uppercase tracking-widest px-5 py-2 text-white hover:text-primary transition-colors"
              >
                Access
              </button>
              <button 
                onClick={() => openAuthModal('signup')}
                className="bg-primary hover:bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Join Unit
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 glass rounded-xl flex items-center justify-center border border-white/10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-black uppercase tracking-[0.2em] py-4 border-b border-white/5 flex items-center justify-between group ${
                    pathname === link.href ? 'text-primary' : 'text-white/60'
                  }`}
                >
                  {link.name}
                  <ChevronDown className={`w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform ${pathname === link.href ? 'text-primary' : 'text-white/20'}`} />
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="py-4 glass rounded-2xl text-[10px] font-black uppercase tracking-widest text-white"
                  >
                    Access
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')}
                    className="py-4 bg-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-black shadow-lg shadow-primary/20"
                  >
                    Join Unit
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
