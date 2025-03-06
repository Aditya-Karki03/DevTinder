import {
  BellDot,
  Contact,
  Handshake,
  LogOut,
  MessageCircle,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../context";
import { useState } from "react";
import ListOfFriends from "./ListOfFriends";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAllFriends, setShowAllFriends] = useState(false);
  const { logout, loggedInUser } = useAuth();
  const handleLogout = () => {
    setShowOptions(false);
    logout();
  };
  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
    //if we show options than we close the show friends options
    setShowAllFriends(false);
  };
  const handleShowAllFriends = () => {
    setShowAllFriends((prev) => !prev);
    //if we show options than we close the show  options
    setShowOptions(false);
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
          <MessageCircle className="w-5 h-5" onClick={handleShowAllFriends} />
        </button>
        <div className="relative ">{showAllFriends && <ListOfFriends />}</div>
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
                <li className="py-3 px-2  border border-white/20 hover:bg-gray-800 cursor-pointer space-x-4">
                  <Link
                    to={"/dashboard/connections"}
                    onClick={() => setShowOptions(false)}
                    className="flex space-x-4"
                  >
                    <Contact />
                    <span>Connections</span>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
