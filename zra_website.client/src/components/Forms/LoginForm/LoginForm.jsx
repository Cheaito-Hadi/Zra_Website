import React, { useState } from "react";
import Button from "../../Base/Button/Button.jsx";
import CustomInput from "../../Base/Input/Input.jsx";
import { requestHandler } from "../../../api/axios.js";
import companyLogoBlack from "../../../assets/SVGs/LamasatLogo-Black.svg";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await requestHandler({
                method: "POST",
                route: "/Login/login",
                body: {
                    UserId: username,
                    Password: password,
                },
            });

            localStorage.setItem("token", response.token);
            localStorage.setItem("first name", response.firstName);

            setSuccess(response.Message);
            setError("");

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
            setSuccess("");
        }
    };

    return (
        <div className="login-box">
            <div className="logo-container">
                <img src={companyLogoBlack} alt="Company Logo" className="logo-login" />
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit}>
                <CustomInput
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <CustomInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    label="Login"
                    color="green"
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
};

export default LoginForm;
