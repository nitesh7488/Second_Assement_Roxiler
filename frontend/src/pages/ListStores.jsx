import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

const ListStores = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await api.getStores(filters);
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores", error);
      }
    };
    fetchStores();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-zinc-100">
        List of Stores
      </h2>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {stores.map((store) => (
                <tr
                  key={store.id}
                  className="hover:bg-zinc-700/50 transition-colors"
                >
                  <td className="px-6 py-4 text-zinc-100">{store.name}</td>
                  <td className="px-6 py-4 text-zinc-100">{store.email}</td>
                  <td className="px-6 py-4 text-zinc-100">{store.address}</td>
                  <td className="px-6 py-4">
                    <span className="text-yellow-500 font-medium">
                      {store.Ratings.length > 0
                        ? (
                            store.Ratings.reduce((acc, r) => acc + r.value, 0) /
                            store.Ratings.length
                          ).toFixed(1)
                        : "No Ratings"}
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

export default ListStores;
