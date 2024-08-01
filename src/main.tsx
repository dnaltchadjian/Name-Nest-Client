import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const muiTheme = createTheme({});

const chakraTheme = extendTheme ({
  colors: {
    buttonColor: {
      50: "#89BAAB",
      100: "#558E69",
      500: "#558E69",
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider theme={muiTheme}>
      <ChakraProvider theme={chakraTheme}>
        <App />
      </ChakraProvider>
    </ThemeProvider>
);
