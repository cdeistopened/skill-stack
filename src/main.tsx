import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { FontProvider } from "./context/FontContext";
import "./styles/global.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
console.log("Convex URL:", convexUrl ? "configured" : "MISSING");

if (!convexUrl) {
  throw new Error(
    "VITE_CONVEX_URL environment variable is not set. " +
    "For local dev: run 'npx convex dev' and check .env.local. " +
    "For production: set VITE_CONVEX_URL in your hosting provider's environment variables."
  );
}

const convex = new ConvexReactClient(convexUrl);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <ThemeProvider>
          <FontProvider>
            <App />
          </FontProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ConvexProvider>
  </React.StrictMode>
);

