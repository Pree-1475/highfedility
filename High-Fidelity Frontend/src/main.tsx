import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App.tsx";
import { InquiryProvider } from "./contexts/InquiryContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CurrencyProvider>
      <InquiryProvider>
        <App />
      </InquiryProvider>
    </CurrencyProvider>
  </BrowserRouter>
);