module.exports = {
  theme: {
    extend: {
      keyframes: {
        'pulse-bg': {
          '0%, 100%': {
            transform: 'scale(1)',
            filter: 'brightness(1)',
          },
          '50%': {
            transform: 'scale(1.05)',
            filter: 'brightness(1.05)',
          },
        },
      },
      animation: {
        'pulse-bg': 'pulse-bg 6s ease-in-out infinite',
      },
      fontFamily: {
        rosita: ['"Rosita"', 'cursive'],
      },
      colors: {
        primary: '#7F55B1',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
