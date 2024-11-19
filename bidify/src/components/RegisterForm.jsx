import React from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../service/register";

const RegisterForm = ({ onregisterSuccess }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      alert("Email must be in the format 'email@stud.noroff.no'");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const data = await registerUser(formData);
      onregisterSuccess(data);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
        <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          required
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register</button>
      <Link to="/login" className="text-blue-500 hover:underline">
        <button type="submit">Login</button>
      </Link>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};
export default RegisterForm;