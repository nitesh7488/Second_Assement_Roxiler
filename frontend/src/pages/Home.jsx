import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { FaStar } from "react-icons/fa";
import AdminDashboard from "./AdminDashboard";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto p-4">
        {role === "admin" && <AdminDashboard />}

        {role === "user" && (
          <>
            <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-pink-600">
              Welcome to Store Finder
            </h1>
            <div className="mb-8 flex gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                name="name"
                placeholder="Search by Name"
                value={filters.name}
                onChange={handleFilterChange}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <input
                type="text"
                name="address"
                placeholder="Search by Address"
                value={filters.address}
                onChange={handleFilterChange}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="bg-zinc-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 
                    transition-all p-6 border border-zinc-700/50 group"
                >
                  <Link
                    to={`/store/${store.id}`}
                    className="text-xl font-semibold text-zinc-100 hover:text-blue-400 transition-colors block"
                  >
                    {store.name}
                  </Link>
                  <p className="text-zinc-400 mt-2 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {store.address}
                  </p>

                  <div className="flex items-center justify-between mt-4 p-3 bg-zinc-700/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`${
                              star <=
                              (store.Ratings.length > 0
                                ? store.Ratings.reduce(
                                    (acc, r) => acc + r.value,
                                    0
                                  ) / store.Ratings.length
                                : 0)
                                ? "opacity-100"
                                : "opacity-30"
                            } transform group-hover:scale-110 transition-transform`}
                          />
                        ))}
                      </div>
                      <span className="text-zinc-300 font-medium">
                        {store.Ratings.length > 0
                          ? (
                              store.Ratings.reduce(
                                (acc, r) => acc + r.value,
                                0
                              ) / store.Ratings.length
                            ).toFixed(1)
                          : "No Ratings"}
                      </span>
                    </div>
                    <span className="text-zinc-400 text-sm">
                      {store.Ratings.length}{" "}
                      {store.Ratings.length === 1 ? "review" : "reviews"}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/store/${store.id}`)}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white 
                      py-2.5 px-4 rounded-lg hover:opacity-90 transition-all font-medium 
                      transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 
                      focus:ring-offset-2 focus:ring-offset-zinc-800"
                  >
                    Rate This Store
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {role === "store_owner" && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-400">
              Your Store Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {stores
                .filter((store) => store.ownerId === userId)
                .map((store) => (
                  <div
                    key={store.id}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <Link
                      to={`/store/${store.id}`}
                      className="text-xl font-semibold text-gray-800 hover:text-primary-600"
                    >
                      {store.name}
                    </Link>
                    <p className="text-gray-600 mt-2">{store.address}</p>
                    <div className="flex items-center mt-4">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`${
                              star <=
                              (store.Ratings.length > 0
                                ? store.Ratings.reduce(
                                    (acc, r) => acc + r.value,
                                    0
                                  ) / store.Ratings.length
                                : 0)
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        {store.Ratings.length > 0
                          ? (
                              store.Ratings.reduce(
                                (acc, r) => acc + r.value,
                                0
                              ) / store.Ratings.length
                            ).toFixed(1)
                          : "No Ratings"}
                      </span>
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

export default Home;
