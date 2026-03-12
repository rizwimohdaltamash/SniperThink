/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border|from|to)-(brand|emerald|teal|cyan|blue)-(50|200|400|500|600)/,
    },
    'border-brand-500/30', 'hover:bg-brand-500/10', 'hover:border-brand-500', 'focus:ring-brand-500/50',
    'border-emerald-500/30', 'hover:bg-emerald-500/10', 'hover:border-emerald-500', 'focus:ring-emerald-500/50',
    'border-teal-500/30', 'hover:bg-teal-500/10', 'hover:border-teal-500', 'focus:ring-teal-500/50',
    'border-cyan-500/30', 'hover:bg-cyan-500/10', 'hover:border-cyan-500', 'focus:ring-cyan-500/50',
    'border-blue-500/30', 'hover:bg-blue-500/10', 'hover:border-blue-500', 'focus:ring-blue-500/50'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        surface: {
          DEFAULT: '#f8fafc',
          light: '#ffffff',
          card: '#ffffff',
          hover: '#f1f5f9',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at center top, rgba(16, 185, 129, 0.1), transparent 60%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
}
