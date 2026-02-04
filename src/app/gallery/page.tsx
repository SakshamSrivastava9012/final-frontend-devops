'use client';

import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api, Album } from '@/lib/api';
import { ZoomIn, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GalleryPage() {

  const router = useRouter();

  const { data: albums, isLoading } = useQuery<Album[]>({
    queryKey: ['albums'],
    queryFn: api.getAlbums,
  });

  return (
    <AppLayout>
      <div className="pt-32 pb-20 container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 hero-gradient">
            Visual Archive
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Event albums powered by your backend.
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

          {albums?.map((album, i) => (

            <motion.div
              key={album.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden glass border border-white/10 break-inside-avoid cursor-pointer"
              onClick={() => router.push(`/gallery/${album.id}`)}
            >

              <img
                src={album.thumbnailUrl}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">

                <span className="text-lg font-bold text-white">
                  {album.name}
                </span>

                <button className="mt-3 flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white">
                  <ZoomIn className="w-4 h-4" />
                  Open Album
                </button>

              </div>
            </motion.div>

          ))}
        </div>
      </div>
    </AppLayout>
  );
}
