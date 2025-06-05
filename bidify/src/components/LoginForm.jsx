import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/login";
/**
 * LoginForm component handles user login functionality.
 * It includes fields for email and password,
 * and submits the credentials to the server for authentication.
 * On successful login, it stores the access token and user data in localStorage
 */
const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    try {
      const response = await loginUser(credentials);
      const { accessToken, ...userData } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("loginuser", JSON.stringify(userData));

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="form flex flex-col bg-white" onSubmit={handleSubmit}>
      <h1 className="flex-styled justify-center">Welcome Back</h1>
      <div>
        <label>
          Email: <span className="text-red-default">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email ex:email.stud.noroff.no"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>
          Password: <span className="text-red-default">*</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password it should be at least 8 characters"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button aria-label="Login" className="signin-btn" type="submit">
        Login
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};
export default LoginForm;
