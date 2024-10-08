/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This ensures Tailwind scans all files for utility classes
  ],
  theme: {
    extend: {
      colors: {
       
        'custom-red': '#d1a796', // Your custom hover color
      },
    },
  },
  plugins: [],
};
