module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontSize: {
            'main-head': ['256px', { lineHeight: '1' }], // Default large size
            'main-head-xs': ['80px', { lineHeight: '1' }], // Smaller screens
            'main-head-sm': ['120px', { lineHeight: '1' }], // Smaller screens
            'main-head-md': ['180px', { lineHeight: '1' }], // Medium screens
            },
        fontFamily: {
            'raleway': ['Raleway', 'sans-serif']
        },
        textShadow: {
            '3d': '1px 1px 0 #ff0000, 2px 2px 0 #e50000, 3px 3px 0 #cc0000, 4px 4px 0 #b20000, 5px 5px 0 #990000, 6px 6px 0 #7f0000'
          }
      },
    },
    plugins: [
        require('tailwindcss-textshadow')
    ],
  }