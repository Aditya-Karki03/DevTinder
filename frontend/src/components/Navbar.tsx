import { BellDot, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { logoutRequest } from "../pages/auth/slice";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((store: RootState) => store?.auth?.error);
  const userName = useSelector((store: RootState) => store?.auth?.user);
  const handleLogout = () => {
    if (error) {
      navigate("/");
    }
    dispatch(logoutRequest());
  };
  console.log(userName);
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
          DevTinder
        </Link>
      </div>
      <div className="navbar-end space-x-2">
        <button className="btn btn-ghost btn-circle">
          <BellDot className="w-5 h-5" />
        </button>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            <User className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow right-24"
          >
            <li className="bg-gray-700 rounded-lg">
              <div className="w-2xs h-20  shadow-2xl  flex items-center ">
                <User />
                <span className="font-bold text-gray-200">
                  {userName?.firstName} {userName?.lastName}
                </span>
              </div>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
