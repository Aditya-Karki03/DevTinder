import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Dashboard from "../src/pages/dashboard/Dashboard.tsx";
import Feed from "./components/Feed.tsx";
import Profile from "./components/Profile.tsx";
import Lovers from "./components/Lovers.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Login />} />
          </Route>
          <Route>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="lovers" element={<Lovers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
