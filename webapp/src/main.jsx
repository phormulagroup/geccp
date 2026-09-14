import { createRoot } from "react-dom/client";
import AppRoutes from "./utils/routes.jsx";
import ContextProvider from "./utils/context.jsx";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <AppRoutes />
    </ContextProvider>
  </BrowserRouter>
);
