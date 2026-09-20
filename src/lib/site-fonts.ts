import localFont from "next/font/local";

export const siteFontManrope = localFont({
  src: [{ path: "../../public/fonts/manrope-latin.woff2", style: "normal", weight: "200 800" }],
  variable: "--font-manrope",
  display: "swap",
});

export const siteFontVazirmatn = localFont({
  src: [{ path: "../../public/fonts/vazirmatn-arabic.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-vazirmatn",
  display: "swap",
});
