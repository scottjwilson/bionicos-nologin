module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ["Work Sans"],
      },
      colors: {
        brand: {
          green: "#9dc24e",
          red: "#ff6b37",
          redhover: "#cc552c",
          yellow: "#feef2c",
        },
      },
      screens: {
        standalone: { raw: "(display-mode: standalone)" },
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('https://res.cloudinary.com/swdb/image/upload/v1646350635/hero2_dsptlf.jpg')",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
