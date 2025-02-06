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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">All Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl text-gray-500">
                        {user.firstName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {user.firstName}
                  </h3>
                </div>
                <div className="space-y-4">
                  {user.videos.map((video, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium text-gray-700">{video.title}</h4>
                      <video
                        src={video.videoUrl}
                        controls
                        className="w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetAllUsers;
