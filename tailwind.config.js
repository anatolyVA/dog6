/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        26: "calc(26px * var(--zoomCoef))",
        28: "calc(28px * var(--zoomCoef))",
        30: "calc(30px * var(--zoomCoef))",
        32: "calc(32px * var(--zoomCoef))",
        34: "calc(34px * var(--zoomCoef))",
        36: "calc(36px * var(--zoomCoef))",
        42: "calc(42px * var(--zoomCoef))",
        50: "calc(50px * var(--zoomCoef))",
        52: "calc(52px * var(--zoomCoef))",
        59: "calc(59px * var(--zoomCoef))",
        70: "calc(70px * var(--zoomCoef))",
      },
    },
  },
  plugins: [],
};
