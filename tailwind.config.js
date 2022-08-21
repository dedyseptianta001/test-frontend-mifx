/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '11.25rem',
      },
    },
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
    },  
    extend: {
      colors: {
        'gray-45' : '#454545',
        'gray-cc' : '#CCD0D6',
        'gray-a1' : '#A1A9B1',
        'gray-f9' : '#f9f9f9',
        'gray-d3' : '#D3D3D2',
        'gray-ab' : '#ABABAB',
        'yellow' : '#F7C244',
        'green' : '#4CA85E',
        'red' : '#EC584D',
      },
      boxShadow: {
        'c-green' : '0px 4px 12px rgba(76, 168, 94, 0.25)',
        'c-yellow' : '0px 4px 12px rgba(247, 194, 68, 0.25)',
        'c-box' : '1px 1px 12px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}