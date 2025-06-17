// tailwind.config.js
module.exports = {
  darkMode: 'media', // atau 'class' jika kamu pakai toggle manual
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        120: '30rem',
      },
      keyframes: {
        'soft-bounce': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(5%)' },
        },
      },
      animation: {
        'soft-bounce': 'soft-bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
