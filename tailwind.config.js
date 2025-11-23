/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora-Regular", "sans-serif"],
        "sora-bold": ["Sora-Bold", "sans-serif"],
        "sora-extra-bold": ["Sora-ExtraBold", "sans-serif"],
        "sora-extra-light": ["Sora-ExtraLight", "sans-serif"],
        "sora-light": ["Sora-Light", "sans-serif"],
        "sora-medium": ["Sora-Medium", "sans-serif"],
        "sora-regular": ["Sora-Regular", "sans-serif"],
        "sora-semi-bold": ["Sora-SemiBold", "sans-serif"],
        "sora-thin": ["Sora-Thin", "sans-serif"],
      },
      colors: {
        primary: "#C67C4E",
        secondary: "#EDD6C8",
        dark: "#313131",
        grey: "#E3e3e3",
        light: "#F9F2ED",
      },
    },
  },
  plugins: [],
};
