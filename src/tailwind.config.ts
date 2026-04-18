export default {
  theme: {
    extend: {
      colors: {
        gi: {
          navy: {
            DEFAULT: "#0D1B3E",
            50: "#E8ECF4",
            100: "#C5CEDD",
            200: "#A8B4CB",
            300: "#8A99B5",
            400: "#6D7E9F",
            500: "#536389",
            600: "#3E4D73",
            700: "#2B3A5E",
            800: "#192847",
            900: "#050D1F",
          },
          gold: { DEFAULT: "#C9A84C", light: "#E8CF8A", dark: "#9A7A28" },
          blue: { DEFAULT: "#1A3A6B", light: "#2A5099", dark: "#0F2347" },
        },
      },
      fontFamily: {
        heading: ['var(--font-manrope), ui-sans-serif, system-ui, sans-serif'],
        body: ['var(--font-manrope), ui-sans-serif, system-ui, sans-serif'],
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        scaleIn: { from: { opacity: "0", transform: "scale(0.95)" }, to: { opacity: "1", transform: "scale(1)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        "fade-up": "fadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.5s ease-out both",
        "scale-in": "scaleIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
};
