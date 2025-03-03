import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

//Delete this file as it is duplicate 
 //dashboard file
const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Dashboard;
