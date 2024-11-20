import React from "react";
import './Branches.css';
import BranchCard from "../../components/Base/BranchCard/BranchCard.jsx";

const Branches = () => {
    const branches = [
        {
            branchName: "Lamasat Headquarters",
            province: "Lusaka",
            manager: "Mahmoud Ahmad",
            sdcId: "SDC0010017418",
            deviceId: "200227198600000001",
            branchId: "000",
            createdOn: "10/30/2024, 1:48:45 PM",
        },
        {
            branchName: "Lamsat Aluminium",
            province: "Lusaka",
            manager: "Hassan Ahmad",
            sdcId: "SDC0010017418",
            deviceId: "200227198600000001",
            branchId: "000",
            createdOn: "10/30/2024, 1:48:45 PM",
        },
        {
            branchName: "Lamasat Showgrounds",
            province: "Lusaka",
            manager: "Mohammad",
            sdcId: "SDC0010017418",
            deviceId: "200227198600000001",
            branchId: "000",
            createdOn: "10/30/2024, 1:48:45 PM",
        },
        {
            branchName: "Lamasat Express",
            province: "Lusaka",
            manager: "Susan Sinyenga",
            sdcId: "SDC0010017418",
            deviceId: "200227198600000001",
            branchId: "000",
            createdOn: "10/30/2024, 1:48:45 PM",
        },
        {
            branchName: "Lamasat Shopping Complex",
            province: "Lusaka",
            manager: "Tracy",
            sdcId: "SDC0010017418",
            deviceId: "200227198600000001",
            branchId: "000",
            createdOn: "10/30/2024, 1:48:45 PM",
        },
        {
            branchName: "Lamasat Kitwe Main",
            province: "Copperbelt",
            manager: "Khalil Roz",
            sdcId: "SDC0010017418",
            deviceId: "200227198600000001",
            branchId: "000",
            createdOn: "10/30/2024, 1:48:45 PM",
        },
        {
            branchName: "Lamasat Freedom Way",
            province: "Copperbelt",
            manager: "Razeem",
            sdcId: "SDC0010017418",
            deviceId: "200227198600000001",
            branchId: "000",
            createdOn: "10/30/2024, 1:48:45 PM",
        },

    ];

    return (
        <div className="branches-page">
            <h1 className="branches-title">Lamsat Branches</h1>
            <p className="branches-description">
                Explore detailed information about each branch location within Lamsat, including regional details, branch management, and unique identifiers for our systems. This allows for easy access to key information for efficient management and quick reference.
            </p>
            <div className="branches-container">
                {branches.map((branch, index) => (
                    <BranchCard key={index} {...branch} />
                ))}
            </div>
        </div>
    );
};

export default Branches;