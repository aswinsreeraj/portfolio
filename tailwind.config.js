/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact reference colors from design_reference.html
        go: {
          cyan: '#00ADD8',
          'cyan-dark': '#00708C',
          'cyan-text': '#00536A',
          'cyan-hover': '#004F63',
          'cyan-tint': '#E1F6FB',
          'cyan-bg': '#F3FAFD',
          yellow: '#FDDD00',
          dark: '#101820',
          'dark-alt': '#0E1F27',
          'dark-surface': '#0A171D',
          'dark-border': '#1E3A47',
          'text-muted': '#3C4C57',
          'text-caption': '#4A5B66',
          'text-dark-muted': '#8DB1BE',
          'text-dark-body': '#B9D3DC',
          border: '#D6E7EE',
          'border-card': '#C9DCE4',
          'border-pill': '#BFD8E1',
          'border-light': '#E3EBEF',
          'bg-section': '#F5F8FA'
        }
      },
      fontFamily: {
        sans: ["'Inter'", 'system-ui', '-apple-system', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      boxShadow: {
        'yellow-solid': '3px 3px 0 #101820',
        'yellow-solid-dark': '3px 3px 0 #00ADD8',
        'cyan-solid-8': '8px 8px 0 #00ADD8',
        'cyan-solid-6': '6px 6px 0 #00ADD8',
      }
    },
  },
  plugins: [],
}
