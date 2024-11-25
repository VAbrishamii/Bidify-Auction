import React, { useState } from 'react';

const ImageUploader = ({ onImageUploaded }) => {
    const [imageFiles, setImageFiles] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState("");

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); 
        // setImageFiles((prev) => [...prev, ...files]);
        setImageFiles(files);
    };
    
    const uploadImage = async () => {
        // if (imageFiles.length === 0) {
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
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

            // setImageUrls(uploadedUrls); 
            setImageUrls((prev) => [...prev, ...uploadedUrls]);
           
            if (onImageUploaded) {
                onImageUploaded([...imageUrls, ...uploadedUrls]);
                // console.log('url of image', data.secure_url);
                // onImageUploaded(uploadedUrls); // Pass the secure_url to the parent component
            }

            setUploading(false);
            setImageFiles([]);
        };
    
       
            const handleDeleteImage = (url) => {
                const updatedUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
                setImageUrls(updatedUrls);
             

                if (onImageUploaded) {
                    onImageUploaded(updatedUrls);
            };
        };
    


    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange}  multiple />
            <button onClick={uploadImage} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {imageUrls.length > 0  && (
                <div>
                    <p>Image Uploaded!</p>
                    {imageUrls.map((url,index) => (
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
