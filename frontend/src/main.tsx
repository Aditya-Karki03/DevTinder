import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Feed from "./pages/feed/Feed.tsx";
import Profile from "./pages/profile/Profile.tsx";
import Lovers from "./pages/connection-Request/Lovers.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import AuthProvider from "./context/index.tsx";
import ErrorComponent from "./components/ErrorComponent.tsx";
import Register from "./pages/Register/Register.tsx";
import Connection from "./pages/connections/Connection.tsx";
import FramerMotion from "./components/FramerMotion.tsx";
import { Toaster } from "react-hot-toast";

// import Protection from "./components/Protection.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster
            toastOptions={{
              style: {
                backgroundColor: "#D6D6D6",
                color: "black",
              },
            }}
          />
          <Routes>
            <Route>
              <Route index element={<Login />} />
            </Route>
            <Route>
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Feed />} />
                <Route path="profile" element={<Profile />} />
                <Route path="requests" element={<Lovers />} />
                <Route path="connections" element={<Connection />} />
                <Route path="framer-motion" element={<FramerMotion />} />
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
