'use client';

import { create } from 'zustand';

interface ModalState {
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'signup';
  openAuthModal: (type?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAuthModalOpen: false,
  authModalType: 'login',
  openAuthModal: (type = 'login') => set({ isAuthModalOpen: true, authModalType: type }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));
