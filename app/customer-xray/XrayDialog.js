"use client";

import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export const XrayDialog = ({
    dialogOpen,
    customer,
    loading,
    loadingDialog,
    handleSetCustomer,
    handleCloseDialog,
    handleUpdateCustomer,
}) => {
    console.log("XrayDialog", customer);
    return (
        <Dialog open={dialogOpen}>
            <FormControl>
                <DialogTitle>{customer.name}</DialogTitle>

                <Divider />

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="customer-mrr"
                        label="MRR"
                        type="number"
                        fullWidth
                        variant="outlined"
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                        value={customer.mrr}
                        onChange={(event) => {
                            handleSetCustomer(
                                parseInt(event.target.value) || "",
                                "mrr"
                            );
                        }}
                        disabled={loading}
                    />

                    <TextField
                        select
                        margin="dense"
                        id="customer-status"
                        label="Status"
                        fullWidth
                        variant="outlined"
                        value={customer.status}
                        onChange={(event) => {
                            handleSetCustomer(event.target.value, "status");
                        }}
                        disabled={loading}
                    >
                        <MenuItem value={"good"}>Good</MenuItem>
                        <MenuItem value={"onboarding"}>Onboarding</MenuItem>
                        <MenuItem value={"low-risk"}>Low Risk</MenuItem>
                        <MenuItem value={"medium-risk"}>Medium Risk</MenuItem>
                        <MenuItem value={"high-risk"}>High Risk</MenuItem>
                        <MenuItem value={"churn"}>Churn</MenuItem>
                        <MenuItem value={"inactive"}>Inactive</MenuItem>
                    </TextField>

                    <TextField
                        margin="dense"
                        id="customer-comment"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={customer.comment}
                        multiline
                        rows={3}
                        onChange={(event) => {
                            handleSetCustomer(event.target.value, "comment");
                        }}
                        disabled={loading}
                    />
                </DialogContent>

                <Divider />

                {loadingDialog ? (
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={58.25}
                    />
                ) : (
                    <DialogActions>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleCloseDialog}
                            className="width-128"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleUpdateCustomer}
                            className="width-128"
                        >
                            Save
                        </Button>
                    </DialogActions>
                )}
            </FormControl>
        </Dialog>
    );
};
