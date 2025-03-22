import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { FaStore, FaUserCircle, FaBars, FaHome } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="bg-dark-500 shadow-xl border-b border-dark-400 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <FaStore className="text-3xl text-primary-500 group-hover:text-primary-600 transition-colors" />
              <span className="text-2xl font-bold text-primary-500 group-hover:text-primary-600 transition-colors">
                Store Finder
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-dark-50 hover:text-primary-500 hover:bg-dark-400 transition-all"
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </Link>
              {role === "store_owner" && (
                <Link
                  to="/store-owner"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-dark-50 hover:text-primary-500 hover:bg-dark-400 transition-all"
                >
                  <FaStore className="text-lg" />
                  <span>My Store Dashboard</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-dark-50 hover:text-primary-500 hover:bg-dark-400 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-dark-300 hover:bg-dark-200 text-primary-500 hover:text-primary-600 transition-all border border-primary-500 hover:border-primary-600"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-dark-400 hover:bg-dark-300 transition-all text-dark-50 hover:text-primary-500">
                  <FaUserCircle className="text-xl" />
                  <FaBars />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-2xl p-2 border border-dark-400 text-black">
                    {role === "admin" && (
                      <>
                        <Menu.Item>
                          <Link
                            to="/admin/users"
                            className="block px-4 py-2 rounded-lg text-dark-50 hover:text-primary-500 hover:bg-dark-400 transition-all"
                          >
                            Manage Users
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to="/admin/stores"
                            className="block px-4 py-2 rounded-lg text-dark-50 hover:text-primary-500 hover:bg-dark-400 transition-all"
                          >
                            Manage Stores
                          </Link>
                        </Menu.Item>
                      </>
                    )}
                    {role === "store_owner" && (
                      <Menu.Item>
                        <Link
                          to="/store-owner"
                          className="block px-4 py-2 rounded-lg text-dark-50 hover:text-primary-500 hover:bg-dark-400 transition-all"
                        >
                          Store Dashboard
                        </Link>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <Link
                        to="/update-password"
                        className="block px-4 py-2 rounded-lg text-dark-50 hover:text-primary-500 hover:bg-dark-400 transition-all"
                      >
                        Update Password
                      </Link>
                    </Menu.Item>
                    <hr className="my-2 border-dark-300" />
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:text-red-400 hover:bg-dark-400 transition-all"
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
