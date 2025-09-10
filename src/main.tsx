import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BookCall from "./pages/BookCall";
import Discover from "./pages/Discover";
import Design from "./pages/Design";
import Develop from "./pages/Develop";
import Grow from "./pages/Grow";
import BrandBuilding from "./pages/BrandBuilding";
import WebDevelopment from "./pages/WebDevelopment";
import GrowthStrategy from "./pages/GrowthStrategy";
import "./index.css";
import { I18nProvider } from "./i18n/I18nProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/book" element={<BookCall />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/design" element={<Design />} />
          <Route path="/develop" element={<Develop />} />
          <Route path="/grow" element={<Grow />} />
          <Route path="/services/brand" element={<BrandBuilding />} />
          <Route path="/services/web" element={<WebDevelopment />} />
          <Route path="/services/growth" element={<GrowthStrategy />} />
        </Routes>
      </HashRouter>
    </I18nProvider>
  </React.StrictMode>,
);
