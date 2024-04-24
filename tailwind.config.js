module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mytheme: {
          "primary": "#0075ff",
          
          "secondary": "#00c2ff",
                   
          "accent": "#003eff",
                   
          "neutral": "#060b04",
                   
          "base-100": "#292929",
                   
          "info": "#00feff",
                   
          "success": "#88bc00",
                   
          "warning": "#ed8800",
                   
          "error": "#ff658",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};