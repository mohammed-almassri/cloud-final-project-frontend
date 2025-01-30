import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { makeServer } from "./mirageServer.ts";
import AuthProvider from "./context/AuthContext.tsx";
import App from "./App.tsx";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App></App>
    </AuthProvider>
  </StrictMode>
);
