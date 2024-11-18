// src/pages/Register.js
import React from 'react';

const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm your password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
