import React, { useEffect } from "react";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loggedInUser, fetchingLoggedInUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetchingLoggedInUser();

    if (!isLoggedIn && !loggedInUser) {
      navigate("/");
    }
  }, [isLoggedIn, loggedInUser, navigate]);

  return children;
};
export default ProtectedRoutes;
