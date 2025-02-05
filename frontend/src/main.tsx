import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Feed from "./components/Feed.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Login />} />
        </Route>
        <Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Feed />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
