import React, { useEffect, useState } from "react";
import { getAllUsersWithContent } from "../api/api";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsersWithContent();
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-blue-200"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Community Members
        </h2>

        {/* User Rows */}
        <div className="space-y-10">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              {/* User Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative group">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.firstName}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-gray-100 group-hover:ring-blue-100 transition-all"
                    />
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-4 ring-gray-100 group-hover:ring-blue-100">
                      <span className="text-2xl font-bold text-white">
                        {user.firstName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {user.videos.length} {user.videos.length === 1 ? "video" : "videos"}
                  </p>
                </div>
              </div>

              {/* Videos Section */}
              {user.videos.length > 0 ? (
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {user.videos.map((video, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow w-64 flex-shrink-0"
                    >
                      <h4 className="font-medium text-gray-700 mb-2 line-clamp-1">
                        {video.title}
                      </h4>
                      <video
                        src={video.videoUrl}
                        controls
                        className="w-full rounded-lg"
                        preload="none"
                        poster="/api/placeholder/400/225"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No videos available</p>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllUsers;
