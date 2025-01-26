/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
        warning: '#f59e0b',
        success: '#10b981',
        error: '#ef4444',
        bg: {
          light: '#ffffff',
          dark: '#111827', 
        },
        text: {
          light: '#374151',
          dark: '#f3f4f6', 
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class'
};