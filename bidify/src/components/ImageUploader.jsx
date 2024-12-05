import React, { useState } from "react";

const ImageUploader = ({ onImageUploaded }) => {
  const [imageFiles, setImageFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  const uploadImage = async () => {
    if (!imageFiles || imageFiles.length === 0) {
      alert("Please select an image file first!");
      return;
    }

    setUploading(true);

    const uploadedUrls = [];

    for (let file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      try {
        console.log("uploading image");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dihplbjah/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorDetails = await response.text();
          console.error("Upload failed. Response:", errorDetails);
          throw new Error("Image upload failed!");
        }

        const data = await response.json();
        uploadedUrls.push(data.secure_url);
        console.log("uploading image data", data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls]);

    if (onImageUploaded) {
      onImageUploaded([...imageUrls, ...uploadedUrls]);
    }

    setUploading(false);
    setImageFiles([]);
  };

  const handleDeleteImage = (url) => {
    const updatedUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(updatedUrls);

    if (onImageUploaded) {
      onImageUploaded(updatedUrls);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
      />
      <button className="btn ml-8 w-36" onClick={uploadImage} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {imageUrls.length > 0 && (
        <div>
          <p>Image Uploaded!</p>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                View Image {index + 1}
              </a>
              <button
                                onClick={() => handleDeleteImage(url)}
                                style={{
                                    border: "none",
                                    backgroundColor: "transparent",
                                    color: "red",
                                    cursor: "pointer",
                                }}
                                title="Delete Image"
                            >
                                ❌
                            </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
