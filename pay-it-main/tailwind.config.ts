import type { Config } from "tailwindcss";
import { createShadcnPreset, overrideShadcnTheme } from "mizuhara/plugins";
import { withUt } from "uploadthing/tw";
import gridPlugin from "@savvywombat/tailwindcss-grid-areas";

/** @type {import('tailwindcss').Config} */
const config = withUt({
  presets: [
    createShadcnPreset({
      theme: overrideShadcnTheme({
        dark: {
          card: "#4B5563",
        },
      }),
    }),
  ],
  content: ["src/{app,components}/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      colors: {
        "primary-ascent": "#EA580C",
        "nav-item": "#fb923c",
        "line-hero": "#A3A3A3",
        primary: "#765EA2",
        secondary: "#DD802B",
        featured: "#FBFBFB",
        admin: "hsl(var(--admin))",
        "nav-sidebar": "hsl(var(--nav-sidebar))",
      },
      animation: {
        touch: "touch 4s infinite linear",
      },
      keyframes: {
        touch: {
          "0%": { transform: "translate(0)" },
          "80%": { transform: "translateY(4px) rotate(0deg)" },
          "82%": { transform: "translateY(-4px) rotate(0deg)" },
          "84%": { transform: "translateY(4px) rotate(0deg)" },
          "86%": { transform: "translateY(-4px) rotate(0deg)" },
          "88%": { transform: "translateY(0) rotate(0deg)" },
          "90%": { transform: "translateY(-4px) rotate(0deg)" },
          "92%": { transform: "translateY(4px) rotate(0deg)" },
          "94%": { transform: "translateY(-4px) rotate(0deg)" },
          "96%": { transform: "translateY(4px) rotate(0deg)" },
          "98%": { transform: "translateY(-4px) rotate(0deg)" },
          "100%": { transform: "translateY(0) rotate(0deg)" },
        },
      },
      gridTemplateAreas: {
        // biome-ignore format: More readable
        "preview-layout-desktop": [
          ". video",
          "title video",
          "description video",
          "button video",
          ". video",
        ],
        // biome-ignore format: More readable
        "preview-layout-mobile": [
          "title",
          "video",
          "description",
          "button",
        ],
      },
      gridTemplateColumns: {
        "preview-layout-desktop": "1fr 2fr",
        "preview-layout-mobile": "1fr",
      },
    },
  },
  plugins: [gridPlugin],
}) satisfies Config;

export default config;
