import React from "react";
import './LoginRightSide.css';

const RightSide = () => {
    return (
        <div className="login-right">
            <div className="instruction-text">
                <p>Welcome to the Platform. This system serves as an intermediary between Microsoft Dynamics and
                    ZRA, facilitating secure data transfer. Information displayed here is sourced from Dynamics and
                    shared with ZRA as required.</p>
                <p>If you do not have login credentials, encounter login issues, or have any questions, please reach
                    out to the IT department at Lamasat HQ.</p>
            </div>
        </div>
    );
};

export default RightSide;
