'use client';

import { ModeToggle } from '@/components/views/ModeToggle';
import { mainMenu, topMenu } from '@/data/top-bar';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useCallback, useEffect, useState } from 'react';
import CartButton from './CartButton';
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import Notifications from './Notifications';
import SearchCommand from './SearchDropdown';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [menuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    const shouldBeSticky = currentScrollY > 50;
    setIsSticky(shouldBeSticky);
  }, []);

  useEffect(() => {
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', throttledHandleScroll, {
      passive: true,
    });
    return () =>
      window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  const topBarOpacity = Math.max(
    0,
    Math.min(1, (100 - scrollY) / 100),
  );
  const topBarTransform = `translateY(${Math.min(0, scrollY * -0.5)}px)`;
  return (
    <Fragment>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isSticky ? 'max-h-0 opacity-0' : 'max-h-8 opacity-100'
        }`}
        style={{
          opacity: isSticky ? 0 : topBarOpacity,
          transform: isSticky ? 'translateY(-100%)' : topBarTransform,
          willChange: 'opacity, transform, max-height',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="relative flex h-8 w-full items-center justify-center lg:justify-between bg-gradient-to-r from-muted-foreground via-muted-foreground/90 to-muted-foreground">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-pulse"></div>
          </div>
          <ul className="flex h-full items-center max-lg:flex-1 justify-evenly md:justify-between uppercase relative z-10">
            {topMenu.map((item, idx) => (
              <li
                key={`top-${item.href}-${idx}`}
                className="group relative flex h-full flex-1 items-center lg:flex-none"
              >
                <Link
                  href={item.href}
                  className="flex h-full items-center gap-1 px-2 py-2 text-xs font-medium text-background transition hover:bg-sidebar-foreground hover:text-background/90 ml-2"
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
                {idx !== topMenu.length - 1 && (
                  <span
                    className="absolute right-0 my-2 h-4.5 w-px bg-background/20 group-hover:bg-background/40"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ul>
          <ul className="hidden lg:flex h-full items-center relative z-10">
            {mainMenu.map((item, idx) => (
              <li
                key={`main-${item.href}-${idx}`}
                className="group relative flex h-full items-center"
              >
                <Link
                  href={item.href}
                  className="flex h-full items-center gap-1 px-2 py-2 text-xs font-medium text-background transition hover:bg-sidebar-foreground hover:text-background/90 mr-2"
                  aria-label={item.label}
                >
                  {item.icon && (
                    <item.icon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </Link>
                {idx !== mainMenu.length - 1 && (
                  <span
                    className="absolute right-0 my-2 h-4.5 w-px bg-background/20 group-hover:bg-background/40"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <nav
        className={`z-50 transition-all duration-300 ease-in-out ${isSticky ? 'fixed top-0 left-0 right-0 border-b border-border/50 shadow-xl backdrop-blur-xl bg-background/95 dark:bg-gray/95 translate-y-0' : 'relative bg-background dark:bg-gray'}`}
        role="navigation"
        aria-label="Main navigation"
        style={{
          willChange: isSticky ? 'transform' : 'auto',
          backfaceVisibility: 'hidden',
        }}
      >
        <div
          className={`relative z-10 mx-auto flex w-full flex-col px-4 sm:px-6 md:px-4 xl:px-12 2xl:px-16 ${
            isSticky ? 'py-1' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-2">
            <Link
              href="/"
              className="group flex items-center gap-3 transition hover:scale-105"
              aria-label="Elysia Wear - Go to homepage"
            >
              <Image
                src="/logo.svg"
                alt=""
                width={isSticky ? 28 : 32}
                height={isSticky ? 28 : 32}
                className="transition group-hover:brightness-110"
                priority
              />
              <span
                className={`font-bold transition group-hover:text-primary ${
                  isSticky ? 'text-xl' : 'text-2xl'
                }`}
              >
                Elysia Wear
              </span>
            </Link>
            <SearchCommand />
            <div className="flex items-center gap-3 lg:gap-6">
              <UserMenu />
              <Notifications />
              <Link href="/cart" aria-label="View shopping cart">
                <CartButton />
              </Link>
              <ModeToggle />
            </div>
          </div>
          <div
            className={`flex justify-start sm:justify-center transition-all
            duration-500 ${
              isSticky ? 'py-1.5' : 'py-2.5'
            }`}
          >
            <NavLinks
              className={`${
                isSticky ? 'text-sm' : 'text-base'
              } flex space-x-4`}
            />
          </div>
        </div>
        {menuOpen && <MobileMenu />}
      </nav>
    </Fragment>
  );
}
