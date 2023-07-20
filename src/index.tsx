import React from "react";
import { createRoot } from "react-dom/client";
import { BookProvider } from "./contexts/BookContext";

import App from "./App";
import "./i18n";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <BookProvider>
        <App />
      </BookProvider>
    </React.Suspense>
  </React.StrictMode>
);
