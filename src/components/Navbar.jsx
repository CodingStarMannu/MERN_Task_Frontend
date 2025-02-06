import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        <div className="flex space-x-8">
          <Link to="/" className="text-lg font-semibold hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/upload-video" className="hover:text-blue-400 transition-colors">
            Upload Video
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/profile" className="hover:text-blue-400 transition-colors">
            Profile
          </Link>
          <Link to="/login" className="hover:text-blue-400 transition-colors">
            Login
          </Link>
          <Link to="/register" className="hover:text-blue-400 transition-colors">
            Register
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
