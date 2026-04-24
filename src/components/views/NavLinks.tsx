'use client';

import { alertError } from '@/lib/alerts';
import { Category, getAllCategories } from '@/services/categoryApi';
import {
  Box,
  Container,
  Divider,
  Link as MuiLink,
  Paper,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

type MegaSubcategory = {
  id: string;
  name: string;
  slug: string;
};

function normalizeKeyword(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ')
    .trim();
}

function classifySubcategoryBySlug(sub: MegaSubcategory) {
  const slug = normalizeKeyword(sub.slug || '');
  const name = normalizeKeyword(sub.name || '');
  const key = `${slug} ${name}`;
  if (
    slug.includes('quan-lot') ||
    slug.includes('do-lot') ||
    slug.includes('brief') ||
    slug.includes('trunk') ||
    slug.includes('boxer') ||
    key.includes('quan lot')
  ) {
    return 'quan-lot';
  }

  if (
    slug.startsWith('ao-') ||
    slug.includes('-ao-') ||
    slug.includes('tanktop') ||
    slug.includes('so-mi') ||
    slug.includes('polo') ||
    slug.includes('thun') ||
    slug.includes('khoac') ||
    key.startsWith('ao ')
  ) {
    return 'ao';
  }

  if (
    slug.startsWith('quan-') ||
    slug.includes('-quan-') ||
    slug.includes('short') ||
    slug.includes('jogger') ||
    slug.includes('jean') ||
    slug.includes('kaki') ||
    slug.includes('boi') ||
    key.startsWith('quan ')
  ) {
    return 'quan';
  }

  if (
    slug.includes('phu-kien') ||
    slug.includes('tat') ||
    slug.includes('mu') ||
    slug.includes('vi') ||
    slug.includes('tui') ||
    slug.includes('that-lung') ||
    key.includes('phu kien')
  ) {
    return 'phu-kien';
  }

  return 'other';
}

function buildSubcategoryColumns(subcategories: MegaSubcategory[]) {
  const columns = [
    {
      key: 'ao',
      label: 'Áo Nam',
      items: [] as MegaSubcategory[],
    },
    {
      key: 'quan',
      label: 'Quần Nam',
      items: [] as MegaSubcategory[],
    },
    {
      key: 'quan-lot',
      label: 'Quần lót nam',
      items: [] as MegaSubcategory[],
    },
    {
      key: 'phu-kien',
      label: 'Phu kien',
      items: [] as MegaSubcategory[],
    },
  ];

  const remaining: MegaSubcategory[] = [];
  subcategories.forEach((sub) => {
    const bucket = classifySubcategoryBySlug(sub);
    if (bucket === 'ao') columns[0].items.push(sub);
    else if (bucket === 'quan') columns[1].items.push(sub);
    else if (bucket === 'quan-lot') columns[2].items.push(sub);
    else if (bucket === 'phu-kien') columns[3].items.push(sub);
    else remaining.push(sub);
  });

  if (remaining.length) {
    columns[1].items.push(...remaining);
  }

  return columns.filter((column) => column.items.length > 0);
}

export default function NavLinks({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = React.useState<string | null>(null);
  const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();

        const desiredOrderBySlug = ['nam', 'nu', 'phu-kien', 'the-thao'];
        const desiredIndexMap = new Map(desiredOrderBySlug.map((slug, index) => [slug, index]));

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

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMegaMenu = React.useCallback(
    (categoryId: string) => {
      clearCloseTimer();
      setActiveCategoryId(categoryId);
    },
    [clearCloseTimer],
  );

  const scheduleCloseMegaMenu = React.useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveCategoryId(null);
    }, 120);
  }, [clearCloseTimer]);

  const staticLinks = [
    { name: 'Liên hệ', href: '/lien-he' },
    { name: 'Về chúng tôi', href: '/ve-chung-toi' },
    { name: 'Blog', href: '/blog' },
  ];
  const activeCategory = categories.find((category) => category.id === activeCategoryId) || null;
  const activeCategoryHref = activeCategory ? `/${activeCategory.slug_category}` : '';
  const groupedColumns = React.useMemo(
    () => buildSubcategoryColumns((activeCategory?.subcategories || []) as MegaSubcategory[]),
    [activeCategory],
  );

  React.useEffect(() => {
    const updateMenuPosition = () => {
      if (!navRef.current || typeof window === 'undefined') return;
      const rect = navRef.current.getBoundingClientRect();
      setMenuPosition({
        top: Math.round(rect.bottom + window.scrollY + 8),
        left: Math.round(window.innerWidth / 2),
      });
    };

    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);
    window.addEventListener('scroll', updateMenuPosition, { passive: true });
    return () => {
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('scroll', updateMenuPosition);
    };
  }, [activeCategoryId]);

  return (
    <Box
      ref={navRef}
      className={className}
      sx={{ width: '100%', position: 'relative' }}
      onMouseLeave={scheduleCloseMegaMenu}
    >
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {categories.map((category) => {
          const href = `/${category.slug_category}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Box key={category.id} onMouseEnter={() => openMegaMenu(category.id)}>
              <MuiLink
                component={Link}
                href={href}
                underline="none"
                color="inherit"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1.8,
                  py: 0.9,
                  borderRadius: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  fontSize: 14,
                  color: isActive ? 'primary.main' : 'text.primary',
                  borderBottom: '2px solid',
                  borderBottomColor: isActive ? 'primary.main' : 'transparent',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                    borderBottomColor: 'primary.main',
                  },
                }}
              >
                {category.name}
              </MuiLink>
            </Box>
          );
        })}
        {staticLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Box key={link.name} onMouseEnter={scheduleCloseMegaMenu}>
              <MuiLink
                component={Link}
                href={link.href}
                underline="none"
                color="inherit"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1.8,
                  py: 0.9,
                  borderRadius: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  fontSize: 14,
                  color: isActive ? 'primary.main' : 'text.primary',
                  borderBottom: '2px solid',
                  borderBottomColor: isActive ? 'primary.main' : 'transparent',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                    borderBottomColor: 'primary.main',
                  },
                }}
              >
                {link.name}
              </MuiLink>
            </Box>
          );
        })}
      </Stack>

      <Popover
        open={Boolean(activeCategory) && Boolean(activeCategory?.subcategories?.length)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
        onClose={() => setActiveCategoryId(null)}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        marginThreshold={0}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            onMouseEnter: clearCloseTimer,
            onMouseLeave: scheduleCloseMegaMenu,
            sx: {
              width: 'calc(100vw - 12px)',
              maxWidth: 'none',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.12)',
            },
          },
        }}
      >
        {activeCategory && activeCategory.subcategories?.length ? (
          <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 }, py: 2.5 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  lg: 'minmax(0, 1fr) 320px',
                },
                gap: 2.5,
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, mb: 1.5, textTransform: 'uppercase' }}
                >
                  {activeCategory.name}
                </Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, minmax(0,1fr))',
                      lg: 'repeat(4, minmax(0,1fr))',
                    },
                    gap: 1.5,
                  }}
                >
                  {groupedColumns.map((column) => (
                    <Box
                      key={column.key}
                      sx={{
                        minWidth: 0,
                        pr: { lg: 1.5 },
                      }}
                    >
                      <Typography
                        sx={{
                          pb: 0.8,
                          fontSize: 13,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'text.primary',
                        }}
                      >
                        {column.label}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.4,
                        }}
                      >
                        {column.items.map((sub) => {
                          const subHref = `${activeCategoryHref}/${sub.slug}`;
                          const isSubActive = pathname === subHref;
                          return (
                            <MuiLink
                              key={sub.id}
                              component={Link}
                              href={subHref}
                              underline="none"
                              color="inherit"
                              sx={{
                                px: 0.5,
                                py: 0.45,
                                borderRadius: 0.8,
                                border: '1px solid transparent',
                                bgcolor: 'transparent',
                                color: isSubActive ? 'primary.main' : 'text.secondary',
                                fontSize: 13,
                                fontWeight: isSubActive ? 700 : 500,
                                transition: 'all 0.16s ease',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                  bgcolor: 'action.hover',
                                  color: 'primary.main',
                                },
                              }}
                            >
                              {sub.name}
                            </MuiLink>
                          );
                        })}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {activeCategory.image && (
                <Paper
                  variant="outlined"
                  sx={{
                    position: 'relative',
                    minHeight: 300,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </Paper>
              )}
            </Box>
          </Container>
        ) : (
          <Box
            sx={{
              px: 3,
              py: 2,
            }}
          ></Box>
        )}
      </Popover>
    </Box>
  );
}
