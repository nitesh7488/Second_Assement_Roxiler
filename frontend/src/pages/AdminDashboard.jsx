import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";
import { FaUsers, FaStore, FaStar, FaPlus } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });
  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.getAdminDashboard();
        setStats(data);
      } catch (error) {
        console.error("Error fetching admin dashboard", error);
      }
    };
    fetchStats();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.addUser(newUser);
      alert("User added successfully");
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await api.addStore(newStore);
      alert("Store added successfully");
    } catch (error) {
      console.error("Error adding store", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-zinc-100">
        Admin Dashboard
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-3xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-zinc-300">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-blue-500">
                {stats.totalUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg">
          <div className="flex items-center space-x-4">
            <FaStore className="text-3xl text-violet-500" />
            <div>
              <h3 className="text-lg font-semibold text-zinc-300">
                Total Stores
              </h3>
              <p className="text-3xl font-bold text-violet-500">
                {stats.totalStores}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg">
          <div className="flex items-center space-x-4">
            <FaStar className="text-3xl text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold text-zinc-300">
                Total Ratings
              </h3>
              <p className="text-3xl font-bold text-yellow-500">
                {stats.totalRatings}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/admin/users"
          className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg
            hover:bg-zinc-700/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-zinc-100">
                Manage Users
              </h3>
              <p className="text-zinc-400">View and manage all users</p>
            </div>
            <FaUsers className="text-2xl text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
        </Link>

        <Link
          to="/admin/stores"
          className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg
            hover:bg-zinc-700/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-zinc-100">
                Manage Stores
              </h3>
              <p className="text-zinc-400">View and manage all stores</p>
            </div>
            <FaStore className="text-2xl text-violet-500 group-hover:scale-110 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Add User Form */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-6 text-zinc-100 flex items-center gap-2">
          <FaPlus className="text-blue-500" /> Add New User
        </h3>
        <form onSubmit={handleAddUser} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={newUser.address}
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 
              to-violet-500 text-white hover:opacity-90 transition-all font-medium"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Add Store Form */}
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-zinc-100 flex items-center gap-2">
          <FaPlus className="text-violet-500" /> Add New Store
        </h3>
        <form onSubmit={handleAddStore} className="space-y-4">
          <input
            type="text"
            placeholder="Store Name"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="email"
            placeholder="Store Email"
            value={newStore.email}
            onChange={(e) =>
              setNewStore({ ...newStore, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="text"
            placeholder="Store Address"
            value={newStore.address}
            onChange={(e) =>
              setNewStore({ ...newStore, address: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="text"
            placeholder="Owner ID"
            value={newStore.ownerId}
            onChange={(e) =>
              setNewStore({ ...newStore, ownerId: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 
              to-purple-500 text-white hover:opacity-90 transition-all font-medium"
          >
            Add Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
