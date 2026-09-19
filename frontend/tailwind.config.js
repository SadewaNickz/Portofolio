/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0a", // background utama
        surface: "#141414", // kartu / panel
        raised: "#1e1e1e", // hover surface
        line: "#2a2a2a", // border
        fg: "#f5f5f5", // teks utama
        muted: "#9a9a9a", // teks sekunder
        accent: "#e60012", // merah Persona 5
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Anton", "Archivo Black", "Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        marquee: "marquee 22s linear infinite",
        glitch: "glitch 0.35s steps(2, end) infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glitch: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2px, 1px)" },
          "50%": { transform: "translate(2px, -1px)" },
          "75%": { transform: "translate(-1px, -1px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
