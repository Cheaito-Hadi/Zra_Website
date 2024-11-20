import React from "react";
import LineChart from "../../components/Charts/LineChart/LineChart.jsx";
import DoughnutChart from "../../components/Charts/DoughnutChart/DoughnutChart.jsx";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="p-6">
            <h2 className="dashboard-heading">Dashboard</h2>
            <div className="dashboard-container">
                <div className="left-chart">
                    <LineChart/>
                </div>
                <div className="right-chart">
                    <DoughnutChart/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
