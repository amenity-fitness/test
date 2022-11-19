const tailwindTypography = require('@tailwindcss/typography')

module.exports = {
  // darkMode: 'class',
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      animation: {
        dash: 'dash 1.4s ease-in-out infinite'
      },
      colors: {
        primary: "var(--bg-primary)",
        accent: "var(--bg-accent)",
        foreground: "var(--bg-foreground)",
        foremost: "var(--bg-foremost)"
      },
      keyframes: {
        dash: {
          '0%': { 'stroke-dasharray': '10, 20000', 'stroke-dashoffset': '0px' },
          '50%': { 'stroke-dasharray': '300, 20000', 'stroke-dashoffset': '-15px' },
          '100%': { 'stroke-dasharray': '300, 20000', 'stroke-dashoffset': '-300px' }
        }
      },
      textColor: {
        primary: "var(--text-primary)",
        link: "var(--text-link)"
      },
      fontFamily: {
        header: "'Open Sans', sans-serif"
      },
      fontWeight: {
        normal: "var(--normal-weight)"
      },
      invert: {
        icon: "var(--icon-filter)"
      }
    },
  },
  plugins: [
    tailwindTypography
  ],
}
