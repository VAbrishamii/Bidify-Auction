import React, { useState, useEffect, useMemo } from "react";
import AuctionAPI from "../service/AuctionAPI"; // Assuming you have this path correct
import { useNavigate } from "react-router-dom";
import ImageUploader from './ImageUploader'; // Import the ImageUploader component

const UpdateProfile = ({ username }) => {
  const [avatar, setAvatar] = useState({ url: "", alt: "" });
  const [bio, setBio] = useState("");
  const [name, setName] = useState(""); // User's name
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [successMessage, setSuccessMessage] = useState(""); // Success message after updating profile
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const navigate = useNavigate();

  // Create a new instance of AuctionAPI
  const auctionAPI = useMemo(() => new AuctionAPI(), []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if the user is logged in (has a token)
    if (!token) {
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    // Fetch user's profile to pre-fill the form
    const fetchProfile = async () => {
      try {
        const profile = await auctionAPI.singleProfile(username);
        setName(profile.data.name || ""); // Assuming profile contains 'name'
        setAvatar(profile.data.avatar || { url: "", alt: "" });
        setBio(profile.data.bio || "");
      } catch (error) {
        setErrorMessage("Failed to fetch profile data. Please try again.");
      }
    };

    fetchProfile();
  }, [navigate, auctionAPI, username]);

  // Handle image upload from the ImageUploader component
  const handleImageUploaded = (uploadedUrls) => {
    // Assuming the first image URL is the avatar URL
    if (uploadedUrls.length > 0) {
        setAvatar({ url: uploadedUrls[0], alt: "Avatar Image" });
    }
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const data = { avatar, bio };

    try {
      await auctionAPI.updateProfile(username, data);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <h2>Update Profile</h2> */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Display user's current avatar, name, and bio at the top */}
      <div style={{ marginBottom: "20px" }}>
        <h3>{name}</h3>
        {avatar.url && <img src={avatar.url} alt={avatar.alt} style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
        <p>{bio}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="avatar">Change Avatar:</label>
          {/* Use ImageUploader for handling the image upload */}
          {/* <ImageUploader onImageUploaded={handleImageUploaded} /> */}
          <ImageUploader onImageUploaded={(urls) => handleImageUploaded(urls, "avatar")} />
          {avatar.url && <img src={avatar.url} alt={avatar.alt} style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
