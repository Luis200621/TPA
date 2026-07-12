import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        telealae: {
          primary: "#211C84",
          interactive: "#39409D",
          accent: "#4D55CC",
          secondary: "#6259C3",
          decorative: "#B5A8D5",
          surface: "#F4F2FA",
          ink: "#1F1D3D",
        },
      },
      boxShadow: {
        telealae: "0 20px 45px rgba(33, 28, 132, 0.18)",
        telealaeSoft: "0 10px 25px rgba(57, 64, 157, 0.16)",
      },
      borderRadius: {
        telealae: "1.75rem",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
