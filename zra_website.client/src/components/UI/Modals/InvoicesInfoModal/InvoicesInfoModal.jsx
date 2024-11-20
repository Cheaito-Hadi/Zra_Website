import React, {useState} from "react";
import "./InvoicesInfoModal.css";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import {InformationCircleIcon} from "@heroicons/react/24/outline";

const InvoicesInfoModal = ({id, amount, date, signature, internalDate, invoiceSequence, url}) => {
    const [size, setSize] = useState(null);

    const handleOpen = (value) => setSize(value);

    return (
        <>
            <div className="flex gap-3">
                <Button
                    onClick={() => handleOpen("xs")}
                    variant="outlined"
                    size="sm"
                    color="white"
                    className="flex items-center gap-2 open-modal-btn"
                >
                    <InformationCircleIcon className="h-4 w-4"/>
                    Invoice Details
                </Button>
            </div>
            <Dialog
                open={Boolean(size)}
                size={size || "md"}
                handler={handleOpen}
                className="invoices-modal"
            >
                <DialogHeader className="modal-header">Invoice Details</DialogHeader>
                <DialogBody className="modal-body">
                    <div className="modal-details">
                        <p><strong>ID:</strong> {id}</p>
                        <p><strong>Amount:</strong> {amount}</p>
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Signature:</strong> {signature}</p>
                        <p><strong>Internal Date:</strong> {internalDate}</p>
                        <p><strong>Invoice Sequence:</strong> {invoiceSequence}</p>
                        <p><strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
                    </div>
                </DialogBody>
                <DialogFooter className="modal-footer">
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpen(null)}
                        className="cancel-btn"
                    >
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default InvoicesInfoModal;
