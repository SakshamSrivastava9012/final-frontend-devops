'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { Slider } from '@/components/ui/slider';
import AnimatedButton from '@/components/AnimatedButton';
import { CheckCircle2, User, Image as ImageIcon, Send } from 'lucide-react';

const mockParticipants = [
  { id: '1', name: 'Alice Smith', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070', submission: 'Cloud Native Dashboard' },
  { id: '2', name: 'Bob Johnson', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020', submission: 'K8s Operator for DBs' },
  { id: '3', name: 'Charlie Brown', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070', submission: 'Automated Security Scanner' },
];

export default function JudgePage() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const handleScoreChange = (id: string, value: number[]) => {
    setScores(prev => ({ ...prev, [id]: value[0] }));
  };

  const handleSubmit = async (id: string) => {
    setSubmitting(id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitting(null);
    // Logic to mark as submitted
  };

  return (
    <AppLayout>
      <div className="pt-32 pb-20 container mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-black hero-gradient mb-2">Judge Panel</h1>
          <p className="text-muted-foreground">Evaluation Engine v1.0 // Reviewing Phase</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {mockParticipants.map((participant, i) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark p-8 rounded-2xl border border-white/5 flex flex-col md:row items-center gap-8"
            >
              <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden glass border border-white/10 shrink-0">
                <img src={participant.image} alt={participant.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    {participant.name}
                  </h3>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest mt-1">
                    Submission: {participant.submission}
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Innovation Score</label>
                    <span className="text-2xl font-black text-primary">{scores[participant.id] || 0}<span className="text-sm text-white/20">/10</span></span>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    max={10}
                    step={0.5}
                    onValueChange={(val) => handleScoreChange(participant.id, val)}
                    className="py-4"
                  />
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-2">
                <AnimatedButton 
                  disabled={submitting === participant.id}
                  onClick={() => handleSubmit(participant.id)}
                  className="w-full md:w-40"
                >
                  {submitting === participant.id ? 'Processing...' : 'Submit Score'}
                  <Send className="w-4 h-4" />
                </AnimatedButton>
                <button className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                  View Full Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
