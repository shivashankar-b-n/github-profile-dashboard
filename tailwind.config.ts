import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        panel: '#191919',
        panelAlt: '#1f1f1f',
        accent: '#3B82F6',
        softText: '#8f8f8f',
        borderSoft: 'rgba(255,255,255,0.08)',
        cardGlow: 'rgba(59,130,246,0.15)'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.28)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
