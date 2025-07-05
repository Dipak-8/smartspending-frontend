import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
          <h2 className="text-2xl font-bold">Price Predictor</h2>
        </a>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "hover:text-gray-400"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/items"
              className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "hover:text-gray-400"}
            >
              Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "hover:text-gray-400"}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "hover:text-gray-400"}
            >
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
