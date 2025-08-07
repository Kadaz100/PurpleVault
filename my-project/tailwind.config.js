/** @type {import('tailwindcss').Config} */
export default {
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@solana/wallet-adapter-react-ui/**/*.js", // <-- ADD THIS
],
  theme: {
    extend: {
      colors: {
        purpleMain: '#1A1A2E',
        purpleAccent: '#BC63FF',
        dark: '#0D0C1D',
        light: '#EAEAEA',
        white: '#FFFFFF',
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 1.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards"
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      screens: {
        xs: '420px', // for very small phones
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
    }
  },
  plugins: [],
}