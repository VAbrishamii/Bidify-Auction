import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";

const Edit = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [navigate, username]);
  return (
    <div>
      {/* Pass the username to UpdateProfile component to pre-fill or use the username */}
      <UpdateProfile username={username} />
    </div>
  );
};

export default Edit;
