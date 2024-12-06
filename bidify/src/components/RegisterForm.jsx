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
    <div className="register-welcoming ">
      {/* Left Side: Logo and Welcome Message */}
      <div className="left-side-registerform">
        <div className="text-center w-80 p-5">
          <img
            src={`${process.env.PUBLIC_URL}/Bidify ..png`}
            alt="Bidify Logo"
            className="logo ml-6"
          />
          <h1 className="text-3xl font-bold mt-4">Welcome to Bidify</h1>
          <h2>Create Your Account and unlock Exlusive Features</h2>
          <p className="mt-4 text-gray-light">
            By creating an account, you get <strong>1000 point credit</strong>{" "}
            and can use it to sell or buy your items.
          </p>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>
            Name: <span className="text-red-default">*</span>{" "}
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Email: <span className="text-red-default">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Password: <span className="text-red-default">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Confirm Password: <span className="text-red-default">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            onChange={handleChange}
          />
        </div>
        <button aria-label="Register" className="btn" type="submit">
          Register
        </button>
        <Link
          aria-label="Go to Login"
          to="/login"
          className="signin-btn flex-styled">
          <button aria-label="Login" className="w-full" type="submit">
            Login
          </button>
        </Link>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};
export default RegisterForm;
