'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

export function ProfileErrorState({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center bg-card border-border">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <Typography variant="h3" className="mb-2 text-destructive">Có lỗi xảy ra</Typography>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Link href="/auth/login">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Đăng nhập lại
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export function ProfileUnauthState() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center bg-card border-border">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <UserIcon className="w-8 h-8 text-primary" />
        </div>
        <Typography variant="h3" className="mb-2">Chưa đăng nhập</Typography>
        <p className="text-muted-foreground mb-6">Vui lòng đăng nhập để xem hồ sơ của bạn.</p>
        <Link href="/auth/login">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Đăng nhập
          </Button>
        </Link>
      </Card>
    </div>
  );
}
