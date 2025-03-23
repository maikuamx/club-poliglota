/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D235F',
        secondary: '#E5E3F3',
        accent: '#FF6B35',
        highlight: '#F4D35E',
        background: '#F7F7F7',
        text: '#333333',
      },
    },
  },
  plugins: [],
};