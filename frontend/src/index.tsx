import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MetaMaskInpageProvider } from "@metamask/providers";
import ScrollToTop from "./utils/scrollTop";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
