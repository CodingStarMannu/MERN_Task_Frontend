import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserInfo from "./components/UserInfo";
import ProfilePicture from "./components/ProfilePicture";
import AddBio from "./components/AddBio";
import UploadVideo from "./components/UploadVideo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserInfo />} />
        <Route path="/profile-picture" element={<ProfilePicture />} />
        <Route path="/add-bio" element={<AddBio />} />
        <Route path="/upload-video" element={<UploadVideo />} />
      </Routes>
    </Router>
  );
};

export default App;
