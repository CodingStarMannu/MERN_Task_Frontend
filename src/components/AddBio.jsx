import React, { useState } from "react";
import { addBio } from "../api/api";
import { useNavigate } from "react-router-dom";

const AddBio = () => {
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bio.trim()) {
      setError("Bio cannot be empty");
      return;
    }
  
    try {
      setError("");
      const response = await addBio(bio);
      setMessage(response.data.message);
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update bio. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Add Bio</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write your bio here..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Update Bio
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-600 font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBio;