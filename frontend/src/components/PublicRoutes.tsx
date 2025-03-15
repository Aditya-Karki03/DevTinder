import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, loggedInUser, navigate]);

  return children;
};
export default PublicRoutes;
