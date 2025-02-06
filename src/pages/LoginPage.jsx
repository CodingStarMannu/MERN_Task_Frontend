import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-md mx-auto py-12 px-4">
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;
