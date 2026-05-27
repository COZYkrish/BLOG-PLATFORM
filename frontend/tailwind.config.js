/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
      //   primary: "#3b82f6",
      //   secondary: "#a855f7",
      //   accent: "#ec4899",
      //   dark: "#0f172a",
      //   darker: "#020617",
      // },
      // animation: {
      //   blob: 'blob 7s infinite',
      //   'fade-in': 'fadeIn 0.5s ease-in-out',
      //   'slide-in': 'slideIn 0.5s ease-out',
      // },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

