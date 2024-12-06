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
    <div className="profile">
      <div className="profile-header">
        <img
          src={profileData.data.avatar.url}
          alt={profileData.data.avatar.alt}
        
        />
        <h1>{profileData.data.name.charAt(0).toUpperCase()+profileData.data.name.slice(1)}</h1>
        <p>{profileData.data.bio}</p>
        {/* Bids Section with clickable link */}
        <p>
          <Link to={`/profile/bids/${username}`}>{username.charAt(0).toUpperCase() + username.slice(1)} Bids</Link>
        </p>
       
      </div>

      <div className="profile-stats">
       <p>Credits: {profileData.data.credits}</p>
        <p>Listings: {profileData.data._count.listings}</p>
        <p>Wins: {profileData.data._count.wins}</p>

        
      </div>

      <div className="profile-listings min-h-[360px]">
        <Listings userName={username} />
      </div>
    </div>
  );
};

export default Profile;
