import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      transitionDuration: {
        "900": "900ms",
      },
      transitionDelay: {
        "600": "600ms",
      },
      animation: {
        flow: "flow 1s ease-in-out infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
      },
      keyframes: {
        flow: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(5%)" },
        },
        wiggle: {
          "0%, 10%, 20%": { transform: "rotate(-10deg)" },
          "5%, 15%, 25%": { transform: "rotate(10deg)" },
          "30%": { transform: "rotate(0)" },
        },
      },
      backgroundImage: {
        grad: "radial-gradient(circle farthest-corner at 0 0, #000 30%, #a899fb 65%, #732fc9 80%, #c1f1ff 110%) no-repeat, radial-gradient(closest-side at 60% 50%, #732fc9 20%, #000 100%) no-repeat;",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
