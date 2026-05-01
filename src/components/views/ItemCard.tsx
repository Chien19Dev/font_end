'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCart } from '@/contexts/CartContext';
import { showError, showSuccess } from '@/lib/swal';
import { addToCart } from '@/services/cartApi';
import { addFavorite, removeFavorite, checkFavorite } from '@/services/favoritesApi';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart, FaShoppingBag, FaStar } from 'react-icons/fa';

interface Variant {
  id: string;
  size: string;
  quantity: number;
  color?: string;
}

interface ProductCardProps {
  id: string;
  categorySlug: string;
  subcategorySlug?: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  image_url: string[];
  image_hover_url?: string;
  variants: Variant[];
  index?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
}

export default function ProductCard({
  id,
  categorySlug,
  subcategorySlug,
  name,
  description,
  price,
  oldPrice,
  discountPercent,
  image_url,
  image_hover_url,
  variants,
  index,
  rating = 4.5,
  reviewCount = 0,
  isNew = false,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverImageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { refreshCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const res = await checkFavorite(id);
        setIsWishlisted(res.data.isFavorite);
      } catch (error) {
        setIsWishlisted(false);
      }
    };

    fetchFavorite();
  }, [id]);

  useEffect(() => {
    if (!cardRef.current || !hoverImageRef.current || !overlayRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(hoverImageRef.current, {
      opacity: 1,
      scale: 1.05,
      duration: 0.6,
      ease: 'power3.out',
    }).to(
      overlayRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      },
      '-=0.3',
    );

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    const card = cardRef.current;
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const mainImage = image_url.length > 0 ? image_url[0] : '/placeholder.png';
  const productUrl = `/${categorySlug}/${subcategorySlug}/${id}`;

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!isWishlisted) {
        const res = await addFavorite(id);
        setIsWishlisted(true);
        showSuccess(res.message);
      } else {
        const res = await removeFavorite(id);
        setIsWishlisted(false);
        showSuccess(res.message);
      }
    } catch (error) {
      showError('Thao tác thất bại!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1],
        delay: index ? index * 0.1 : 0,
      }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card
        ref={cardRef}
        className="h-full overflow-hidden rounded-none border shadow-none transition-all duration-500 backdrop-blur-sm py-0 border-border"
      >
        <CardHeader className="p-0 relative h-[400px] overflow-hidden">
          <div className="absolute top-3 left-3 z-40 flex flex-col gap-2">
            {discountPercent && discountPercent > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: -12 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              >
                -{discountPercent}%
              </motion.div>
            )}
            {isNew && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                MỚI
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-40 p-2.5 backdrop-blur-sm rounded-full shadow-lg  transition-all duration-300 group-hover:translate-y-0 translate-y-[-10px] opacity-0 group-hover:opacity-100"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500 text-sm" />
            ) : (
              <FaRegHeart className="text-gray/60 text-sm hover:text-red-500 transition-colors" />
            )}
          </motion.button>
          <Link href={productUrl}>
            <Image
              width={400}
              height={400}
              className="absolute top-0 left-0 w-full h-full object-cover z-10 transition-transform duration-700"
              src={mainImage}
              alt={name}
            />
            {image_hover_url && (
              <Image
                ref={hoverImageRef}
                width={400}
                height={400}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 z-20 pointer-events-none"
                src={image_hover_url}
                alt={`${name} hover`}
              />
            )}
          </Link>
          <div
            ref={overlayRef}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 to-white/80 backdrop-blur-md opacity-0 translate-y-full z-30 transition-all duration-500"
          >
            <p className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
              <FaShoppingBag className="text-primary" />
              Thêm nhanh vào giỏ hàng
            </p>
            <TooltipProvider>
              <div className="flex flex-wrap gap-2">
                {variants.slice(0, 4).map((variant) => (
                  <VariantAddButton key={variant.id} variant={variant} refreshCart={refreshCart} />
                ))}
                {variants.length > 4 && (
                  <Link
                    href={productUrl}
                    className="text-xs bg-gray/10 hover:bg-gray/20 text-gray/60 px-3 py-2 rounded-lg transition-all duration-300 flex items-center"
                  >
                    +{variants.length - 4}
                  </Link>
                )}
              </div>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <Link href={productUrl} className="group">
            <h3 className="text-base font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
              {name}
            </h3>
          </Link>

          <p className="text-sm text-foreground/70 mb-3 line-clamp-2 leading-relaxed">
            {description}
          </p>
          {reviewCount > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xs ${
                      i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray/50">
                {rating} ({reviewCount} đánh giá)
              </span>
            </div>
          )}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              {oldPrice && oldPrice > price && (
                <span className="text-sm line-through text-gray/40">
                  {oldPrice.toLocaleString('vi-VN')}
                </span>
              )}
              <span className="text-lg font-bold text-primary">
                {price.toLocaleString('vi-VN')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
interface VariantAddButtonProps {
  variant: Variant;
  refreshCart: () => void;
}

function VariantAddButton({ variant, refreshCart }: VariantAddButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await addToCart(variant.id, 1);
      refreshCart();
      showSuccess('Đã thêm vào giỏ hàng!');
      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { scale: 1, backgroundColor: '#10b981' },
          {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          },
        );
      }
    } catch (error) {
      showError('Thêm vào giỏ hàng thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={btnRef}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`text-xs font-medium px-3 py-2 rounded-lg transition-all cursor-pointer duration-300 ${variant.quantity > 0 ? 'bg-primary/10 hover:bg-primary hover:text-white text-primary border border-primary/20 hover:border-primary' : 'bg-gray/10 text-gray/40 cursor-not-allowed'} ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
          onClick={handleAddToCart}
          disabled={variant.quantity === 0 || isLoading}
          type="button"
        >
          {isLoading ? '...' : variant.size}
        </motion.button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-center">
          <p className="font-medium">Size: {variant.size}</p>
          {variant.color && <p className="text-xs opacity-80">Màu: {variant.color}</p>}
          <p className="text-xs opacity-80">Còn lại: {variant.quantity}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
