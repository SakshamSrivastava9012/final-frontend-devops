export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  author: string;
  score?: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Kubernetes Workshop',
    description: 'Master container orchestration with hands-on labs.',
    date: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1667372333374-0d44583b7828?q=80&w=2070&auto=format&fit=crop',
    category: 'Workshop',
  },
  {
    id: '2',
    title: 'DevOps Summit 2026',
    description: 'The biggest annual gathering of automation experts.',
    date: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop',
    category: 'Conference',
  },
];

export const api = {
  getEvents: async (): Promise<Event[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockEvents), 800));
  },
  registerForEvent: async (eventId: string, data: any): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, 1500));
  },
};
