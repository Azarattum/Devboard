import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 10%, 20%": { transform: "rotate(-10deg)" },
          "5%, 15%, 25%": { transform: "rotate(10deg)" },
          "30%": { transform: "rotate(0)" },
        },
        flow: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(5%)" },
        },
      },
      backgroundImage: {
        grad: "radial-gradient(circle farthest-corner at 0 0, #000 30%, #a899fb 65%, #732fc9 80%, #c1f1ff 110%) no-repeat, radial-gradient(closest-side at 60% 50%, #732fc9 20%, #000 100%) no-repeat;",
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        flow: "flow 1s ease-in-out infinite",
      },
      transitionDuration: {
        "900": "900ms",
      },
      transitionDelay: {
        "600": "600ms",
      },
    },
  },
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class"],
  prefix: "",
} satisfies Config;

export default config;
