import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Loginpage.jsx";
import Signup from "./pages/SignupPage.jsx";
import StoreList from "./pages/Storelist.jsx";
import StoreDetails from "./pages/StoreDetails.jsx";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard.jsx";
import Dashboard from "./pages/Dasbord.jsx";
import UserStores from "./pages/UserStores.jsx";
import ListUsers from "./pages/ListUsers.jsx";
import ListStores from "./pages/ListStores.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import StoreDetails from "./pages/StoreDetails.jsx";
import { ProtectedRoute } from "./utils/auth.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-900 text-zinc-100">
        <Navbar />
        <div className="container mx-auto p-4 bg-zinc-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="admin">
                  <ListUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/stores"
              element={
                <ProtectedRoute role="admin">
                  <ListStores />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store-owner"
              element={
                <ProtectedRoute role="store_owner">
                  <StoreOwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/stores"
              element={
                <ProtectedRoute role="user">
                  <UserStores />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store/:id"
              element={
                <ProtectedRoute role="user">
                  <StoreDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
