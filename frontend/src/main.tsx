import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Dashboard from "../src/pages/dashboard/Dashboard.tsx";
import Feed from "./components/Feed.tsx";
import Profile from "./pages/profile/Profile.tsx";
import Lovers from "./components/Lovers.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import AuthProvider from "./context/index.tsx";
import ErrorComponent from "./components/ErrorComponent.tsx";

import Register from "./pages/Register/Register.tsx";
// import Protection from "./components/Protection.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
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
              <Route path="register" element={<Register />} /> 
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
