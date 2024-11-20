import React from "react";
import './BranchCard.css';

const BranchCard = ({ branchName, province, manager, sdcId, deviceId, branchId, createdOn }) => {
    return (
        <div className="branch-card">
            <h2 className="branch-title">{branchName}</h2>
            <p className="branch-info"><strong>Province Name:</strong> {province}</p>
            <p className="branch-info"><strong>Manager Name:</strong> {manager}</p>
            <p className="branch-info"><strong>SDC ID:</strong> {sdcId}</p>
            <p className="branch-info"><strong>Device ID:</strong> {deviceId}</p>
            <p className="branch-info"><strong>Branch ID:</strong> {branchId}</p>
            <p className="branch-info"><strong>Created On:</strong> {createdOn}</p>
        </div>
    );
};

export default BranchCard;
