import { NavLink } from "react-router-dom";
import { useState } from "react";
import { HiMenu } from "react-icons/hi"; // optional hamburger icon

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden flex items-start justify-between bg-gray-800 p-4">
        {/* <h2 className="text-xl font-bold text-yellow-400">Task Manager</h2> */}
        <button
          onClick={() => setOpen(!open)}
          className="text-yellow-400 text-2xl focus:outline-none"
        >
          <HiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-gray-800 p-6 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <h2 className="text-xl font-bold mb-8 text-yellow-400 hidden md:block">
          Task Manager
        </h2>

        <nav className="space-y-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
              }`
            }
          >
            Contacts
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
              }`
            }
          >
            Tasks
          </NavLink>
        </nav>
      </div>

      {/* Overlay for mobile when sidebar open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
