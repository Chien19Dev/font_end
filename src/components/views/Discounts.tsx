import { allVouchers, featuredVouchers, Voucher } from '@/data/voucher';
import { alertSuccess } from '@/lib/alerts';
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Gift,
  Percent,
  Star,
  TicketPercent,
  Truck,
} from 'lucide-react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function Discounts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState('');
  const [savedVouchers, setSavedVouchers] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState('all');
  const [showPopup, setShowPopup] = useState(false);
  const [popupVoucher, setPopupVoucher] = useState<Voucher | null>(null);
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 2 : 1;
    }
    return 1;
  };
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };
    setItemsPerSlide(getItemsPerSlide());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (isMounted) {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredVouchers.length / itemsPerSlide));
      }
    }, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [itemsPerSlide]);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        setShowPopup(true);
        setPopupVoucher(featuredVouchers[0]);
      }
    }, 2000);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const copyCode = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      alertSuccess(`Đã sao chép mã: ${code}`);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, []);
  const saveVoucher = useCallback((id: number) => {
    setSavedVouchers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredVouchers.length / itemsPerSlide));
  };
  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(featuredVouchers.length / itemsPerSlide)) %
        Math.ceil(featuredVouchers.length / itemsPerSlide),
    );
  };
  const filteredVouchers = allVouchers.filter(
    (voucher) => filter === 'all' || voucher.category === filter || voucher.type === filter,
  );
  const formatTimeLeft = (timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`;
  };
  const getIcon = (type: string) => {
    switch (type) {
      case 'percentage':
      case 'cashback':
        return <Percent className="w-5 h-5" />;
      case 'shipping':
        return <Truck className="w-5 h-5" />;
      case 'combo':
        return <Gift className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };
  return (
    <Fragment>
      <div className="mx-auto h-full w-full max-w-full px-4 py-6 sm:px-6 md:px-10 md:py-8 xl:px-15 2xl:px-16">
        <div className="mb-8 text-center md:mb-12">
          <h1 className="mb-3 bg-gradient-to-r from-purple to-blue bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Ưu Đại Đặc Biệt
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-foreground/90 sm:text-base md:text-lg">
            Khám phá các mã giảm giá hấp dẫn và tiết kiệm ngay hôm nay!
          </p>
        </div>
        <section className="mb-10 md:mb-16">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground sm:text-2xl md:mb-6">
            <span className="text-xl sm:text-2xl">
              <Star className=" fill text-yellow-500" />
            </span>
            Voucher Nổi Bật
          </h2>
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({
                length: Math.ceil(featuredVouchers.length / itemsPerSlide),
              }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="mb-3 grid grid-cols-1 gap-4 px-1 sm:px-2 lg:grid-cols-2 lg:gap-6 lg:px-3">
                    {featuredVouchers
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((voucher) => (
                        <div
                          key={voucher.id}
                          className={`${voucher.background} relative h-auto min-h-[320px] overflow-hidden rounded-xl p-4 sm:p-6 lg:h-80 lg:p-8`}
                        >
                          <div className="relative z-10 h-full flex flex-col justify-between text-white">
                            <div className="space-y-3 sm:space-y-4">
                              <div className="flex items-center gap-2 text-sm opacity-90">
                                {getIcon(voucher.type)}
                                <span className="uppercase tracking-wide">Ưu đãi đặc biệt</span>
                              </div>
                              <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                                {voucher.title}
                              </h3>
                              <p className="text-sm opacity-90 sm:text-base lg:text-lg">
                                {voucher.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                                  <span className="text-sm opacity-80">Mã:</span>
                                  <span className="font-mono font-bold ml-2">{voucher.code}</span>
                                </div>
                                <button
                                  onClick={() => copyCode(voucher.code)}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                    copiedCode === voucher.code
                                      ? 'bg-green-500 transform scale-105'
                                      : 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30'
                                  }`}
                                >
                                  {copiedCode === voucher.code ? (
                                    <>
                                      <Check className="w-4 h-4" /> Đã sao chép!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-4 h-4" /> Sao chép
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-end sm:justify-between">
                              <div className="space-y-1">
                                <p className="text-sm opacity-80">Còn lại:</p>
                                <div className="flex items-center gap-1 text-lg font-semibold">
                                  <Calendar className="w-4 h-4" />
                                  {formatTimeLeft(voucher.timeLeft)}
                                </div>
                              </div>
                              <button className="w-full rounded-full bg-purple px-6 py-3 font-semibold text-popover shadow-lg transition-all duration-300 hover:scale-105 hover:bg-purple/80 sm:w-auto cursor-pointer">
                                Dùng Ngay
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 sm:left-4 sm:block sm:p-3"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 sm:right-4 sm:block sm:p-3"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-0">
              {Array.from({
                length: Math.ceil(featuredVouchers.length / itemsPerSlide),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide ? 'bg-primary w-6' : 'bg-primary/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="mb-4 flex flex-col gap-4 md:mb-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground sm:text-2xl">
              <span className="text-xl sm:text-2xl">
                <TicketPercent className="text-yellow-500" />
              </span>
              Tất Cả Ưu Đãi
            </h2>
            <div className="-mx-1 overflow-x-auto px-1">
              <div className="flex w-max gap-2 pb-1">
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'percentage', label: 'Giảm %' },
                { key: 'shipping', label: 'Freeship' },
                { key: 'fixed', label: 'Giảm cố định' },
                { key: 'combo', label: 'Combo' },
              ].map((filterItem) => (
                <Button
                  key={filterItem.key}
                  onClick={() => setFilter(filterItem.key)}
                  className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 sm:px-4 sm:text-sm ${
                    filter === filterItem.key
                      ? 'text-foreground shadow-lg transform scale-105'
                      : 'bg-background text-foreground hover-border'
                  }`}
                >
                  {filterItem.label}
                </Button>
              ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVouchers.map((voucher, index) => (
              <div
                key={voucher.id}
                className="group relative bg-purple/5 rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="h-15 flex items-center overflow-hidden bg-blue">
                  <div className="ml-3 flex items-center space-x-2 text-background sm:space-x-3">
                    <div className="flex items-center justify-center">{getIcon(voucher.type)}</div>
                    <span className="text-base font-bold sm:text-xl">{voucher.discount}</span>
                    <h3 className="line-clamp-1 text-sm font-semibold sm:text-base">
                      {voucher.title}
                    </h3>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <p className="text-sm text-foreground line-clamp-2">{voucher.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-purple">{voucher.code}</span>
                      <button
                        onClick={() => copyCode(voucher.code)}
                        className={`p-1 rounded transition-all duration-300 ${
                          copiedCode === voucher.code
                            ? 'bg-green-100 text-green-600 transform scale-110'
                            : 'hover:bg-gray-200 text-gray-400'
                        }`}
                      >
                        {copiedCode === voucher.code ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Calendar className="w-4 h-4" />
                    <span>Còn {formatTimeLeft(voucher.timeLeft)}</span>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => saveVoucher(voucher.id)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer ${
                        savedVouchers.has(voucher.id)
                          ? 'bg-purple/60 text-white border border-purple/20'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {savedVouchers.has(voucher.id) ? '✓ Đã lưu' : 'Lưu'}
                    </button>
                    <button className="flex-1 bg-purple text-white py-2 px-4 rounded-lg hover:bg-purple/70 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      Dùng ngay
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Fragment>
  );
}
