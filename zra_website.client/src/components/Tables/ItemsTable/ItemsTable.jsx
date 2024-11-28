import React, { useState, useEffect } from "react";
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
import { requestHandler } from "../../../api/axios.js";

const ROWS_PER_PAGE = 6;
const TABLE_HEAD = ["Declaration No.", "Quantity", "HS Code", "Item Name", "Status", "Date"];

const TABS = [
    { label: "All Items", value: "all" },
    { label: "Uploaded Items", value: "uploaded" },
    { label: "Pending Items", value: "pending" },
];

const ItemsTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchItems = async () => {
        try {
            const response = await requestHandler({
                method: "GET",
                route: "/Items/AllItems",
            });
            setItems(response);
            setSuccess("Items fetched successfully.");
            setError("");
        } catch (err) {
            setError(`Error fetching items: ${err.message}`);
            setSuccess("");
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    const filteredRows = items.filter((row) => {
        const matchesTab =
            selectedTab === "all" ||
            (selectedTab === "uploaded" && row.syncStatus === "Posted") ||
            (selectedTab === "pending" && row.syncStatus !== "Posted");

        return matchesTab;
    });

    const searchedRows = filteredRows.filter((row) => {
        const declarationNo = String(row.itemClsCd);
        return declarationNo.toLowerCase().includes(searchQuery.toLowerCase());
    });


    const currentRows = searchedRows.slice(startIndex, endIndex);
    const totalPages = Math.ceil(searchedRows.length / ROWS_PER_PAGE);

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
                                                    value === "pending" ? "#f89a3c" : "transparent"
                                            : "transparent",
                                        color: selectedTab === value
                                            ? "#fff"
                                            : value === "all" ? "#2296f2" :
                                                value === "uploaded" ? "#276437" :
                                                    value === "pending" ? "#f89a3c" : "#000",
                                        border: `1px solid ${value === "all" ? "#2296f2" :
                                            value === "uploaded" ? "#276437" :
                                                value === "pending" ? "#f89a3c" : "transparent"
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
                                label="Search by Declaration No."
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
                            <tr key={row.itemCd} className="table-row-hover">
                                <td className="p-4 text-blue-gray-700">{row.itemClsCd}</td>
                                <td className="p-4 text-blue-gray-700">{row.rsdQty}</td>
                                <td className="p-4 text-blue-gray-700">{row.itemCd}</td>
                                <td className="p-4 text-blue-gray-700">{row.itemNm}</td>
                                <td className="p-4">
                                    <Chip
                                        size="sm"
                                        variant="ghost"
                                        value={row.syncStatus === "Posted" ? "Uploaded Item" : "Pending Item"}
                                        color={row.syncStatus === "Posted" ? "green" : "amber"}
                                    />
                                </td>
                                <td className="p-4 text-blue-gray-700">{new Date().toLocaleDateString()}</td>
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
