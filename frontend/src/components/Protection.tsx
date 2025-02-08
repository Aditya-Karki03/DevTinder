import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const Protection = () => {
  const isLoggedIn = useSelector((store: RootState) => store?.auth?.isLoggedIn);
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
};
export default Protection;
