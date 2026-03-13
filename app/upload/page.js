"use client";

import { useState } from "react";

export default function UploadPage() {
  const [files, setFiles] = useState([]); // store multiple files
  const [previews, setPreviews] = useState([]); // store previews
  const [uploadedUrls, setUploadedUrls] = useState([]);

  // handle file input change
  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // store file in files array
    const updatedFiles = [...files];
    updatedFiles[index] = selectedFile;
    setFiles(updatedFiles);

    // create preview
    const updatedPreviews = [...previews];
    updatedPreviews[index] = URL.createObjectURL(selectedFile);
    setPreviews(updatedPreviews);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      if (file) formData.append("file", file);
    });

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setUploadedUrls(data.files || [data.url]);
    } else {
      alert(data.error || "Upload failed");
    }
  };

  return (
    <div className="container">
      <div className="box shadow p-4 mt-3">     
        <h2 className="text-primary">Next.js API route /api/upload that:</h2>
        <h3 className="text-primary">
          <ul>
            <li>Accepts file uploads using multipart/form-data</li>
            <li>Validates the file type (allow only images: jpg, png, gif)</li>
            <li>Saves the uploaded file to a local folder /public/uploads</li>
            <li>Returns the file URL or an error message</li>

          </ul>
        </h3>
      </div>
      <div className="box shadow p-4 mt-3">       
        {[0, 1].map((index) => (
          <div className="mb-3" key={index}>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
            />
          </div>
        ))}

        <div className="mb-3">
          {previews.map(
            (preview, index) =>
              preview && (
                <div key={index}>
                  <h3>Preview {index + 1}</h3>
                  <img src={preview} width="250" />
                </div>
              )
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload
          </button>
        </div>

        <div className="mb-3">
          {uploadedUrls.map((url, index) => (
            <div key={index}>
              <h3>Uploaded Image {index + 1}</h3>
              <img src={url} width="250" />
              <p>{url}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}