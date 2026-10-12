import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// createRoot finds the <div id="root"> in public/index.html and renders React there
const root = ReactDOM.createRoot(document.getElementById("root"));

// StrictMode helps catch mistakes (it runs effects twice in development only)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
