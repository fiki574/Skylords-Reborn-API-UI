import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as ServiceWorker from "./ServiceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

ServiceWorker.unregister();
