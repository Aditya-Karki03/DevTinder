import React, { useEffect } from "react";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loggedInUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loggedInUser, navigate]);

  return children;
};
export default ProtectedRoutes;
