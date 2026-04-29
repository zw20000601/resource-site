import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#080818",
        "bg-secondary": "#0d0d2b",
        "bg-card": "rgba(15, 15, 40, 0.8)",
        "purple-primary": "#6366f1",
        "purple-bright": "#818cf8",
        "blue-accent": "#3b82f6",
        "text-primary": "#f1f5f9",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",
        "border-purple": "rgba(99, 102, 241, 0.2)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #6366f1, #8b5cf6, #3b82f6)",
        "gradient-card": "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(99, 102, 241, 0.8)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      boxShadow: {
        "glow-purple": "0 0 30px rgba(99, 102, 241, 0.3)",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.3)",
        "card-hover": "0 8px 32px rgba(99, 102, 241, 0.2)",
      },
      fontFamily: {
        sans: ["'PingFang SC'", "'Noto Sans SC'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
