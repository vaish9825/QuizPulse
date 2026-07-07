import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import AppQueryProvider from "./app/providers/QueryProvider.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppQueryProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    <App />
  </AppQueryProvider>
  </React.StrictMode>
);