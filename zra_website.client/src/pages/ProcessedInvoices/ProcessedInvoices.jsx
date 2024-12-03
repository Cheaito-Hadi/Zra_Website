import React from "react";
import ApprovedInvoicesSummary from "../../components/UI/ApprovedInvoicesSummary/ApprovedInvoicesSummary.jsx";
import ApprovedInvoicesTable from "../../components/Tables/ApprovedInvoicesTable/ApprovedInvoicesTable.jsx";
import './ProcessedInvoices.css';


const ProcessedInvoices = () => {
    return (
        <div>
            {/*<ApprovedInvoicesSummary/>*/}
            <ApprovedInvoicesTable/>
        </div>
    );
};

export default ProcessedInvoices;
