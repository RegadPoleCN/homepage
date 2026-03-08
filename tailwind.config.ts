import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        accent: 'var(--accent-color)',
      },
    },
  },
  plugins: [],
} satisfies Config
