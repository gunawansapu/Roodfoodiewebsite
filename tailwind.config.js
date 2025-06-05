// tailwind.config.js
module.exports = {
  darkMode: 'media', // atau 'class' jika kamu pakai toggle manual
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        120: '30rem',
      },
    },
  },
  plugins: [],
};
