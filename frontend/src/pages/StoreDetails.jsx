import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import { FaStar } from "react-icons/fa";

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [rating, setRating] = useState(0);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const { data } = await api.getStoreDetails(id);
        setStore(data);
      } catch (error) {
        console.error("Error fetching store details:", error);
      }
    };
    fetchStore();
  }, [id]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitRating({ storeId: id, value: rating });
      // Refresh store data after rating
      const { data } = await api.getStoreDetails(id);
      setStore(data);
      setRating(0);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-zinc-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-zinc-700">
        <h2 className="text-3xl font-bold mb-4 text-zinc-100">{store.name}</h2>
        <p className="text-xl mb-6 text-zinc-400">{store.address}</p>

        <div className="mb-8 p-4 bg-zinc-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`${
                    star <=
                    (store.Ratings.length > 0
                      ? store.Ratings.reduce((acc, r) => acc + r.value, 0) /
                        store.Ratings.length
                      : 0)
                      ? "opacity-100"
                      : "opacity-30"
                  }`}
                />
              ))}
            </div>
            <span className="text-zinc-200">
              {store.Ratings.length > 0
                ? (
                    store.Ratings.reduce((acc, r) => acc + r.value, 0) /
                    store.Ratings.length
                  ).toFixed(1)
                : "No Ratings"}
            </span>
            <span className="text-zinc-400">
              ({store.Ratings.length}{" "}
              {store.Ratings.length === 1 ? "rating" : "ratings"})
            </span>
          </div>
        </div>

        {userRole === "user" && (
          <form onSubmit={handleRatingSubmit} className="space-y-6">
            <div>
              <label className="block text-zinc-300 mb-2">Your Rating:</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-2xl text-yellow-400">{rating} ⭐</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 
                to-violet-500 text-white hover:opacity-90 transition-all font-medium"
            >
              Submit Rating
            </button>
          </form>
        )}

        {userRole === "store_owner" && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-zinc-200">
              Recent Ratings
            </h3>
            <div className="space-y-3">
              {store.Ratings.map((rating) => (
                <div
                  key={rating.id}
                  className="p-3 bg-zinc-700/30 rounded-lg flex justify-between items-center"
                >
                  <span className="text-zinc-300">Rating:</span>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={
                          star <= rating.value ? "opacity-100" : "opacity-30"
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetails;
