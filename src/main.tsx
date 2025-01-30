import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootElement: HTMLElement | null = document.getElementById("root");
if (!rootElement) throw new Error("App could not be instantiated, root element is missing.");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
