import React, { useState } from "react";
import './ItemsTable.css';
import {
    MagnifyingGlassIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Input,
} from "@material-tailwind/react";

const ROWS_PER_PAGE = 6;
const TABLE_HEAD = ["Declaration No.", "Quantity", "HS Code", "Item Name", "Status", "Date"];

const TABLE_ROWS = [
    { declaration: "C 59637-2024-NKA", quantity: "150.0000", hsCode: "40112011", itemName: "275/70R22.5 (POWERTRAC HIGHWAY TIRES)", status: "Pending", date: "20240825" },
    { declaration: "C 59637-2024-NKB", quantity: "300.5000", hsCode: "40112012", itemName: "295/75R22.5 (POWERTRAC OFFROAD TIRES)", status: "Uploaded", date: "20240826" },
    { declaration: "C 59637-2024-NKC", quantity: "200.2500", hsCode: "40112013", itemName: "385/65R22.5 (POWERTRAC TRUCK TIRES)", status: "Uploaded", date: "20240827" },
    { declaration: "C 59637-2024-NKD", quantity: "120.0000", hsCode: "40112014", itemName: "225/75R16 (POWERTRAC SUV TIRES)", status: "Canceled", date: "20240828" },
    { declaration: "C 59637-2024-NKr", quantity: "150.0000", hsCode: "40112011", itemName: "275/70R22.5 (POWERTRAC HIGHWAY TIRES)", status: "Pending", date: "20240825" },
    { declaration: "C 59637-2024-NKt", quantity: "300.5000", hsCode: "40112012", itemName: "295/75R22.5 (POWERTRAC OFFROAD TIRES)", status: "Uploaded", date: "20240826" },
    { declaration: "C 59637-2024-NKy", quantity: "200.2500", hsCode: "40112013", itemName: "385/65R22.5 (POWERTRAC TRUCK TIRES)", status: "Uploaded", date: "20240827" },
    { declaration: "C 59637-2024-NKh", quantity: "120.0000", hsCode: "40112014", itemName: "225/75R16 (POWERTRAC SUV TIRES)", status: "Canceled", date: "20240828" },
    { declaration: "C 59637-2024-NKbs", quantity: "150.0000", hsCode: "40112011", itemName: "275/70R22.5 (POWERTRAC HIGHWAY TIRES)", status: "Pending", date: "20240825" },
    { declaration: "C 59637-2024-NKa", quantity: "300.5000", hsCode: "40112012", itemName: "295/75R22.5 (POWERTRAC OFFROAD TIRES)", status: "Uploaded", date: "20240826" },
    { declaration: "C 59637-2024-NKp", quantity: "200.2500", hsCode: "40112013", itemName: "385/65R22.5 (POWERTRAC TRUCK TIRES)", status: "Uploaded", date: "20240827" },
    { declaration: "C 59637-2024-NKl", quantity: "120.0000", hsCode: "40112014", itemName: "225/75R16 (POWERTRAC SUV TIRES)", status: "Canceled", date: "20240828" },
    { declaration: "C 59637-2024-NKm", quantity: "150.0000", hsCode: "40112011", itemName: "275/70R22.5 (POWERTRAC HIGHWAY TIRES)", status: "Pending", date: "20240825" },
    { declaration: "C 59637-2024-NKn", quantity: "300.5000", hsCode: "40112012", itemName: "295/75R22.5 (POWERTRAC OFFROAD TIRES)", status: "Uploaded", date: "20240826" },
    { declaration: "C 59637-2024-NKz", quantity: "200.2500", hsCode: "40112013", itemName: "385/65R22.5 (POWERTRAC TRUCK TIRES)", status: "Uploaded", date: "20240827" },
    { declaration: "C 59637-2024-NKx", quantity: "120.0000", hsCode: "40112014", itemName: "225/75R16 (POWERTRAC SUV TIRES)", status: "Canceled", date: "20240828" },
];

const TABS = [
    { label: "All Items", value: "all" },
    { label: "Successful Items", value: "uploaded" },
    { label: "Pending Items", value: "pending" },
    { label: "Failed Items", value: "canceled" },
];

const ItemsTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    const filteredRows = TABLE_ROWS.filter((row) => {
        const matchesTab = selectedTab === "all" || row.status.toLowerCase() === selectedTab;
        const matchesSearch = row.hsCode.includes(searchQuery);
        return matchesTab && matchesSearch;
    });

    const currentRows = filteredRows.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleTabChange = (value) => {
        setSelectedTab(value);
        setCurrentPage(1);
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
                        <h2 className="imported-items-title">Items Management</h2>
                        <p className="imported-items-description">
                            View the status of the items coming from ZRA along with their details
                        </p>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="flex w-full shrink-0 gap-2 md:w-max bg-white p-2 rounded-md">
                            {TABS.map(({ label, value }) => (
                                <Button
                                    key={value}
                                    variant={selectedTab === value ? "filled" : "outlined"}
                                    style={{
                                        backgroundColor: selectedTab === value
                                            ? value === "all" ? "#2296f2" :
                                                value === "uploaded" ? "#276437" :
                                                    value === "pending" ? "#f89a3c" :
                                                        value === "canceled" ? "#c0302e" : "transparent"
                                            : "transparent",
                                        color: selectedTab === value
                                            ? "#fff"
                                            : value === "all" ? "#2296f2" :
                                                value === "uploaded" ? "#276437" :
                                                    value === "pending" ? "#f89a3c" :
                                                        value === "canceled" ? "#c0302e" : "#000",
                                        border: `1px solid ${
                                            value === "all" ? "#2296f2" :
                                                value === "uploaded" ? "#276437" :
                                                    value === "pending" ? "#f89a3c" :
                                                        value === "canceled" ? "#c0302e" : "transparent"
                                        }`,
                                    }}
                                    onClick={() => handleTabChange(value)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                        <div className="w-full md:w-72 flex items-center gap-2">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button variant="text" color="blue-gray">
                                <ArrowPathIcon className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0 table-container">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="p-4 bg-blue-gray-50/50">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentRows.map((row) => (
                        <tr key={row.declaration} className="table-row-hover">
                            <td className="p-4 text-blue-gray-700">{row.declaration}</td>
                            <td className="p-4 text-blue-gray-700">{row.quantity}</td>
                            <td className="p-4 text-blue-gray-700">{row.hsCode}</td>
                            <td className="p-4 text-blue-gray-700">{row.itemName}</td>
                            <td className="p-4">
                                <Chip
                                    size="sm"
                                    variant="ghost"
                                    value={row.status}
                                    color={row.status === "Pending" ? "amber" : row.status === "Canceled" ? "red" : "green"}
                                />
                            </td>
                            <td className="p-4 text-blue-gray-700">{row.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
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

export default ItemsTable;
