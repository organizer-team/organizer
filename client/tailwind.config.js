/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        organizerPurple: {
          primary:'#9747FF',
          light: '#B580FF',
          dark: '#6E24B1',
          accentLight: '#C996FF',
          accentDark: '#7A1FC3',},

        organizerGray: {
          primary:'#E5E5E5',
          light: '#F2F2F2',
          dark: '#333333',},
          
        organizerRed: {primary: '#FF5C5C',},
        organizerBlue: {primary: '#4A90E2',},
        organizerGreen: {primary: '#00C48C',},
        
      },
    },
  },
  plugins: [],
};
