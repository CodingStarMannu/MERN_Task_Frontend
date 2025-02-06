import React, { useEffect, useState } from "react";
import { getUserInfo } from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        console.log(data.data.user);
        setUser(data.data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  console.log(user);
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar/>

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
          <span className="text-gray-800">{user?.bio}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center space-x-6">
        {user.profile_pic ? (
          <img
            src={user.profile_pic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
          />
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">No Profile Picture</p>
            <Link to="/profile-picture">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all transform hover:-translate-y-0.5">
                Add Profile Picture
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link to="/add-bio">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:-translate-y-0.5">
            {user.bio ? "Edit Bio" : "Add Bio"}
          </button>
        </Link>
      </div>
    </div>
    </>

  );
};

export default UserInfo;



