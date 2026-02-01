'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import AnimatedButton from './AnimatedButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, type: initialType }: AuthModalProps) {
  const [type, setType] = useState(initialType);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginAction = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (email === 'error@test.com') {
        throw new Error('Invalid credentials');
      }

      loginAction(
        {
          id: '1',
          email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'ADMIN' : email.includes('judge') ? 'JUDGE' : 'USER',
        },
        'mock-jwt-token'
      );
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-muted-foreground">
          {type === 'login' ? 'Welcome back, Operator' : 'Initialize New Account'}
        </h3>
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={type}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-white"
              placeholder="operator@devops.club"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-white"
              placeholder="••••••••"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatedButton
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              type === 'login' ? 'Access Dashboard' : 'Create Account'
            )}
          </AnimatedButton>
        </motion.form>
      </AnimatePresence>

      <div className="text-center pt-4 border-t border-white/5">
        <button
          onClick={() => setType(type === 'login' ? 'signup' : 'login')}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {type === 'login' 
            ? "Don't have an account? Join the club" 
            : "Already a member? Sign in"}
        </button>
      </div>
    </div>
  );
}
