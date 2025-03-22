import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

const StoreOwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [storeCount, setStoreCount] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data } = await api.getStoreRatings();
        setRatings(data);
      } catch (error) {
        console.error("Error fetching ratings", error);
      }
    };

    const fetchAvgRating = async () => {
      try {
        const { data } = await api.getStoreAvgRating();
        setAvgRating(data.averageRating);
      } catch (error) {
        console.error("Error fetching average rating", error);
      }
    };

    const fetchStoreCount = async () => {
      try {
        const { data } = await api.getUserStores({});
        setStoreCount(data.length);
      } catch (error) {
        console.error("Error fetching store count", error);
      }
    };

    fetchRatings();
    fetchAvgRating();
    fetchStoreCount();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-zinc-100">
        Store Owner Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg">
          <h3 className="text-xl font-bold text-zinc-100">Total Stores</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">{storeCount}</p>
        </div>
        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg">
          <h3 className="text-xl font-bold text-zinc-100">Average Rating</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {avgRating.toFixed(1)}
          </p>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-6 text-zinc-100">Ratings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratings.map((rating) => (
          <div
            key={rating.id}
            className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg"
          >
            <div className="flex justify-between items-center">
              <p className="text-zinc-100 font-semibold">{rating.User.name}</p>
              <span className="text-2xl text-yellow-500">
                {rating.value} ⭐
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
