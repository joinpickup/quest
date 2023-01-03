module.exports = {
  content: [
    "./ACE/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
         DEFAULT: '#D3733C',
          '100': '#FEEADE',
          '200': '#FCC3A3',
          '300': '#F9A373',
          '400': '#E88954',
          '500': '#D3733C',
          '600': '#AB4A13',
          '700': '#933D0D',
          '800': '#772F06',
          '900': '#4F1C00'
        },
        green: {
          DEFAULT: '#5A6943',
          '100': '#DCE2D1',
          '200': '#C7D4B1',
          '300': '#ACBB93',
          '400': '#91A078',
          '500': '#6B7954',
          '600': '#5A6943',
          '700': '#46552F',
          '800': '#374620',
          '900': '#243110'
        },
        primary: "#84926E",
        onPrimary: "#FFFFFF",
        background: "#FFFFFF",
        backgroundAlt1: "#D3DCC6",
        backgroundAlt2: "#FFD5BD",
        backgroundAlt3: "#CEE3E8",
        backgroundAlt4: "#FFEBCA",
        onBackground: "#4F4F4F",
        secondary: "#EA7B3C",
        discord: "#7688d3"
      },
      boxShadow: {
        card: '-1px -1px 4px 0px rgba(0, 0, 0, 0.25), 1px 1px 4px 0px rgba(0, 0, 0, 0.25)',
        appbar: '1px -1px 15px 0px rgba(0, 0, 0, 0.25)'
      }

    },
  },
}
