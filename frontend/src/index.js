import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Main from "./Main";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);