import {
  FaHome,
  FaPaperPlane,
  FaFileInvoice,
  FaReceipt,
  FaBell,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/forever13.jpg";

export default function Sidebar() {
  const [show, setShow] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-purple-700 text-white"
        : "text-gray-300 hover:text-purple-400 hover:bg-[#1f1f2e]"
    }`;

  return (
    <>
      {/* Hamburger Button (Mobile only) */}
      <div className="md:hidden p-4 bg-black shadow-md z-50 fixed top-0 left-0 w-full flex justify-between items-center">
        <button onClick={() => setShow((prev) => !prev)}>
          <FaBars className="text-white text-2xl" />
        </button>
      </div>

      {/* Sidebar Container */}
      <div
        className={`bg-[#0F0F1B] text-white w-[250px] min-h-screen fixed top-0 left-0 p-6 pt-8 transition-transform z-40 ${
          show ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-10">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full border border-purple-600" />
          <span className="text-2xl font-bold text-purple-400">Purple Vault</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4 text-md">
          <NavLink to="/dashboard" className={getNavLinkClass}>
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/send" className={getNavLinkClass}>
            <FaPaperPlane />
            <span>Send</span>
          </NavLink>
          <NavLink to="/receipts" className={getNavLinkClass}>
            <FaReceipt />
            <span>Receipts</span>
          </NavLink>
          <NavLink to="/transactions" className={getNavLinkClass}>
            <FaFileInvoice />
            <span>Transactions</span>
          </NavLink>
          <NavLink to="/subscription" className={getNavLinkClass}>
            <FaBell />
            <span>Subscription</span>
          </NavLink>

          {/* Logout (links to Logout.jsx) */}
          <NavLink to="/logout" className={getNavLinkClass}>
            <FaSignOutAlt />
            <span>Logout</span>
          </NavLink>
        </nav>
      </div>

      {/* Backdrop for mobile sidebar */}
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setShow(false)}
        />
      )}
    </>
  );
}