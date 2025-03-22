import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.getUsers(filters);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-zinc-100">
        List of Users
      </h2>
      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Filter by Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="Filter by Email"
            value={filters.email}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="address"
            placeholder="Filter by Address"
            value={filters.address}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
        </div>
      </div>
      <div className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden border border-zinc-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead className="bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-700/50">
                  <td className="px-6 py-4 text-zinc-100">{user.name}</td>
                  <td className="px-6 py-4 text-zinc-100">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        user.role === "admin"
                          ? "bg-red-900/50 text-red-400"
                          : user.role === "store_owner"
                          ? "bg-blue-900/50 text-blue-400"
                          : "bg-green-900/50 text-green-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListUsers;
