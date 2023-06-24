const { colors, fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      primary: "#5C64FF",
      success: "#29FF6E",
      warning: "#FFD942",
      error: "#FF4D49",
      black: {
        DEFAULT: "rgba(12, 12, 12, 1)",
        400: "rgba(12, 12, 12, 0.8)",
        300: "rgba(12, 12, 12, 0.6)",
        200: "rgba(12, 12, 12, 0.4)",
        100: "rgba(12, 12, 12, 0.2)",
      },
      white: {
        DEFAULT: "rgba(255, 255, 255, 1)",
        400: "rgba(255, 255, 255, 0.8)",
        300: "rgba(255, 255, 255, 0.6)",
        200: "rgba(255, 255, 255, 0.4)",
        100: "rgba(255, 255, 255, 0.2)",
      },
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
    },
    spacing: {
      px: "1px",
      0: "0px",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-helvetica)", ...fontFamily.sans],
      },
      transitionTimingFunction: {
        "in-out-input": "cubic-bezier(0.49, 0, 0.49, 1)",
      },
      keyframes: {
        fadeOut: {
          "0%": {
            opacity: 1,
            visibility: "visible",
          },
          "100%": {
            opacity: 0,
            visibility: "hidden",
          },
        },

        fadeIn: {
          "0%": {
            opacity: 0,
            visibility: "hidden",
          },
          "100%": {
            opacity: 1,
            visibility: "visible",
          },
        },

        moviecardFadeIn: {
          "0%": {
            opacity: 0,
            visibility: "hidden",
          },
          "100%": {
            opacity: 1,
            visibility: "visible",
          },
        },

        mainSliderInfoFadeUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "40%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fadeOut: "fadeOut 600ms ease-in-out",
        fadeIn: "fadeIn 600ms ease-in-out",
        moviecardFadeIn: "moviecardFadeIn 600ms ease-in-out",
        mainSliderInfoFadeUp: "mainSliderInfoFadeUp 800ms ease-in-out",
      },
    },
  },
  plugins: [],
};
