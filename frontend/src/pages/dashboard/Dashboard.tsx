import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Dashboard;
