import React, { useState, useEffect, useMemo } from "react";
import AuctionAPI from "../service/AuctionAPI";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import { useAppContext } from "../context/AppContext";

const UpdateProfile = ({ username, onUpdateAvatar }) => {
  const { userData, updateUserData } = useAppContext();
  const [avatar, setAvatar] = useState({ url: "", alt: "" });
  // eslint-disable-next-line no-unused-vars
  const [CurrentAvatar, setCurrentAvatar] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [CurrentBio, setCurrentBio] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const auctionAPI = useMemo(() => new AuctionAPI(), []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const profile = await auctionAPI.singleProfile(username);
        setName(profile.data.name || "");
        setCurrentAvatar(profile.data.avatar || "");
        setAvatar(profile.data.avatar || { url: "", alt: "" });
        setCurrentBio(profile.data.bio || "");
        setBio(profile.data.bio || "");
      } catch (error) {
        setErrorMessage("Failed to fetch profile data. Please try again.");
      }
    };

    fetchProfile();
  }, [navigate, auctionAPI, username]);

  const handleImageUploaded = (uploadedUrls) => {
    if (uploadedUrls.length > 0) {
      setAvatar({ url: uploadedUrls[0], alt: "Avatar Image" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const data = { avatar, bio };

    try {
      await auctionAPI.updateProfile(username, data);
      updateUserData({ avatar, bio });
      if (onUpdateAvatar) {
        onUpdateAvatar(avatar.url);
      }
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      {successMessage && <p className="text-primary">{successMessage}</p>}
      {errorMessage && <p className="text-red-default">{errorMessage}</p>}
      <div className="profile-header">
        {userData.avatar?.url && (
          <img
            src={userData.avatar.url}
            alt={userData.avatar.alt}
            className="avatar"
          />
        )}
        <h1>{userData.name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <p>{userData.bio}</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="avatar">Change Avatar:</label>
          <ImageUploader onImageUploaded={handleImageUploaded} />
          {avatar.url && (
            <img src={avatar.url} alt={avatar.alt} className="avatar" />
          )}
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
        <button
          aria-label="Update"
          className="btn"
          type="submit"
          disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
