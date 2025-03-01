import { BellDot, Handshake, LogOut, User } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { useState } from "react";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { logout, loggedInUser } = useAuth();
  const handleLogout = () => {
    setShowOptions(false);
    logout();
  };
  const handleShowOptions = () => {
    console.log(showOptions);
    setShowOptions((prev) => !prev);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to={"/dashboard"} className="btn btn-ghost text-xl">
          DevAmor
        </Link>
      </div>
      <div className="navbar-end space-x-2">
        <button className="btn btn-ghost btn-circle">
          <BellDot className="w-5 h-5" />
        </button>
        <div className=" relative">
          <div tabIndex={0} role="button" className="btn m-1 ">
            <User className="w-5 h-5" onClick={handleShowOptions} />
          </div>
          {showOptions && (
            <div className="absolute z-50 bg-gray-700 top-14 -right-1 cursor-pointer rounded-md">
              <ul>
                <li className="border border-white/20 rounded-lg hover:bg-gray-800">
                  <Link
                    to={"/dashboard/profile"}
                    onClick={() => setShowOptions(false)}
                    className="w-2xs h-20  flex  space-x-4 items-center px-2 "
                  >
                    <img
                      src={loggedInUser?.photoUrl}
                      alt="Profile Photo"
                      className="w-12 h-12 rounded-full object-fill"
                    />
                    <span className="font-bold text-gray-200">
                      {loggedInUser?.firstName} {loggedInUser?.lastName}
                    </span>
                  </Link>
                </li>
                <li className="py-3 px-2  border border-white/20 hover:bg-gray-800 cursor-pointer space-x-4">
                  <Link
                    to={"/dashboard/requests"}
                    onClick={() => setShowOptions(false)}
                    className="flex space-x-4"
                  >
                    <Handshake /> <span>Incoming Requests</span>
                  </Link>
                </li>
                <li className="py-3 px-2  border border-white/20 hover:bg-gray-800 cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="flex w-full h-full space-x-4 cursor-pointer"
                  >
                    <LogOut /> <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow right-24"
          >
            <li
              onClick={() => navigate("/dashboard/profile")}
              className="bg-gray-700 rounded-lg"
            >
              <div className="w-2xs h-20  shadow-2xl  flex items-center ">
                <User />
                <span className="font-bold text-gray-200">
                  {loggedInUser?.firstName} {loggedInUser?.lastName}
                </span>
              </div>
            </li>
            <li className="w-full">
              <button className="w-2xs" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
