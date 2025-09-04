import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BookCall from "./pages/BookCall";
import "./index.css";
import { I18nProvider } from "./i18n/I18nProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/book" element={<BookCall />} />
        </Routes>
      </HashRouter>
    </I18nProvider>
  </React.StrictMode>,
);
