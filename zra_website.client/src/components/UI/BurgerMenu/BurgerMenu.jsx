import React from "react";
import { useNavigate } from "react-router-dom";
import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Drawer,
    Card,
} from "@material-tailwind/react";
import {
    DocumentChartBarIcon,
    DocumentDuplicateIcon,
    CubeIcon,
    BuildingOffice2Icon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import companyLogoBlack from "../../../assets/SVGs/LamasatLogo-Black.svg";

export function SidebarWithBurgerMenu() {
    const [open, setOpen] = React.useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const handleNavigation = (path) => {
        navigate(path);
        closeDrawer();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");

        navigate("/", { replace: true });
        closeDrawer();
    };

    return (
        <>
            <IconButton variant="text" size="lg" onClick={openDrawer} color="black">
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2" />
                )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <Card
                    color="transparent"
                    shadow={false}
                    className="h-[calc(100vh-2rem)] w-full p-4"
                >
                    <div className="mb-2 flex items-center gap-4 p-2">
                        <img src={companyLogoBlack} alt="Company Logo" className="logo-burger" />
                    </div>
                    <hr className="my-2 border-blue-gray-100" />
                    <List>
                        <ListItem onClick={() => handleNavigation('/dashboard')}>
                            <ListItemPrefix>
                                <DocumentChartBarIcon className="h-5 w-5" color="blue-gray" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>

                        <Accordion
                            open={open === 2}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                                        }`}
                                    color="blue-gray"
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 2}>
                                <AccordionHeader
                                    onClick={() => handleOpen(2)}
                                    className="border-b-0 p-3"
                                >
                                    <ListItemPrefix>
                                        <DocumentDuplicateIcon className="h-5 w-5" color="blue-gray" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Invoices
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <ListItem onClick={() => handleNavigation('/processed-invoices')}>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" color="blue-gray" />
                                        </ListItemPrefix>
                                        Processed Invoices
                                    </ListItem>
                                    <ListItem onClick={() => handleNavigation('/failed-invoices')}>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" color="blue-gray" />
                                        </ListItemPrefix>
                                        Failed Invoices
                                    </ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <ListItem onClick={() => handleNavigation('/items-management')}>
                            <ListItemPrefix>
                                <CubeIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Items Management
                        </ListItem>
                        <ListItem onClick={() => handleNavigation('/branches')}>
                            <ListItemPrefix>
                                <BuildingOffice2Icon className="h-5 w-5" />
                            </ListItemPrefix>
                            Branches
                        </ListItem>

                        <hr className="my-2 border-blue-gray-100" />

                        <ListItem onClick={handleLogout}>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" color="red" />
                            </ListItemPrefix>
                            <Typography color="red">Logout</Typography>
                        </ListItem>
                    </List>
                </Card>
            </Drawer>
        </>
    );
}
