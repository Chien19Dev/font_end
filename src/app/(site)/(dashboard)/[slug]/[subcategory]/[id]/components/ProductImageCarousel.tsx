'use client';

import { Button } from '@/components/ui/button';
import { showError, showSuccess } from '@/lib/swal';
import { addFavorite, checkFavorite, removeFavorite } from '@/services/favoritesApi';
import { ChevronLeft, ChevronRight, Heart, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
  productId: string;
}

export default function ProductImageCarousel({
  images,
  alt,
  productId,
}: ProductImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const swiperRef = React.useRef<SwiperClass | null>(null);
  React.useEffect(() => {
    if (!productId) return;
    const fetchFavorite = async () => {
      try {
        const res = await checkFavorite(productId);
        setIsLiked(res.data.isFavorite);
      } catch {
        setIsLiked(false);
      }
    };

    fetchFavorite();
  }, [productId]);
  const handleFavorite = async () => {
    try {
      if (!isLiked) {
        const res = await addFavorite(productId);
        setIsLiked(true);
        showSuccess(res.message || 'Đã thêm yêu thích');
      } else {
        const res = await removeFavorite(productId);
        setIsLiked(false);
        showSuccess(res.message || 'Đã xóa yêu thích');
      }
    } catch {
      showError('Thao tác thất bại!');
    }
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  React.useEffect(() => {
    swiperRef.current?.slideTo(selectedIndex);
  }, [selectedIndex]);

  return (
    <div className="flex gap-4 px-4">
      {' '}
      <div className="w-32">
        <Swiper
          direction="vertical"
          slidesPerView={4}
          spaceBetween={12}
          freeMode={true}
          mousewheel={true}
          onSwiper={(swiper: any) => {
            swiperRef.current = swiper;
          }}
          className="h-[600px]"
        >
          {images.map((url, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
              }}
            >
              <div
                onClick={() => handleThumbnailClick(index)}
                className={`relative h-28 w-28 rounded-md border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 ${
                  index === selectedIndex
                    ? 'border-primary shadow shadow-primary/25 opacity-100'
                    : 'border-border opacity-70 hover:opacity-90 hover:border-primary/30'
                }`}
              >
                <Image
                  src={url}
                  alt={`${alt} thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
                {index === selectedIndex && (
                  <div className="absolute inset-0 bg-primary/10 rounded-md" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative flex-1 max-w-[600px]">
        <div className="relative h-[600px] bg-gradient-to-br from-background to-muted/30 rounded shadow-none overflow-hidden group border border-border/50">
          <Image
            src={images[selectedIndex]}
            alt={`${alt} ${selectedIndex + 1}`}
            fill
            className={`object-cover transition-transform duration-700 ${
              isZoomed ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button
            variant="secondary"
            size="icon"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent text-background backdrop-blur-sm hover:bg-foreground shadow-none border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextImage}
            className="absolute right-4 top-1/2 bg-transparent text-background -translate-y-1/2 z-10 backdrop-blur-sm hover:bg-foreground shadow-none border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleFavorite}
              className="bg-card/95 backdrop-blur-sm hover:bg-card shadow-none border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <Heart
                className={`h-4 w-4 text-foreground ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsZoomed(!isZoomed)}
              className="bg-card/95 backdrop-blur-sm hover:bg-card shadow-none border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <ZoomIn className="h-4 w-4 text-foreground" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium border border-border/50">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer duration-300 ${
                  index === selectedIndex
                    ? 'bg-primary scale-150'
                    : 'bg-background/50 hover:bg-background/75'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium text-foreground">{alt}</h3>

          <p className="text-sm text-muted-foreground mt-1">
            Ảnh {selectedIndex + 1} trong {images.length} ảnh
          </p>
        </div>
      </div>
    </div>
  );
}
