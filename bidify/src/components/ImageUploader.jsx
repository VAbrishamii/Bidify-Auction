import React, { useState } from 'react';

const ImageUploader = ({ onImageUploaded }) => {
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const uploadImage = async () => {
        if (!imageFile) {
            alert("Please select an image file first!");
            return;
        }

        setUploading(true);

        // Use your Cloudinary upload preset and API key
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "default"); // Replace with your Cloudinary upload preset

        try {
            const response = await fetch(
               "https://api.cloudinary.com/v1_1/dihplbjah/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Image upload failed!");
            }

            const data = await response.json();
            setImageUrl(data.secure_url); // URL of the uploaded image
            setUploading(false);

            // Pass the URL to the parent component or API
            if (onImageUploaded) {
                onImageUploaded(data.secure_url);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={uploadImage} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {imageUrl && (
                <div>
                    <p>Image Uploaded!</p>
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                        View Image
                    </a>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
