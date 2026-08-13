/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-offwhite': '#FAF9F6',
        'bg-surface': '#FFFFFF',
        primary: '#0F172A',
        'primary-accent': '#02594E',
        'text-secondary': '#475569',
        muted: '#64748B',
        'accent-orange': '#FF7A59',
        'accent-purple': '#8B5CF6',
        'accent-blue': '#3B82F6',
        'accent-green': '#10B981',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        surface: '0px 8px 32px rgba(16, 24, 40, 0.06), 0px 2px 6px rgba(16, 24, 40, 0.04)',
        pill: '0px 8px 32px rgba(16, 24, 40, 0.14), 0px 2px 8px rgba(16, 24, 40, 0.06)',
        card: '0px 4px 16px rgba(16, 24, 40, 0.08)',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
};
