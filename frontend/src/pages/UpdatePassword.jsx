import React, { useState } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await api.updatePassword({ password });
      alert("Password updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating password", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-zinc-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-zinc-100">
          Update Password
        </h2>
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 
              text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 
              to-violet-500 text-white hover:opacity-90 transition-all font-medium"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
