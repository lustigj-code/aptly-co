/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aptly Brand Colors - Primary
        'navy': '#0A004A',
        'teal': '#21A8B0',
        'yellow': '#FFDE00',
        
        // Aptly Brand Colors - Secondary
        'light-navy': '#3B336E',
        'muted-teal': '#69BCC1',
        'light-teal': '#DEF2F2',
        
        // Aptly Brand Colors - Neutral
        'light-grey': '#E6E6E6',
        'grey': '#CCCCCC',
        'rich-black': '#333333',
        
        // Aptly Brand Colors - Tertiary (limited use)
        'brand-red': '#E84133',
        'brand-orange': '#EC6726',
      },
      fontFamily: {
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // 8px grid system
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
        '11': '88px',
        '12': '96px',
        '14': '112px',
        '16': '128px',
        '20': '160px',
        '24': '192px',
      },
      borderRadius: {
        'brand': '16px',
        'brand-sm': '8px',
        'brand-lg': '24px',
        'brand-xl': '32px',
      },
      maxWidth: {
        'container': '1280px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0A004A 0%, #3B336E 25%, #21A8B0 50%, #69BCC1 75%, #DEF2F2 100%)',
        'navy-gradient': 'linear-gradient(180deg, #0A004A 0%, #3B336E 100%)',
        'teal-gradient': 'linear-gradient(180deg, #21A8B0 0%, #69BCC1 100%)',
      },
      boxShadow: {
        'brand-sm': '0 2px 4px rgba(10, 0, 74, 0.1)',
        'brand': '0 4px 8px rgba(10, 0, 74, 0.15)',
        'brand-lg': '0 8px 16px rgba(10, 0, 74, 0.2)',
      },
    },
  },
  plugins: [],
}