/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#9747FF',
        lighterShade: '#B580FF',
        darkerShade: '#6E24B1',
        accentLightPurple: '#C996FF',
        accentDarkPurple: '#7A1FC3',
        neutralLightGray: '#F2F2F2',
        neutralDarkGray: '#333333',
      },
    },
  },
  plugins: [],
};
