import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStore() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/stores", { name, location });
      navigate("/stores");
    } catch (error) {
      console.error("Error adding store", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-zinc-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-zinc-100">
          Add Store
        </h2>
        <form onSubmit={handleAddStore} className="space-y-6">
          <input
            type="text"
            placeholder="Store Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 
              to-violet-500 text-white hover:opacity-90 transition-all font-medium"
          >
            Add Store
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStore;
