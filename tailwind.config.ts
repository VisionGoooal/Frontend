module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Ensures Tailwind scans all relevant files
  theme: {
    extend: {
      colors: {
        pinkish: "#ff80b5",
        purpleAccent: "#9089fc",
      },
      backgroundImage: {
        "gradient-top": "linear-gradient(to top right, #ff80b5, #9089fc)",
        "gradient-bottom": "linear-gradient(to top right, #ff80b5, #9089fc)",
      },
    },
  },
  plugins: [],
};
