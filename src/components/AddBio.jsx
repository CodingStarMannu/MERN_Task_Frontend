import React, { useState } from "react";
import { addBio } from "../api/api";
import Navbar from "./Navbar";


const AddBio = () => {
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addBio({ bio });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error || "Failed to update bio");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Bio</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write your bio here..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Update Bio
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBio;
