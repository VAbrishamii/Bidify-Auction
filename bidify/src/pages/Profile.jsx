import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; 
import AuctionAPI from "../service/AuctionAPI"; 
import Listings from "../components/ProfileListing";

const Profile = () => {
  const { username } = useParams(); 
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await new AuctionAPI().singleProfile(username);
        console.log("username data", data);
        setProfileData(data);
      } catch (err) {
        setError("Failed to fetch profile data");
      }
    };

    fetchProfile();
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  // Render the profile data
  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={profileData.data.avatar.url}
          alt={profileData.data.avatar.alt}
          className="profile-avatar"
        />
        <h1>Name:{profileData.data.name}</h1>
        <p>Bio: {profileData.data.bio}</p>
        <p>Email: {profileData.data.email}</p>
        <p>Credits: {profileData.data.credits}</p>
      </div>

      <div className="profile-stats">
        <p>Listings: {profileData.data._count.listings}</p>
        <p>Wins: {profileData.data._count.wins}</p>

        {/* Bids Section with clickable link */}
        <p>
          <Link to={`/profile/bids/${username}`}>Bids</Link>
        </p>
      </div>

      <div className="profile-listings">
        <Listings userName={username} />
      </div>
    </div>
  );
};

export default Profile;
