/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",


  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      boxShadow:{
        "baseShadow": '16px 16px',
        'hoverShadow':'8px 8px'
      },
    },
  },
  plugins: [],
}

