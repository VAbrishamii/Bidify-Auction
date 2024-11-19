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
        console.log('object credentials', credentials);
        try {
            const data = await loginUser({ credentials });
            console.log('data', data);
            const accesstoken = data.accessToken;
            console.log('accesstoken', accesstoken);
            localStorage.setItem("token", accesstoken);
            localStorage.setItem("loginuser", JSON.stringify(data));
            console.log(data);
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    }

return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Email:</label>
            <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label>Password:</label>
            <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
    </form>
);
};
export default LoginForm;