/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B9F',
          dark: '#FF4785',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};