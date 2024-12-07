import { Close } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import AddAddress from "./AddAddress";

const AddressManagement = ({
    addresses,
    onAddAddress,
    onSetDefaultAddress,
    onRemoveAddress,
}) => {
    const [open, setOpen] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(
        addresses.find((addr) => addr.isDefault)?.id || "",
    );
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDefaultAddressChange = (event) => {
        const selectedId = event.target.value;
        setDefaultAddress(selectedId);
        onSetDefaultAddress(selectedId);

        // Update selected address to display its contact info
        const selectedAddr = addresses.find((addr) => addr.id === selectedId);
        setSelectedAddress(selectedAddr);
    };

    const handleRemoveAddress = (e, id) => {
        e.stopPropagation();
        onRemoveAddress(id);
    };

    return (
        <div>
            <Typography variant="h6">Address management</Typography>

            <Typography variant="subtitle1">Select default address</Typography>
            <Select
                value={defaultAddress}
                onChange={handleDefaultAddressChange}
                fullWidth
            >
                {addresses.map((addr) => (
                    <MenuItem
                        key={addr.id}
                        value={addr.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span>
                            {addr.detail} {addr.isDefault ? "(Default)" : ""}
                        </span>
                        {!addr.isDefault && (
                            <IconButton
                                onClick={(e) => handleRemoveAddress(e, addr.id)}
                                size="small"
                            >
                                <Close />
                            </IconButton>
                        )}
                    </MenuItem>
                ))}
            </Select>

            {/* Hiển thị thông tin liên hệ của địa chỉ đã chọn */}
            {selectedAddress && (
                <div style={{ marginTop: "20px" }}>
                    <Typography variant="subtitle1">
                        Contact Information
                    </Typography>
                    <Typography variant="body2">
                        <strong>Name:</strong> {selectedAddress.contactName}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Phone:</strong> {selectedAddress.contactPhone}
                    </Typography>
                </div>
            )}

            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "1.25em" }}
                onClick={handleClickOpen}
            >
                Add new address
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add new address</DialogTitle>
                <DialogContent>
                    <AddAddress
                        onAddAddress={onAddAddress}
                        onClose={handleClose}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddressManagement;