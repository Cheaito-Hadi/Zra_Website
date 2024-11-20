import React, { useState } from "react";
import "./FailedInvoicesTable.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Input,
} from "@material-tailwind/react";

const ROWS_PER_PAGE = 6;
const TABLE_HEAD = ["SDC ID", "Invoice Number", "Error Message", "Date"];

const TABLE_ROWS = [
    { sdcId: "SDC123456", invoiceNumber: "INV-1001", errorMessage: "Invalid tax rate", date: "2023-10-15 14:30" },
    { sdcId: "SDC654321", invoiceNumber: "INV-1002", errorMessage: "Missing customer details", date: "2023-10-15 15:45" },
    { sdcId: "SDC789012", invoiceNumber: "INV-1003", errorMessage: "Amount mismatch", date: "2023-10-16 10:00" },
    { sdcId: "SDC345678", invoiceNumber: "INV-1004", errorMessage: "Failed to sync", date: "2023-10-16 11:25" },
    { sdcId: "SDC901234", invoiceNumber: "INV-1005", errorMessage: "Invalid item code", date: "2023-10-17 09:15" },
    { sdcId: "SDC112233", invoiceNumber: "INV-1006", errorMessage: "Duplicate invoice number", date: "2023-10-17 10:30" },
    { sdcId: "SDC445566", invoiceNumber: "INV-1007", errorMessage: "Unauthorized access", date: "2023-10-18 08:45" },
    { sdcId: "SDC778899", invoiceNumber: "INV-1008", errorMessage: "Payment failed", date: "2023-10-18 09:00" },
    { sdcId: "SDC990011", invoiceNumber: "INV-1009", errorMessage: "Invoice format incorrect", date: "2023-10-19 14:00" },
    { sdcId: "SDC223344", invoiceNumber: "INV-1010", errorMessage: "Customer not found", date: "2023-10-19 15:15" },
    { sdcId: "SDC556677", invoiceNumber: "INV-1011", errorMessage: "Expired payment method", date: "2023-10-20 12:30" },
    { sdcId: "SDC889900", invoiceNumber: "INV-1012", errorMessage: "Missing invoice items", date: "2023-10-20 13:45" },
    { sdcId: "SDC334455", invoiceNumber: "INV-1013", errorMessage: "Failed to generate invoice", date: "2023-10-21 11:00" },
    { sdcId: "SDC667788", invoiceNumber: "INV-1014", errorMessage: "Account suspended", date: "2023-10-21 16:00" },
    { sdcId: "SDC889911", invoiceNumber: "INV-1015", errorMessage: "Network timeout", date: "2023-10-22 10:20" },
];

const FailedInvoicesTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRows = TABLE_ROWS.filter(row =>
        row.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const currentRows = filteredRows.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <h2 className="failed-invoices-title">Failed Invoices</h2>
                        <p className="failed-invoices-description">
                            Details about recent failed invoices
                        </p>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search by Invoice Number"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="card-body-fixed-height overflow-hidden px-0">
                <table className="w-full min-w-max table-fixed text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography variant="small" color="blue-gray"
                                            className="font-normal leading-none opacity-70">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentRows.map(({sdcId, invoiceNumber, errorMessage, date}, index) => {
                        const isLast = index === currentRows.length - 1;
                        const classes = `${isLast ? "p-4" : "p-4 border-b border-blue-gray-50"} table-row-hover`;

                        return (
                            <tr key={sdcId} className={classes}>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {sdcId}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {invoiceNumber}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {errorMessage}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {date}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="filled" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {currentPage} of {totalPages}
                </Typography>
                <Button variant="filled" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
};

export default FailedInvoicesTable;
