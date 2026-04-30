'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCart } from '@/contexts/CartContext';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { BsCart3 } from 'react-icons/bs';

export default function CartButton() {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const controls = useAnimation();
  const badgeControls = useAnimation();

  useEffect(() => {
    if (totalCount > 0) {
      controls.start({
        scale: [1, 1.15, 0.95, 1.05, 1],
        rotate: [0, -3, 3, -2, 0],
        transition: {
          duration: 0.6,
          ease: 'easeInOut',
        },
      });
      badgeControls.start({
        scale: [0, 1.3, 1],
        opacity: [0, 1, 1],
        transition: {
          duration: 0.4,
          ease: 'backOut',
        },
      });
    }
  }, [totalCount, controls, badgeControls]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative group">
            <motion.div animate={controls}>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-3 h-auto rounded-xl hover:bg-card backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:scale-105"
                aria-label={`Giỏ hàng - ${totalCount} sản phẩm`}
              >
                <div className="relative">
                  <BsCart3
                    className="text-primary group-hover:text-primary/80 transition-colors duration-200"
                    size={22}
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {totalCount > 0 && (
                  <motion.div animate={badgeControls} className="absolute -top-1 -right-1">
                    <Badge
                      className="min-w-[22px] h-[22px] p-0 flex items-center justify-center bg-primary text-primary-foreground border-2 border-background text-[11px] font-bold rounded-full shadow-lg shadow-primary/25"
                      variant="default"
                    >
                      <motion.span
                        key={totalCount}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {totalCount > 99 ? '99+' : totalCount}
                      </motion.span>
                    </Badge>
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-md scale-125 animate-pulse" />
                  </motion.div>
                )}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                </div>
              </Button>
            </motion.div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110 blur-xl" />
          </div>
        </TooltipTrigger>

        <TooltipContent className="bg-primary text-background flex items-center justify-center text-center border-primary font-medium">
          <p>{totalCount === 0 ? 'Giỏ hàng trống' : `${totalCount} sản phẩm trong giỏ`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
