/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      boxShadow: {
        'tone': '0 4px 14px 0 rgba(0, 0, 0, 0.2)',
      },
      colors: {
        'tone-purple': {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
        },
        'tone-blue': {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
        },
        'tone-red': {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
    },
  },
  plugins: [],
}