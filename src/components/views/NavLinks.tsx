'use client';

import { alertError } from '@/lib/alerts';
import { Category, getAllCategories } from '@/services/categoryApi';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function NavLinks({
  className = '',
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();

        const desiredOrderBySlug = ['nam', 'nu', 'phu-kien', 'the-thao'];
        const desiredIndexMap = new Map(
          desiredOrderBySlug.map((slug, index) => [slug, index]),
        );

        const sortedData = [...data].sort((a, b) => {
          const aIndex = desiredIndexMap.get(a.slug_category) ?? Number.MAX_SAFE_INTEGER;
          const bIndex = desiredIndexMap.get(b.slug_category) ?? Number.MAX_SAFE_INTEGER;

          if (aIndex !== bIndex) return aIndex - bIndex;
          return a.name.localeCompare(b.name, 'vi');
        });

        setCategories(sortedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          alertError(err.message);
        } else {
          alertError('Error fetching categories');
        }
      }
    }
    fetchCategories();
  }, []);

  const staticLinks = [
    { name: 'Liên hệ', href: '/lien-he' },
    { name: 'Về chúng tôi', href: '/ve-chung-toi' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className={`relative w-full ${className}`}>
      <ul className="flex w-full items-center justify-center gap-5">
        {categories.map((category) => {
          const href = `/${category.slug_category}`;
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={category.id} className="group">
              <Link
                href={href}
                className={`relative uppercase text-sm font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:transition-all before:duration-300 before:ease-in-out after:content-[''] after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:transition-all after:duration-300 after:ease-in-out hover:before:w-full hover:after:opacity-100 hover:transform hover:scale-105 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 before:w-full after:opacity-100'
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                }
                `}
              >
                {category.name}
              </Link>
              {category.subcategories &&
                category.subcategories.length > 0 && (
                  <div className="absolute inset-x-0 top-full z-[9999] pt-3 opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <div className="relative mx-auto w-full max-w-[1800px] px-3 sm:px-6 lg:px-10">
                      <div className="relative transform overflow-hidden rounded-2xl border border-border dark:border-border/90 shadow-2xl transition-all duration-500 ease-out">
                        <div className="absolute inset-0 bg-white/90 dark:bg-gray/80 backdrop-blur-xl"></div>
                        <div className="relative min-w-0 p-5 sm:p-6 lg:p-8">
                          <div className="flex flex-wrap gap-6 lg:flex-nowrap lg:gap-8">
                          {chunkArray(category.subcategories, 3).map(
                            (group, idx) => (
                              <div
                                key={idx}
                                className="flex min-w-[150px] flex-col space-y-2"
                                style={{
                                  animationDelay: `${idx * 100}ms`,
                                }}
                              >
                                {group.map((sub, subIdx) => {
                                  const subHref = `${href}/${sub.slug}`;
                                  const isSubActive =
                                    pathname === subHref;

                                  return (
                                    <Link
                                      key={sub.id}
                                      href={subHref}
                                      className={`relative group/item px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ease-out transform hover:transition-all before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:transition-all before:duration-300 before:ease-out after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-blue-500/10 after:via-purple-500/10 after:to-pink-500/10 after:rounded-lg after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:before:w-2 hover:after:opacity-100 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer whitespace-nowrap ${
                                        isSubActive
                                          ? 'text-blue dark:text-blue before:w-2 after:opacity-100 shadow-lg shadow-blue-500/10'
                                          : 'text-gray/80 dark:text-foreground hover:text-gray dark:hover:text-white'
                                      }`}
                                    >
                                      <span className="relative z-10 transition-all duration-300">
                                        {sub.name}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            ),
                          )}
                            {category.image && (
                              <div className="hidden xl:block shrink-0 ml-auto">
                                <div className="relative h-44 w-72 overflow-hidden rounded-xl border border-border/60 shadow-lg">
                                <Image
                                  src={category.image}
                                  alt={category.name}
                                  fill
                                  className="object-cover"
                                  sizes="288px"
                                />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-full blur-2xl animate-pulse"></div>
                        <div
                          className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-pulse"
                          style={{ animationDelay: '1s' }}
                        ></div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
            </li>
          );
        })}
        {staticLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`relative uppercase text-sm font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:transition-all before:duration-300 before:ease-in-out after:content-[''] after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:transition-all after:duration-300 after:ease-in-out hover:before:w-full hover:after:opacity-100 hover:transform hover:scale-105 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 before:w-full after:opacity-100'
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
