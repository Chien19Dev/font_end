'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { BannerFormData, getBanners } from '@/services/bannerApi';
import { EmptyPlaceholder } from './EmptyPlaceholder';

interface HomeBannerProps {
  className?: string;
}

export default function HomeBanner({ className = '' }: HomeBannerProps) {
  const [banners, setBanners] = useState<BannerFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageLoading, setImageLoading] = useState<{
    [key: number]: boolean;
  }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await getBanners();
        setBanners(data.filter((b) => b.is_active));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, []);
  useEffect(() => {
    if (isPlaying && banners.length > 0 && banners[0]?.image_url?.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= banners[0]?.image_url?.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, banners]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => ({ ...prev, [index]: false }));
  };

  const handleImageStart = (index: number) => {
    setImageLoading((prev) => ({ ...prev, [index]: true }));
  };

  if (loading) {
    return (
      <div className={`relative bg-gradient-to-br from-background to-muted/30 ${className}`}>
        <div className="aspect-[3/1] md:aspect-[16/5] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground font-medium">Đang tải banner...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className={`relative bg-gradient-to-br from-background to-muted/30 ${className}`}>
        <div className="aspect-[3/1] md:aspect-[16/5] flex items-center justify-center">
          <EmptyPlaceholder description="Không có banner." />
        </div>
      </div>
    );
  }

  const banner = banners[0];
  const hasMultipleImages = banner.image_url && banner.image_url.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Carousel
        opts={{
          loop: true,
          align: 'center',
        }}
        className="w-full h-full relative"
        setApi={(api) => {
          if (api) {
            api.on('select', () => {
              setCurrentIndex(api.selectedScrollSnap());
            });
          }
        }}
      >
        <CarouselContent>
          {banner.image_url.map((src, index) => (
            <CarouselItem key={index} className="aspect-[3/1] md:aspect-[16/5] pl-0 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full group overflow-hidden shadow-2xl"
              >
                <AnimatePresence>
                  {imageLoading[index] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-muted/80 flex items-center justify-center z-10"
                    >
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Link
                  href={banner.link || '#'}
                  aria-label={`${banner.title} - ảnh ${index + 1}`}
                  className="block relative w-full h-full"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={src}
                      alt={`${banner.title} - ảnh ${index + 1}`}
                      fill
                      className=" w-full h-full transition-all duration-700 group-hover:scale-105"
                      unoptimized={true}
                      onLoadingComplete={() => handleImageLoad(index)}
                      onLoadStart={() => handleImageStart(index)}
                      priority={index === 0}
                    />
                  </div>
                </Link>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {hasMultipleImages && (
          <>
            <CarouselPrevious className="left-4 bg-white/90 hover:bg-white hover:text-foreground/90 border-0 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110">
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="right-4 bg-white/90 hover:bg-white hover:text-foreground/90 border-0 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110">
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </>
        )}
      </Carousel>
    </motion.div>
  );
}
