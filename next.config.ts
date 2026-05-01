const nextConfig = {
  allowedDevOrigins: ['192.168.1.242'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'tailwindcss.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'file.hstatic.net' },
      { protocol: 'https', hostname: 'product.hstatic.net' },
      { protocol: 'https', hostname: 'cdn.hstatic.net' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'n7media.coolmate.me' },
      { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'mcdn.coolmate.me' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'stylerepublik.vn' },
      { protocol: 'https', hostname: 'leika.vn' },
    ],
  },
};

module.exports = nextConfig;
