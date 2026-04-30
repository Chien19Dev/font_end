'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Check, Clock, Package, UserPlus, X } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

type Notification = {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  unread: boolean;
  type: 'order' | 'user' | 'system';
};

const NotificationIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case 'order':
      return <Package className={className} size={16} />;
    case 'user':
      return <UserPlus className={className} size={16} />;
    default:
      return <Bell className={className} size={16} />;
  }
};

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      user: 'John Doe',
      action: 'placed an order',
      target: '#1234',
      timestamp: '2m ago',
      unread: true,
      type: 'order',
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'signed up',
      target: 'your platform',
      timestamp: '10m ago',
      unread: true,
      type: 'user',
    },
    {
      id: '3',
      user: 'System',
      action: 'updated',
      target: 'your settings',
      timestamp: '1h ago',
      unread: false,
      type: 'system',
    },
    {
      id: '4',
      user: 'Mike Johnson',
      action: 'cancelled order',
      target: '#5678',
      timestamp: '2h ago',
      unread: false,
      type: 'order',
    },
    {
      id: '5',
      user: 'Sarah Wilson',
      action: 'completed order',
      target: '#9012',
      timestamp: '3h ago',
      unread: false,
      type: 'order',
    },
  ]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bellAnimation, setBellAnimation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (unreadCount > 0) {
        setBellAnimation(true);
        setTimeout(() => setBellAnimation(false), 600);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [notifications]);

  const handleViewNotification = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, unread: false } : n)),
    );
    setSelectedNotification(notification);
    setViewDialogOpen(true);
  };

  const handleDeleteNotification = () => {
    if (selectedNotification) {
      setNotifications((prev) => prev.filter((n) => n.id !== selectedNotification.id));
      setSelectedNotification(null);
    }
    setDeleteDialogOpen(false);
    setViewDialogOpen(false);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setClearAllDialogOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;
  const readNotifications = notifications.filter((n) => !n.unread);
  const unreadNotifications = notifications.filter((n) => n.unread);

  return (
    <Fragment>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`relative rounded-2xl border-none bg-background transition-all duration-300 hover:scale-105 group shadow-none focus-visible:ring-0 ${
              bellAnimation ? 'animate-pulse' : ''
            }`}
          >
            <Bell
              size={18}
              className={`transition-all duration-300 group-hover:text-[var(--primary)] ${
                bellAnimation ? 'animate-bounce' : ''
              }`}
              style={{ color: 'var(--foreground)' }}
            />
            {unreadCount > 0 && (
              <span
                className="absolute -top-2 -right-2 h-6 w-6 flex text-primary-foreground items-center justify-center rounded-full text-xs font-bold shadow-lg animate-pulse border-2 border-white"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--ring) 100%)',
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[400px] min-w-[400px] max-w-[400px]"
          style={{
            background: 'linear-gradient(135deg, var(--popover) 0%, var(--secondary) 100%)',
          }}
        >
          <DropdownMenuLabel className="text-lg font-bold flex items-center justify-between px-6 py-4 border-b border-[var(--border)] gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                <Bell size={18} />
              </div>
              <span className="text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-1 rounded-full whitespace-nowrap text-xs font-semibold bg-primary text-primary-foreground">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs transition-all duration-200 rounded-xl px-3 py-1 text-primary"
                  onClick={markAllAsRead}
                >
                  <Check size={14} className="mr-1" />
                  Mark all read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs transition-all duration-200 hover:scale-105 rounded-xl px-3 py-1"
                  style={{ color: 'var(--destructive)' }}
                  onClick={() => setClearAllDialogOpen(true)}
                >
                  <X size={14} className="mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </DropdownMenuLabel>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 w-full rounded m-4 mx-auto mb-2 p-1 bg-muted">
              <TabsTrigger
                value="all"
                className="rounded-xl transition-all text-muted-foreground duration-200"
              >
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="rounded-xl text-muted-foreground transition-all duration-200"
              >
                Unread ({unreadNotifications.length})
              </TabsTrigger>
              <TabsTrigger
                value="read"
                className="rounded-xl text-muted-foreground transition-all duration-200"
              >
                Read ({readNotifications.length})
              </TabsTrigger>
            </TabsList>

            {['all', 'unread', 'read'].map((tab) => {
              const items =
                tab === 'all'
                  ? notifications
                  : tab === 'unread'
                    ? unreadNotifications
                    : readNotifications;

              return (
                <TabsContent
                  key={tab}
                  value={tab}
                  className="max-h-[500px] overflow-y-auto px-4 py-4 space-y-2"
                >
                  {items.length > 0 ? (
                    <DropdownMenuGroup className="space-y-2">
                      {items.map((notification, index) => (
                        <DropdownMenuItem
                          key={notification.id}
                          onClick={() => handleViewNotification(notification)}
                          className={`flex items-start gap-4 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-transparent ${
                            notification.unread
                              ? 'border-[var(--primary)]/20 shadow-md'
                              : 'hover:border-[var(--border)]'
                          }`}
                          style={{
                            background: notification.unread
                              ? 'linear-gradient(135deg, var(--accent) 0%, var(--muted) 100%)'
                              : 'var(--card)',
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <div
                            className="flex-shrink-0 mt-1 p-2 rounded-xl transition-all duration-300"
                            style={{
                              background: notification.unread ? 'var(--primary)' : 'var(--muted)',
                              color: notification.unread
                                ? 'var(--primary-foreground)'
                                : 'var(--muted-foreground)',
                            }}
                          >
                            <NotificationIcon type={notification.type} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed">
                              <span className="font-bold" style={{ color: 'var(--foreground)' }}>
                                {notification.user}
                              </span>{' '}
                              <span
                                style={{
                                  color: 'var(--muted-foreground)',
                                }}
                              >
                                {notification.action}
                              </span>{' '}
                              <span className="font-semibold" style={{ color: 'var(--primary)' }}>
                                {notification.target}
                              </span>
                            </p>
                            <div
                              className="flex items-center gap-2 text-xs mt-2"
                              style={{
                                color: 'var(--muted-foreground)',
                              }}
                            >
                              <Clock size={12} />
                              {notification.timestamp}
                              {notification.type === 'order' && (
                                <span
                                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                                  style={{
                                    background: 'var(--primary)/10',
                                    color: 'var(--primary)',
                                  }}
                                >
                                  Order
                                </span>
                              )}
                              {notification.type === 'user' && (
                                <span
                                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                                  style={{
                                    background: 'var(--secondary)',
                                    color: 'var(--secondary-foreground)',
                                  }}
                                >
                                  User
                                </span>
                              )}
                            </div>
                          </div>
                          {notification.unread && (
                            <div className="flex flex-col items-center gap-2">
                              <span
                                className="h-3 w-3 rounded-full animate-pulse shadow-lg"
                                style={{
                                  background: 'var(--primary)',
                                }}
                              />
                            </div>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  ) : (
                    <div className="text-center py-12">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{ background: 'var(--muted)' }}
                      >
                        <Bell size={24} style={{ color: 'var(--muted-foreground)' }} />
                      </div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        No {tab} notifications
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        You're all caught up!
                      </p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Dialog */}
      <AlertDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <AlertDialogContent
          className="max-w-lg rounded-3xl border-2 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, var(--popover) 0%, var(--secondary) 100%)',
            borderColor: 'var(--border)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-4 text-xl">
              <div
                className="p-3 rounded-2xl"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                <NotificationIcon type={selectedNotification?.type || ''} className="w-5 h-5" />
              </div>
              <span style={{ color: 'var(--foreground)' }}>Notification Detail</span>
            </AlertDialogTitle>
            <AlertDialogDescription
              className="text-base leading-relaxed pl-16"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <div className="p-4 rounded-2xl mb-4" style={{ background: 'var(--accent)' }}>
                <p className="text-lg">
                  <span className="font-bold" style={{ color: 'var(--foreground)' }}>
                    {selectedNotification?.user}
                  </span>{' '}
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    {selectedNotification?.action}
                  </span>{' '}
                  <span className="font-semibold" style={{ color: 'var(--primary)' }}>
                    {selectedNotification?.target}
                  </span>
                </p>
                <div
                  className="flex items-center gap-2 text-sm mt-3"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <Clock size={14} />
                  {selectedNotification?.timestamp}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 pt-6">
            <AlertDialogCancel
              className="rounded-2xl transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                borderColor: 'var(--border)',
              }}
            >
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setDeleteDialogOpen(true)}
              className="rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--destructive) 0%, #dc2626 100%)',
                color: 'var(--destructive-foreground)',
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          className="rounded-3xl border-2"
          style={{
            background: 'var(--popover)',
            borderColor: 'var(--border)',
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl" style={{ color: 'var(--foreground)' }}>
              Delete notification
            </AlertDialogTitle>
            <AlertDialogDescription
              className="text-base leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Are you sure you want to delete this notification? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel
              className="rounded-2xl"
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNotification}
              className="rounded-2xl"
              style={{
                background: 'var(--destructive)',
                color: 'var(--destructive-foreground)',
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={clearAllDialogOpen} onOpenChange={setClearAllDialogOpen}>
        <AlertDialogContent
          className="rounded-3xl border-2"
          style={{
            background: 'var(--popover)',
            borderColor: 'var(--border)',
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl" style={{ color: 'var(--foreground)' }}>
              Clear all notifications
            </AlertDialogTitle>
            <AlertDialogDescription
              className="text-base leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              This will remove all notifications. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel
              className="rounded-2xl"
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAll}
              className="rounded-2xl"
              style={{
                background: 'var(--destructive)',
                color: 'var(--destructive-foreground)',
              }}
            >
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
