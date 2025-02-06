import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserInfo from "./components/UserInfo";
import ProfilePicture from "./components/ProfilePicture";
import AddBio from "./components/AddBio";
import UploadVideo from "./components/UploadVideo";
import Navbar from "./components/Navbar";

// Helper function for authentication
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route Component
const ProtectedRoute = ({ element: Element }) => {
  return isAuthenticated() ? <Element /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute element={UserInfo} />} />
        <Route path="/profile-picture" element={<ProtectedRoute element={ProfilePicture} />} />
        <Route path="/add-bio" element={<ProtectedRoute element={AddBio} />} />
        <Route path="/upload-video" element={<ProtectedRoute element={UploadVideo} />} />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
