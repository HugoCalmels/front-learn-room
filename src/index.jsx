import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import 'normalize.css';
import 'flexboxgrid';

import { GlobalStyles, Typography } from './assets/styles';
import theme from './assets/styles/theme';
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Typography />
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
