/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        bg: "#02040b",
        "bg-alt": "#050814",
        panel: "rgba(10, 15, 30, 0.7)",
        "panel-border": "rgba(255, 255, 255, 0.08)",
        "accent-cyan": "#00f2fe",
        "accent-blue": "#4facfe",
        "accent-purple": "#8e2de2",
        "accent-orange": "#ff8c42",
        "text-main": "#f8fafc",
        "text-muted": "#94a3b8",
        "shadow-neon": "0 0 20px rgba(0, 242, 254, 0.3)",
      },
      fontFamily: {
        "space-grotesk": "'Space Grotesk', sans-serif",
        orbitron: "'Orbitron', sans-serif",
      },
      fontSize: {
        sm: ["0.875rem", { lineHeight: "1.5rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      borderRadius: {
        xl: "32px",
        lg: "24px",
        md: "16px",
        sm: "12px",
      },
      boxShadow: {
        neon: "0 0 30px rgba(0, 242, 254, 0.4)",
        "neon-lg": "0 0 50px rgba(0, 242, 254, 0.6)",
        "neon-glow": "0 0 20px rgba(0, 242, 254, 0.3)",
        navbar:
          "0 18px 48px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
      opacity: {
        "05": "0.05",
        "03": "0.03",
      },
      backgroundImage: {
        "gradient-neon":
          "linear-gradient(135deg, #12e6ff 0%, #37b0ff 50%, #12e6ff 100%)",
        "gradient-cyan-blue": "linear-gradient(135deg, #00f2fe, #4facfe)",
        "gradient-blue-purple": "linear-gradient(135deg, #4facfe, #8e2de2)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 30s linear infinite reverse",
        "spin-slowest": "spin 40s linear infinite",
        "pulse-subtle": "pulse 2s infinite",
        float: "float 6s ease-in-out infinite",
        "loader-pulse": "loader-pulse 2.8s ease-in-out infinite",
        "loader-entry":
          "loader-entry 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.1s forwards",
        "loader-line-reveal": "loader-line-reveal 0.65s ease 0.4s forwards",
        "loader-sweep": "loader-sweep 1.35s linear 1.05s infinite",
        "loader-caption": "loader-caption 0.55s ease 0.72s forwards",
      },
      keyframes: {
        "loader-pulse": {
          "0%, 100%": { opacity: "0.05", transform: "scale(1)" },
          "50%": { opacity: "0.15", transform: "scale(1.1)" },
        },
        "loader-entry": {
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "loader-line-reveal": {
          to: { opacity: "1", transform: "scaleX(1)" },
        },
        "loader-sweep": {
          to: { transform: "translateX(120%)" },
        },
        "loader-caption": {
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      spacing: {
        wrap: "min(1280px, 100% - 3rem)",
      },
      maxWidth: {
        wrap: "1280px",
        section: "60ch",
      },
      zIndex: {
        5: "5",
        10: "10",
        100: "100",
        200: "200",
        999: "999",
      },
      transitionDuration: {
        250: "250ms",
        300: "300ms",
        350: "350ms",
        400: "400ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
