
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0e27', // Deep navy background
          800: '#111633', // Lighter navy
        },
        neon: {
          violet: '#7F00FF',
          blue: '#00C6FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-violet': '0 0 5px rgba(127, 0, 255, 0.5), 0 0 20px rgba(127, 0, 255, 0.3)',
        'neon-blue': '0 0 5px rgba(0, 198, 255, 0.5), 0 0 20px rgba(0, 198, 255, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #7F00FF 0deg, #00C6FF 180deg, #7F00FF 360deg)',
      }
    },
  },
  plugins: [],
}
