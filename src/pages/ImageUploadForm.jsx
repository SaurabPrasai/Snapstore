import React, { useEffect, useState } from "react";
import { storage } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [imageStatus, setImageStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      uploadImage(image);
    }
  }, [image]);

  const uploadImage = async (image) => {
    setLoading(true);
    setUrl(null);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    data.append("folder", "room-images");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dnjzxugbz/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const json = await res.json();
      setUrl(() => json.secure_url);
      setLoading(false);
    } catch (error) {
      console.log("Error while uploading: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setUploadStatus("Please select an image to upload");
      return;
    }
    if (!imageStatus.trim()) {
      setUploadStatus("Please enter an image status");
      return;
    }
    await addDoc(collection(storage, "status"), {
      src: url,
      title: imageStatus,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg transform transition-all hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Upload Your Image
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-all duration-300 ease-in-out bg-gray-50">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {url ? (
                  <div className="mb-4 w-full">
                    <img
                      src={url}
                      alt="Preview"
                      className="max-h-48 w-full object-contain rounded-md shadow-sm"
                    />
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="block text-sm">
                      Click to select or drag an image here
                    </span>
                  </div>
                )}
              </label>
              {image && (
                <div className="mt-2 text-sm text-gray-600 text-center">
                  {image.name} ({Math.round(image.size / 1024)} KB)
                </div>
              )}
            </div>
          </div>

          {/* Image Location Field */}
          <div className="mb-4">
            <label
              htmlFor="image-location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image Status
            </label>
            <input
              type="text"
              id="image-location"
              value={imageStatus}
              onChange={(e) => setImageStatus(e.target.value)}
              placeholder="status..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload to Firebase"
            )}
          </button>

          {/* Status Message */}
          {uploadStatus && (
            <div
              className={`mt-4 p-3 rounded-md text-sm font-medium transition-all duration-300 ${
                uploadStatus.includes("success")
                  ? "bg-green-100 text-green-800"
                  : uploadStatus === "Uploading..."
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {uploadStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ImageUploadForm;