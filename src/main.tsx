import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import '@fontsource/nunito';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nunito from "/fonts/Nunito-VariableFont_wght.ttf"

const muiTheme = createTheme({
  typography: {
    fontFamily: 'Nunito'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nunito';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Nunito'), local('Nunito-Regular'), url(${Nunito}) format('tff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `
    }
  }
});

const chakraTheme = extendTheme ({
  colors: {
    "green": {
      "50": "#F0F5F2",
      "100": "#D4E3DA",
      "200": "#B8D1C2",
      "300": "#9CBFAA",
      "400": "#80AD92",
      "500": "#649B7A",
      "600": "#507C62",
      "700": "#3C5D49",
      "800": "#283E31",
      "900": "#141F18"
    },
    "pink": {
      "50": "#F4F0F2",
      "100": "#E1D5DA",
      "200": "#CFBAC2",
      "300": "#BC9FAA",
      "400": "#A98492",
      "500": "#96697B",
      "600": "#785462",
      "700": "#5A3F4A",
      "800": "#3C2A31",
      "900": "#1E1519"
    },
    "teal": {
      "50": "#F2F3F3",
      "100": "#D9DDDD",
      "200": "#C1C7C7",
      "300": "#A9B2B2",
      "400": "#919C9C",
      "500": "#798686",
      "600": "#616B6B",
      "700": "#495050",
      "800": "#303636",
      "900": "#181B1B"
    },
    "orange": {
      "50": "#F7F2ED",
      "100": "#E9D9CD",
      "200": "#DBC1AE",
      "300": "#CDA98E",
      "400": "#BF916E",
      "500": "#B1784E",
      "600": "#8E603E",
      "700": "#6A482F",
      "800": "#47301F",
      "900": "#231810"
    }
  },
  fonts: {
    heading: `'Nunito', sans-serif`,
    body: `'Nunito', sans-serif`,
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider theme={muiTheme}>
      <ChakraProvider theme={chakraTheme}>
        <App />
      </ChakraProvider>
    </ThemeProvider>
);
