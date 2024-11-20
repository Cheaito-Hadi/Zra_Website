import React from "react";
import companyLogoWhite from "../../../assets/SVGs/LamasatLogo-White.svg";
import zraLogo from "../../../assets/Pictures/ZRA-logo.png";
import LoginForm from "../../Forms/LoginForm/LoginForm.jsx";
import './LoginLeftSide.css';

const LeftSide = () => {
    return (
        <div className="login-left">
            <div className="login-wrapper">
                <LoginForm/>
            </div>
            <div className="top-logos">
                <img src={companyLogoWhite} alt="Company Logo" className="logo-top"/>
                <span className="separator">X</span>
                <img src={zraLogo} alt="ZRA Logo" className="logo-top"/>
            </div>
        </div>
    );
};

export default LeftSide;
