import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": {
          "very-dark": "#0F2D22",
          primary: "#153628",
          "2": "#1E4232",
          "3": "#264E39",
          mid: "#335842",
        },
        "soft-green": "#264E39",
        "muted-green": "#335842",
        gold: "#C7AB50",
        "off-white": "#F4F5F4",
        "soft-gray": "#E6E6DE",
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'blob': 'blob 20s infinite',
        'blob-2': 'blob-2 25s infinite',
        'float': 'float 6s ease-in-out infinite',
        'particle': 'particle 15s linear infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'blob-2': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-30px, 50px) scale(0.9)' },
          '66%': { transform: 'translate(20px, -20px) scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        particle: {
          '0%': { transform: 'translateY(0) translateX(0) opacity(0)' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(100px) opacity(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;


