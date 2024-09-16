import React, { useState, useEffect } from "react";
import axios from "axios";

const PostVideo = () => {
  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState(""); // New state for video name
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);

  // Handle video file selection
  const onFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Handle video name input
  const onNameChange = (e) => {
    setVideoName(e.target.value);
  };
  const onUpload = async () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("name", videoName); // Include video name in the form data
    console.log(videoName);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedVideoUrl(res.data.videoUrl);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all video URLs and names from the server
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Video Gallery
      </h1>

      {/* Upload Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <input
          type="file"
          onChange={onFileChange}
          accept="video/mp4"
          className="mb-4 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <input
          type="text"
          value={videoName}
          onChange={onNameChange}
          placeholder="Enter video name"
          className="mb-4 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
        />
        <button
          onClick={onUpload}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Upload Video
        </button>
      </div>

      {/* Uploaded Video Preview */}
      {uploadedVideoUrl && (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Uploaded Video:
          </h3>
          <video width="100%" controls className="rounded-lg">
            <source src={uploadedVideoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Video Gallery */}
      <h3 className="text-2xl font-semibold text-gray-700 mt-10 mb-4 text-center">
        All Videos:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-200 shadow-lg rounded-lg p-4 overflow-hidden"
          >
            {/* Display video name */}
            <h4 className="text-lg font-semibold text-red-600 mb-2">
              Name:{video.name} {/* This will display the video name */}
            </h4>

            <video width="100%" controls className="rounded-lg">
              <source src={video.videoUrl} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostVideo;
