/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
	content: [
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
	],
	prefix: "",
	theme: {
	  container: {
			  center: true,	
			  padding: '0'
	  },
	  screens: {
		  sm: "640px",
		  md: "768px",
		  lg: "960px",
		  xl: "1200px",
	  },
    fontFamily:{
      primary: "var(--font-poppins)",
      title: "['Poppins', 'sans-serif']",
      },
    extend: {

      colors: {
        primary: '#CACFD3',
        accent: {
          DEFAULT: '#003BFF',
          hover: '#003BFF',
        }
      },

    },
  },
  plugins: [],
}

