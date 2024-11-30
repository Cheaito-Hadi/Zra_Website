import React, { useState, useEffect } from "react";
import "./FailedInvoicesTable.css";
import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Input,
} from "@material-tailwind/react";
import { requestHandler } from "../../../api/axios.js";

const ROWS_PER_PAGE = 6;
const TABLE_HEAD = ["SDC ID", "Invoice Number", "Error Message", "Date"];

const FailedInvoicesTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [failedInvoices, setFailedInvoices] = useState([]);
    const [error, setError] = useState("");

    const fetchFailedInvoices = async () => {
        try {
            const response = await requestHandler({
                method: "GET",
                route: "/Invoices/FailedInvoices",
            });

            const formattedData = response.map((invoice) => ({
                ...invoice,
                date: formatDate(invoice.date),
            }));

            setFailedInvoices(formattedData);
            setError("");
        } catch (err) {
            setError(`Error fetching failed invoices: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchFailedInvoices();
    }, []);

    const handleRefresh = () => {
        setCurrentPage(1);
        setSearchQuery("");
        fetchFailedInvoices();
    };

    const formatDate = (dateString) => {
        const date = new Date(
            dateString.slice(0, 4), 
            dateString.slice(4, 6) - 1, 
            dateString.slice(6, 8), 
            dateString.slice(8, 10), 
            dateString.slice(10, 12), 
            dateString.slice(12, 14) 
        );
        return date.toLocaleString();
    };


    const filteredRows = failedInvoices.filter((row) =>
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
                        <Button
                            variant="text"
                            color="blue-gray"
                            onClick={handleRefresh}
                        >
                            <ArrowPathIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="card-body-fixed-height overflow-hidden px-0">
                {error ? (
                    <Typography color="red" className="text-center">{error}</Typography>
                ) : (
                    <table className="w-full min-w-max table-fixed text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map(({ sdcId, invoiceNumber, errorMessage, date }, index) => {
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
                )}
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
