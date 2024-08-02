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
    buttonColor: {
      50: "#89BAAB",
      100: "#39A55F",
      500: "#39A55F",
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
