module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Ensures Tailwind scans all relevant files
  theme: {
    extend: {
      colors: {
        pinkish: "#ff80b5",
        purpleAccent: "#9089fc",
        // darkGreen: "#006400",
        // lightGreen: "#ACE1AF"

      },
      backgroundImage: {
        "gradient-top": "linear-gradient(to top right, #ff80b5, #9089fc)", 
        "gradient-bottom": "linear-gradient(to top right, #ff80b5, #9089fc)", 
        // "gradient-top": "linear-gradient(to top right, #006400, #32CD32)",
        // "gradient-bottom": "linear-gradient(to top right, #006400, #32CD32)",
      },
    },
  },
  plugins: [],
};
