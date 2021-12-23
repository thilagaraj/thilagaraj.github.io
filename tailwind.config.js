module.exports = {
  content:  [
      '*.html',
      './assets/js/main.js',
      "./src/*.css"
  ],
  theme: {
    extend: {
      inset: {
        '100': '100%',
      },
      colors: {
        'custom-light-blue': '#F2F8FA',
        'custom-dark-blue': '#0052CC',
        'custom-red': '#FF1F39',
        'custom-black': '#1F2D3E',
        'custom-dark-black': '#223046',
        'custom-light-red': '#FFE5E8',
        'custom-dark-red': '#EB001B'
      }
    },
    fontFamily: {
      'gilory-regular': ['Gilroy-Regular', 'sans-serif'],
      'gilory-bold': ['Gilroy-Bold', 'sans-serif'],
      'gilory-heavy': ['Gilroy-Heavy', 'sans-serif'],
      'gilory-light': ['Gilroy-Light', 'sans-serif'],
      'gilory-medium': ['Gilroy-Medium', 'sans-serif']
    } 
  },
  variants: {},
  plugins: [],
}
