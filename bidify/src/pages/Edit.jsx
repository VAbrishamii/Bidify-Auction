import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";
/**
 * Edit component that handles the editing of user profiles.
 *  It checks if the username is provided in the URL parameters,
 *  and if not, redirects the user to the login page.
 */
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
