import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/tailwind.css";
import "./styles/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Optionally, report web vitals
reportWebVitals();
