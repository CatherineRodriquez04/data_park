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
    		center: 'true',
    		padding: '0'
    	},
    	screens: {
    		sm: '640px',
    		md: '768px',
    		lg: '960px',
    		xl: '1200px'
    	},
    	fontFamily: {
    		primary: 'var(--font-poppins)',
    		title: ['Poppins', 'sans-serif']
    	},
    	extend: {
  
        colors: {
          primary: '#DCE4E5',
          accent: {
          DEFAULT: '#0034D1',
          hover: '#0034D1',
          }
        },
      
        
        },
      },
      plugins: [],
      }

