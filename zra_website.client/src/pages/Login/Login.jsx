import React from "react";
import LeftSide from "../../components/UI/LoginLeftSide/LoginLeftSide.jsx";
import RightSide from "../../components/UI/LoginRightSide/LoginRightSide.jsx";
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <LeftSide/>
            <RightSide/>
        </div>
    );
};

export default Login;
