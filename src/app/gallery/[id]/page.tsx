'use client';

import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api, GalleryItem } from '@/lib/api';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function AlbumPage() {

  const { id } = useParams();
  const router = useRouter();

  const albumId = Number(id);

  const { data: images, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['album-images', albumId],
    queryFn: () => api.getAlbumImages(albumId),
    enabled: !!albumId,
  });

  return (
    <AppLayout>
      <div className="pt-32 pb-20 container mx-auto px-6">

        {/* Back */}
        <button
          onClick={() => router.push('/gallery')}
          className="mb-10 flex items-center gap-2 text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to albums
        </button>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

          {images?.map((img, i) => (

            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden glass border border-white/10 break-inside-avoid"
            >

              <img
                src={img.imageUrl}
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
              />

            </motion.div>

          ))}
        </div>

        {images?.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            No images in this album yet.
          </div>
        )}

      </div>
    </AppLayout>
  );
}
