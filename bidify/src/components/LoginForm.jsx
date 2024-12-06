import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/login";

const LoginForm = () => {
    const [email, setEmail] = React.useState("");
    console.log('email', email);
    const [password, setPassword] = React.useState("");
    console.log('password', password);
    const [error, setError] = React.useState("");
    console.log('error', error);

const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };
        console.log('credentials', credentials);
        try {
            const response = await loginUser( credentials );
            console.log('data', response.data);
            const { accessToken, ...userData } = response.data;
            console.log('accesstoken', accessToken);
            localStorage.setItem("token", accessToken);
            console.log('token', localStorage.getItem("token"));

            localStorage.setItem("loginuser", JSON.stringify(userData));
            console.log(userData);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

return (
    <form className='form flex flex-col bg-white' onSubmit={handleSubmit}>
        <h1 className='flex-styled justify-center'>Welcome Back</h1>
        <div>
            <label>Email: <span className="text-red-default">*</span></label>
            <input
                type="email"
                placeholder="Enter your email ex:email.stud.noroff.no"
                required
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label>Password: <span className="text-red-default">*</span></label>
            <input
                type="password"
                placeholder="Enter your password it should be at least 8 characters"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button aria-label='Login' className='signin-btn' type="submit">Login</button>
        {error && <p>{error}</p>}
    </form>
);
};
export default LoginForm;