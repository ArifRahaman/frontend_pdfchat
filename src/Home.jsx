import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadPdf() {
  const [pdfFile, setPdfFile] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [editTitleId, setEditTitleId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPdfList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/user-pdfs/${userId}`
        );
        setUploadedPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfList();
  }, [userId]);

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("title", title);

    if (!userId) {
      setMessage("User not logged in");
      return;
    }

    formData.append("userId", userId);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/upload-pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setUploadedPdfs((prevPdfs) => [...prevPdfs, response.data.pdf]);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("PDF upload failed");
    }
  };

  const handleDeletePdf = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/delete-pdf/${id}`
      );
      setMessage(response.data.message);
      setUploadedPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("PDF deletion failed");
    }
  };

  const handleEditTitle = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/edit-pdf-title/${id}`,
        { title: editTitle }
      );
      setMessage(response.data.message);
      setUploadedPdfs((prevPdfs) =>
        prevPdfs.map((pdf) =>
          pdf._id === id ? { ...pdf, title: editTitle } : pdf
        )
      );
      setEditTitleId(null);
      setEditTitle("");
    } catch (error) {
      console.error("Edit title error:", error);
      setMessage("PDF title edit failed");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPdfs = uploadedPdfs.filter((pdf) =>
    pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-blue-300 to-violet-600 min-h-screen p-8 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: "Baloo Bhai 2, cursive" }}
        >
          Upload PDF
        </h1>
        <form onSubmit={handlePdfUpload}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              PDF:
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Upload PDF
          </button>
        </form>
        {message && <div className="mt-4 text-green-500">{message}</div>}
      </div>

      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-xl font-bold mb-4">Uploaded PDFs</h2>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search PDFs by title..."
            className="w-full max-w-lg px-3 py-2 border rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPdfs.map((pdf) => (
            <div key={pdf._id} className="bg-white p-4 rounded-md shadow-md">
              <div className="flex items-center justify-between mb-4">
                {editTitleId === pdf._id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md mr-4"
                  />
                ) : (
                  <div className="font-bold text-xl">{pdf.title}</div>
                )}
                <div className="flex space-x-2">
                  {editTitleId === pdf._id ? (
                    <button
                      onClick={() => handleEditTitle(pdf._id)}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditTitleId(pdf._id);
                        setEditTitle(pdf.title);
                      }}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletePdf(pdf._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <a
                href={`${import.meta.env.VITE_BACKEND_DOMAIN}/${pdf.pdfPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center block"
              >
                View PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadPdf;
