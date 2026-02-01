'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import AppLayout from '@/components/AppLayout';
import EventCard from '@/components/EventCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Calendar, MapPin, Users, Loader2, CheckCircle2 } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
import Modal from '@/components/Modal';
import { useModalStore } from '@/lib/modalStore';
import AuthForm from '@/components/AuthForm';

export default function EventsPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: api.getEvents,
  });

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isAuthModalOpen, closeAuthModal, authModalType } = useModalStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      await api.registerForEvent(selectedEvent.id, {});
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedEvent(null);
      }, 3000);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <AppLayout>
      <div className="pt-32 pb-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 hero-gradient">Upcoming Missions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Join our high-impact workshops, hackathons, and summits to level up your DevOps game.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[450px] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
            ))}
          </div>
        )}
      </div>

      {/* Event Details Drawer/Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-end md:justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full md:max-w-2xl h-[90vh] md:h-full bg-card md:rounded-l-3xl border-l border-white/10 overflow-y-auto"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-64 md:h-80 w-full relative">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary mb-3 inline-block">
                    {selectedEvent.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black">{selectedEvent.title}</h2>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground tracking-widest">Date</p>
                      <p className="text-sm font-medium">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-secondary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground tracking-widest">Location</p>
                      <p className="text-sm font-medium">Main Lab / Remote</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-accent">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground tracking-widest">Available Slots</p>
                      <p className="text-sm font-medium">42/50</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <h3 className="text-xl font-bold border-l-4 border-primary pl-4">About Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvent.description}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass p-8 rounded-2xl border-green-500/30 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold mb-2">Registration Confirmed!</h4>
                    <p className="text-muted-foreground">Check your dashboard for further instructions.</p>
                  </motion.div>
                ) : (
                  <div className="glass p-8 rounded-2xl border-white/5">
                    <h4 className="text-xl font-bold mb-6">Initialize Registration</h4>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
                          <input required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted-foreground">Gender</label>
                          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Profile Image (URL)</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm" placeholder="https://..." />
                      </div>
                      <AnimatedButton disabled={isRegistering} type="submit" className="w-full py-4 mt-4">
                        {isRegistering ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Participation'}
                      </AnimatedButton>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
