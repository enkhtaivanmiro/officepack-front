/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    'w-[459px]',
    'sm:w-[459px]',
    'max-w-[459px]',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
      maxWidth: {
        container: '1086px',
        fluid: '1344px',
      },
      screens: {
        xs: '576px',
        md: '991px',
        sm: '640px',
      },
    },
    
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  
};
