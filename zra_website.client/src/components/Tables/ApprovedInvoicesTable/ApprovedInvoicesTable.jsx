import {
    MagnifyingGlassIcon,
    ArrowDownTrayIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Card
} from "@material-tailwind/react";
import React, {useState, useEffect} from "react";
import InvoicesInfoModal from "../../UI/Modals/InvoicesInfoModal/InvoicesInfoModal.jsx";
import "./ApprovedInvoicesTable.css";
import { requestHandler } from "../../../api/axios.js";

const TABS = [
    {label: "All Invoices", value: "all"},
    {label: "Successful Invoices", value: "successful"},
    {label: "Pending Invoices", value: "pending"},
    {label: "Failed Invoices", value: "failed"},
];

const TABLE_HEAD = ["ID", "Amount", "Type", "Status", "Date", "Details", "Action"];

const TABLE_ROWS = [
    {id: "IN68241", amount: "$4.41", type: "Sale", status: "Uploaded", date: "09/30/2024, 10:18:52 AM"},
    {id: "IN68240", amount: "$4.41", type: "Sale", status: "Pending", date: "09/30/2024, 10:18:55 AM"},
];

const INVOICE_DETAILS = {
    id: "12345",
    amount: "$500",
    date: "2024-11-07",
    signature: "John Doe",
    internalDate: "2024-11-06",
    invoiceSequence: "INV2024001",
    url: "https://example.com/invoice/12345"
};


const ROWS_PER_PAGE = 8;

const ApprovedInvoicesTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchProcessedInvoices = async () => {
        try {
            const response = await requestHandler({
                method: "GET",
                route: "/Invoices/ProcessedInvoices", 
            });

            console.log(response);
            setInvoices(response);
            setSuccess("Invoices fetched successfully.");
            setError("");
        } catch (err) {
            setError(`Error fetching processed invoices: ${err.message}`);
            setSuccess("");
        }
    };

    useEffect(() => {
        fetchProcessedInvoices();
    }, []);

    const handleRefresh = () => {
        setCurrentPage(1);
        setSearchQuery("");
        fetchProcessedInvoices();
    };

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    const filteredRows = TABLE_ROWS.filter((row) => {
        if (selectedTab === "all") return true;
        if (selectedTab === "successful") return row.status === "Uploaded";
        if (selectedTab === "pending") return row.status === "Pending";
        if (selectedTab === "failed") return row.status === "Canceled";
        return false;
    }).filter((row) =>
        row.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTabChange = (value) => {
        setSelectedTab(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE);
    const currentRows = filteredRows.slice(startIndex, endIndex);

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

    return (
        <Card className="approved-invoices-container h-full">
            <CardBody className=" approved-invoices-container-fixed px-6" style={{backgroundColor: '#f1f1f1'}}>
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <h2 className="approved-summary-title">Approved Invoices</h2>
                        <p className="approved-summary-description">
                            An intuitive way to see all your general invoices for quick access
                        </p>
                    </div>

                    <div className="flex w-full shrink-0 gap-2 md:w-max p-2 rounded-md">
                        {TABS.map(({label, value}) => (
                            <Button
                                key={value}
                                variant="filled"
                                style={{
                                    backgroundColor: selectedTab === value
                                        ? value === "all" ? "#2296f2" :
                                            value === "successful" ? "#276437" :
                                                value === "pending" ? "#f89a3c" :
                                                    value === "failed" ? "#c0302e" : "transparent"
                                        : "transparent",
                                    color: selectedTab === value
                                        ? "#fff"
                                        : value === "all" ? "#2296f2" :
                                            value === "successful" ? "#276437" :
                                                value === "pending" ? "#f89a3c" :
                                                    value === "failed" ? "#c0302e" : "#000",
                                    border: `1px solid ${
                                        value === "all" ? "#2296f2" :
                                            value === "successful" ? "#276437" :
                                                value === "pending" ? "#f89a3c" :
                                                    value === "failed" ? "#c0302e" : "transparent"
                                    }`
                                }}
                                onClick={() => handleTabChange(value)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72 bg-white">
                        <Input
                            label="Search by ID"
                            icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
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

                <table className="w-full min-w-max table-auto text-left overflow-hidden">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="p-4 bg-blue-gray-50 text-gray-700 border-b border-blue-gray-100">
                                <Typography variant="small" color="blue-gray"
                                            className="font-normal leading-none opacity-70">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentRows.map(({id, amount, type, status, date}, index) => (
                        <tr key={id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="p-4 text-blue-gray-700 border-b border-blue-gray-100">
                                <Typography variant="small" color="blue-gray" className="font-normal">{id}</Typography>
                            </td>
                            <td className="p-4 text-gray-600 border-b border-blue-gray-100">{amount}</td>
                            <td className="p-4 text-gray-600 border-b border-blue-gray-100">{type}</td>
                            <td className="p-4 border-b border-blue-gray-100">
                                <Chip
                                    variant="ghost"
                                    size="sm"
                                    value={status}
                                    color={status === "Uploaded" ? "green" : status === "Canceled" ? "red" : status === "Pending" ? "yellow" : "gray"}
                                />
                            </td>
                            <td className="p-4 text-gray-600 border-b border-blue-gray-100">{date}</td>
                            <td className="invoice-table-cell">
                                <InvoicesInfoModal {...INVOICE_DETAILS} />
                            </td>
                            <td className="p-4 border-b border-blue-gray-100">
                                <Button variant="outlined" size="sm" color="blue" className="flex items-center gap-2">
                                    <ArrowDownTrayIcon className="h-4 w-4"/>
                                    Download
                                </Button>
                            </td>
                        </tr>
                    ))}
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

export default ApprovedInvoicesTable;