"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    // preview
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setUploadedUrl(data.url);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
        <div className="box shadow p-4 mt-3">
          <h1 className="text-primary">Next.js API route /api/upload that:</h1>    
          <h2 className="text-primary">
            <ul>
              <li>Accepts file uploads using multipart/form-data.</li>
              <li>Validates the file type (allow only images: jpg, png, gif).</li>
              <li>Saves the uploaded file to a local folder /public/uploads.</li>
              <li>Returns the file URL or an error message.</li>
            </ul>
          </h2>
           
          <div className="mb-3">
            <input className="form-control" type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="mb-3">
            {preview && (
              <div>
                <h3>Preview</h3>
                <img src={preview} width="250" />
              </div>
            )}
          </div>
          <div className="mb-3">
            <button className="btn btn-primary"  onClick={handleUpload}>Upload</button>
          </div>
          <div className="mb-3">
            {uploadedUrl && (
              <div>
                <h3>Uploaded Image</h3>
                <img src={uploadedUrl} width="250" />
                <p>{uploadedUrl}</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}