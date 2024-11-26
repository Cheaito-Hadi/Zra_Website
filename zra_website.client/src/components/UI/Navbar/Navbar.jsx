import React from "react";
import companyLogoBlack from "../../../assets/SVGs/LamasatLogo-Black.svg";
import { SidebarWithBurgerMenu } from "../BurgerMenu/BurgerMenu.jsx";
import { Typography } from "@material-tailwind/react";
import './Navbar.css';

export function Navbar() {
    const currentDate = new Date().toLocaleDateString("en-GB", {
        timeZone: "Africa/Lusaka",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const firstName = localStorage.getItem("first name") || "User";

    return (
        <div className="navbar-container">
            <div className="flex items-center">
                <SidebarWithBurgerMenu />
                <img src={companyLogoBlack} alt="Company Logo" className="logo" />
            </div>

            <div className="flex items-center space-x-4">
                <Typography variant="h6" className="welcome-text">
                    Welcome, {firstName} n 
                </Typography>
                <Typography variant="h6" className="date-text">
                    Date: {currentDate}
                </Typography>
            </div>
        </div>
    );
}

export default Navbar;
