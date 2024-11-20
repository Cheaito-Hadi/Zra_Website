import React from "react";
import './ApprovedInvoicesSummary.css';

const ApprovedInvoicesSummary = () => {
    return (
        <div className="approved-summary-container">
            <h2 className="approved-summary-title">Invoice Manager</h2>
            <p className="approved-summary-description">
                An intuitive way to see all your general invoices for a quick access
            </p>

            <div className="summary-cards-container">
                <div className="summary-card">
                    <p className="summary-card-label">Total Invoices</p>
                    <p className="summary-card-value">35</p>
                    <div className="summary-card-subdata">
                        <span className="subdata-box">This Month: 25</span>
                        <span className="subdata-box">Last Month: 10</span>
                    </div>
                </div>
                <div className="summary-card">
                    <p className="summary-card-label">Successful</p>
                    <p className="summary-card-value">35</p>
                    <p className="summary-card-percentage positive">+150%</p>
                </div>
                <div className="summary-card">
                    <p className="summary-card-label">Pending</p>
                    <p className="summary-card-value">0</p>
                    <p className="summary-card-percentage neutral">0%</p>
                </div>
                <div className="summary-card">
                    <p className="summary-card-label">Failed</p>
                    <p className="summary-card-value">0</p>
                    <p className="summary-card-percentage negative">0%</p>
                </div>
            </div>
        </div>
    );
};

export default ApprovedInvoicesSummary;
