import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

const UserStores = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await api.getUserStores(filters);
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
      <h2 className="text-3xl font-bold mb-6">Available Stores</h2>
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Search by Address"
          value={filters.address}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <ul className="space-y-4">
        {stores.map((store) => (
          <li key={store.id} className="border p-4 rounded shadow-lg">
            {store.name} - {store.address}
            <p>Overall Rating: {store.averageRating || "No Ratings"}</p>
            <button
              onClick={() => submitRating(store.id, 5)}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Rate 5 ⭐
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const submitRating = async (storeId, value) => {
  try {
    await api.submitRating({ storeId, value });
    alert("Rating submitted!");
  } catch (error) {
    alert("Failed to submit rating");
  }
};

export default UserStores;
