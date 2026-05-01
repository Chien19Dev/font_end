'use client';
import { useState, useEffect, useRef, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Check, Share2, X, FileText, ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';

const REFERRAL_CODE = 'REFERRALEQ6HIL';
const REFERRAL_LINK = `Coolmate.me/${REFERRAL_CODE}`;

function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #3B5BDB 0%, #4C6EF5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          boxShadow: '0 4px 14px rgba(59,91,219,0.35)',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: '#3B5BDB',
          marginBottom: 5,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 11.5,
          color: '#6B7280',
          lineHeight: 1.5,
        }}
      >
        {description}
      </span>
    </div>
  );
}

function ArrowDash() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 30, color: '#C5D0DE' }}>
      <svg width="36" height="16" viewBox="0 0 36 16" fill="none">
        <path
          d="M2 8 Q10 3 18 8 Q26 13 34 8"
          stroke="#C5D0DE"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          fill="none"
        />
        <path
          d="M30 5 L34 8 L30 11"
          stroke="#C5D0DE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: '#111827',
          display: 'block',
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#F8F9FB',
          border: '1.5px solid #E5E7EB',
          borderRadius: 12,
          padding: '12px 14px',
        }}
      >
        <span
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 13.5,
            color: '#374151',
            letterSpacing: 0.3,
          }}
        >
          {value}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: copied ? '#22C55E' : '#3B5BDB',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            padding: '4px 8px',
            borderRadius: 8,
            transition: 'all 0.2s',
          }}
        >
          {copied ? <Check size={15} strokeWidth={2.5} /> : <Copy size={15} strokeWidth={2} />}
          {copied ? 'COPIED!' : 'COPY'}
        </button>
      </div>
    </div>
  );
}

function ReferralModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareLink = `${currentUrl}${
      currentUrl.includes('?') ? '&' : '?'
    }refer-friend=${REFERRAL_CODE}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: 'Mua hàng cùng mình nhé!',
          url: shareLink,
        });
      } else {
        await navigator.clipboard.writeText(shareLink);
        alert(`Đã copy link:\n${shareLink}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17,24,39,0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .share-cta-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(17,24,39,0.35) !important; }
        .share-cta-btn:active { transform: translateY(0); }
        .policy-link:hover { text-decoration: underline; color: #3B5BDB !important; }
        .close-btn:hover { background: #374151 !important; }
      `}</style>
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          width: '100%',
          maxWidth: 480,
          maxHeight: '90vh',
          overflowY: 'auto',
          margin: '0 16px',
          padding: '32px 28px 28px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
          animation: 'slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          position: 'relative',
        }}
      >
        <button
          className="close-btn"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#111827',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            transition: 'background 0.2s',
          }}
        >
          <X size={16} strokeWidth={2.5} />
        </button>
        <h2
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 800,
            fontSize: 26,
            color: '#111827',
            textAlign: 'center',
            lineHeight: 1.3,
            marginBottom: 24,
            paddingRight: 24,
          }}
        >
          Giới thiệu bạn bè
          <br />
          <span style={{ color: '#3B5BDB' }}>Nhận hoàn tiền 10% CoolCash</span>
        </h2>
        <div
          style={{
            background: '#FAFBFF',
            border: '1.5px solid #EEF0FF',
            borderRadius: 16,
            padding: '20px 18px',
            marginBottom: 20,
          }}
        >
          <CopyField label="Mã giới thiệu của bạn" value={REFERRAL_CODE} />
          <CopyField label="Link giới thiệu của bạn" value={REFERRAL_LINK} />
        </div>
        <div
          style={{
            background: '#F8F9FB',
            borderRadius: 16,
            padding: '20px 16px',
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
            <Step
              icon={<FileText size={22} color="white" strokeWidth={1.8} />}
              title="Lấy mã hoặc link"
              description="Chọn sản phẩm hoặc truy cập trang CoolClub để lấy mã hoặc link giới thiệu."
            />
            <ArrowDash />
            <Step
              icon={<ShoppingBag size={22} color="white" strokeWidth={1.8} />}
              title="Chia sẻ đến bạn bè"
              description="Bạn bè mua sắm với mã hoặc link của bạn sẽ được giảm 50k cho đơn hàng đầu tiên từ 200k."
            />
            <ArrowDash />
            <Step
              icon={<Star size={22} color="white" strokeWidth={1.8} />}
              title="Nhận CoolCash"
              description="Bạn sẽ nhận 10% CoolCash theo giá trị đơn hàng sau 7 ngày từ khi đơn giao thành công."
            />
          </div>
        </div>
        <button
          onClick={handleShare}
          className="share-cta-btn"
          style={{
            width: '100%',
            padding: '15px 0',
            background: '#111827',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: 0.8,
            boxShadow: '0 4px 16px rgba(17,24,39,0.2)',
            transition: 'all 0.2s',
            marginBottom: 14,
          }}
        >
          <Share2 size={18} strokeWidth={2.5} />
          CHIA SẺ VỚI BẠN BÈ
        </button>

        <Link
          href="/chuong-trinh-gioi-thieu-ban-moi"
          className="block w-fit mx-auto text-center text-[13px] text-gray-500 cursor-pointer transition-colors duration-200 font-['Be_Vietnam_Pro'] hover:underline transform policy-link"
        >
          Xem chi tiết chính sách
        </Link>
      </div>
    </div>,
    document.body,
  );
}

export default function ProductShare() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700&display=swap');
        .share-trigger:hover { background: #EEF2FF !important; color: #3B5BDB !important; }
        .share-trigger:active { transform: scale(0.97); }
      `}</style>

      <button
        className="share-trigger"
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          background: '#F3F4F6',
          border: 'none',
          borderRadius: 10,
          padding: '9px 16px',
          cursor: 'pointer',
          color: '#374151',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          transition: 'all 0.18s',
        }}
      >
        <Share2 size={16} strokeWidth={2.5} />
        Chia sẻ
      </button>

      {open && <ReferralModal onClose={() => setOpen(false)} />}
    </Fragment>
  );
}
