import React, { useEffect, useState } from "react";
import { getUserInfo, uploadProfilePicture, getUserVideos } from "../api/api";
import { Link } from "react-router-dom";
import { FiUpload, FiEdit2 } from "react-icons/fi";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]); // State for user videos

  const fetchUserInfo = async () => {
    try {
      setLoading(true); // Start loading
      const { data } = await getUserInfo();
      setUser(data.user); // Save user data
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid token. Please log in again.");
      } else {
        setError("Failed to fetch user information.");
      }
      console.error("Error fetching user info:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchUserVideos = async () => {
    try {
      const { data } = await getUserVideos();
      setVideos(data.videos); // Save videos data
    } catch (err) {
      console.error("Error fetching user videos:", err);
      setVideos([]); // Set empty videos on error
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserVideos();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await uploadProfilePicture(formData);
      fetchUserInfo(); // Refresh user info after upload
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Information</h2>
      <div className="grid gap-6">
        <div className="flex items-center">
          <span className="font-semibold text-gray-600 w-32">First Name:</span>
          <span className="text-gray-800">{user.firstName}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-600 w-32">Last Name:</span>
          <span className="text-gray-800">{user.lastName}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-600 w-32">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-600 w-32">Phone:</span>
          <span className="text-gray-800">{user.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-600 w-32">Bio:</span>
          <span className="text-gray-800 flex items-center">
            {user?.bio || "No bio available"}
            <Link to="/add-bio" className="ml-2">
              <FiEdit2 className="text-gray-500 hover:text-gray-700 cursor-pointer" size={20} />
            </Link>
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-center space-x-6">
        {user.profile_pic ? (
          <div className="relative">
            <img
              src={user.profile_pic}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <label
              htmlFor="file-upload"
              className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-800"
            >
              <FiUpload className="text-white" size={20} />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">No Profile Picture</p>
            <label
              htmlFor="file-upload"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Add Profile Picture
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Uploaded Videos</h3>
        {videos.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="bg-gray-100 p-4 rounded-lg shadow">
                <video controls className="w-full h-48 rounded-lg">
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
                <p className="mt-2 text-gray-800 font-semibold">{video.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
