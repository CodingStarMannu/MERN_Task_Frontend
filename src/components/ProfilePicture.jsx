import React, { useState } from "react";
import { uploadProfilePicture } from "../api/api";


const ProfilePicture = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await uploadProfilePicture(formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Upload Profile Picture
          </h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="space-y-4">
              {preview && (
                <div className="w-32 h-32 mx-auto">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              )}
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              disabled={!image}
            >
              Upload Picture
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

export default ProfilePicture;
