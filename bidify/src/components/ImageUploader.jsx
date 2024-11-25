import React, { useState } from 'react';

const ImageUploader = ({ onImageUploaded }) => {
    const [imageFiles, setImageFiles] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setImageFile(file);
    // };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         console.log("Selected file:", file); // Debugging line
    //         setImageFile(file);
    //     } else {
    //         console.log("No file selected"); // Debugging line
    //     }
    // };
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to an array
        setImageFiles(files);
    };
    
    const uploadImage = async () => {
        if (imageFiles.length === 0) {
            alert("Please select an image file first!");
            return;
        }

        setUploading(true);

        const uploadedUrls = [];

        for (let file of imageFiles) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ml_default");

        // const formData = new FormData();
        // formData.append("file", imageFile);
        // formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

        try {
            console.log('uploading image');
            const response = await fetch(
               "https://api.cloudinary.com/v1_1/dihplbjah/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorDetails = await response.text(); // Capture response body for debugging
                console.error("Upload failed. Response:", errorDetails);
                throw new Error("Image upload failed!");
            }

            const data = await response.json();
            uploadedUrls.push(data.secure_url);
            console.log('uploading image data', data);

            setImageUrl(uploadedUrls); 
           
            if (onImageUploaded) {
                console.log('url of image', data.secure_url);
                onImageUploaded(uploadedUrls); // Pass the secure_url to the parent component
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={uploadImage} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {imageUrl.length> 0  && (
                <div>
                    <p>Image Uploaded!</p>
                    {imageUrl.map((url,index) => (
                         <div key={index}>
                         <a href={url} target="_blank" rel="noopener noreferrer">
                             View Image {index + 1}
                         </a>
                     </div>
                       ))}
                   
                </div>
            )}
        </div>
    );
};
};

export default ImageUploader;
