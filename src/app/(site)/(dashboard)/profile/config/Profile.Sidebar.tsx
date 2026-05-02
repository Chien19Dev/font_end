'use client';

import { Card } from '@/components/ui/card';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import { TAB_CONFIG, TabValue } from './Profile.config';
import { motion, LayoutGroup } from 'framer-motion';

type Props = {
  fullName?: string;
  email?: string;
  activeTab: TabValue;
};

export function ProfileSidebar({ fullName, email, activeTab }: Props) {
  return (
    <Card className="p-6 bg-card border-border sticky top-8">
      <div className="text-center mb-4">
        <Typography variant="h3" className="mb-1 text-card-foreground">
          {fullName || 'Chưa có tên'}
        </Typography>
        <p className="text-muted-foreground text-sm">{email || 'Chưa có email'}</p>
      </div>

      <LayoutGroup id="profile-sidebar">
        <TabsList className="relative flex-col h-auto bg-transparent p-0 w-full space-y-2">
          {TAB_CONFIG.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.value;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="relative w-full justify-start p-4 h-auto rounded-lg border-0 bg-transparent
                  data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  data-[state=active]:text-primary-foreground
                  hover:bg-accent/60 transition-colors duration-150"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-bg"
                    className="absolute inset-0 bg-primary rounded-lg z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-3 w-full">
                  <motion.div
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                  </motion.div>
                  <div className="text-left flex-1">
                    <div
                      className={`font-medium text-sm transition-colors duration-150 ${isActive ? 'text-primary-foreground' : ''}`}
                    >
                      {item.label}
                    </div>
                    <div
                      className={`text-xs mt-0.5 transition-colors duration-150 ${isActive ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </LayoutGroup>
    </Card>
  );
}
