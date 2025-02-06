import React from "react";
import Navbar from "../components/Navbar";
import GetAllUsers from "../components/GetAllUsers";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome</h1>
        <GetAllUsers />
      </main>
    </div>
  );
};

export default HomePage;
