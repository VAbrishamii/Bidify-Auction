import React, { useEffect, useState } from "react";
import axios from "axios";
import EditComponent from "../components/EditProfile";

const EditPage = () => {
  const [userData, setUserData] = useState(null);
  const userName = localStorage.getItem("userName"); // Assuming userName is stored in localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/auction/profiles/${userName}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userName]);

  const handleProfileUpdate = (updatedData) => {
    setUserData(updatedData);
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {userData ? (
        <EditComponent userData={userData} onProfileUpdate={handleProfileUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPage;
