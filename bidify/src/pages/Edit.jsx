
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";  // Import useParams to get URL params
import UpdateProfile from "../components/UpdateProfile";

const Edit = () => {
  const navigate = useNavigate();
  const { username } = useParams(); // Get the username from the URL

  useEffect(() => {
    // Check if username exists in URL (if not, redirect to login page)
    if (!username) {
      navigate("/login"); // Redirect to login page if no username is found
    }
  }, [navigate, username]); // Add `username` as a dependency to re-run the effect when it changes

  return (
    <div>
      {/* <h1>Edit Profile</h1> */}
      {/* Pass the username to UpdateProfile component to pre-fill or use the username */}
      <UpdateProfile username={username} />
    </div>
  );
};

export default Edit;



