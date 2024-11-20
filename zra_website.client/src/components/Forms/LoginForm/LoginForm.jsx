import React, {useState} from "react";
import Button from "../../Base/Button/Button.jsx";
import Input from "../../Base/Input/Input.jsx";
import companyLogoBlack from "../../../assets/SVGs/LamasatLogo-Black.svg";
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Please fill in all fields.");
        } else {
            setError("");
            console.log("Logging in with:", {username, password});
        }
    };

    return (
        <div className="login-box">
            <div className="logo-container">
                <img src={companyLogoBlack} alt="Company Logo" className="logo-login"/>
            </div>

            {error && (
                <p className="error-message">{error}</p>
            )}

            <form onSubmit={handleSubmit} aria-label="Login Form">
                <Input
                    label="Username"
                    value={username}
                    aria-required="true"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    aria-required="true"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    label="Login"
                    color="green"
                />
            </form>
        </div>
    );
};

export default LoginForm;
