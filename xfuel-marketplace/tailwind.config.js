/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00d4ff',
        'neon-blue-dark': '#0099bb',
        'charcoal': '#1a1a1a',
        'charcoal-light': '#242424',
        'charcoal-mid': '#2d2d2d',
        'charcoal-border': '#3a3a3a',
        'steel': '#4a5568',
        'verified-green': '#00ff88',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 212, 255, 0.3)',
        'neon-sm': '0 0 10px rgba(0, 212, 255, 0.2)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
