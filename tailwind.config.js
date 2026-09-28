/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#EBE1D3',
        },
        blush: {
          50: '#FDF0ED',
          100: '#F8E1DC',
          200: '#F3C5C0',
          300: '#E89CA3',
        },
        rose: {
          500: '#D9777F',
          600: '#C45B66',
          700: '#A8434E',
        },
        burgundy: {
          800: '#5C1D2E',
          900: '#4A1525',
          950: '#1F060D',
        },
        gold: {
          300: '#F3E5AB',
          400: '#E5C158',
          500: '#D4AF37',
          600: '#AA8C2C',
        },
        darkRomantic: {
          900: '#0F050A',
          800: '#1A0A13',
          700: '#260E1C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Dancing Script"', '"Sacramento"', 'cursive'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.3)',
        'glow-rose': '0 0 25px rgba(217, 119, 127, 0.3)',
        'glow-burgundy': '0 0 35px rgba(74, 21, 37, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 6, 13, 0.1)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
