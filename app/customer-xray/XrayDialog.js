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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export const XrayDialog = ({
    dialogOpen,
    customer,
    loading,
    loadingDialog,
    handleSetCustomer,
    handleCloseDialog,
    handleUpdateCustomer,
}) => {
    console.log("Call Dialog:", customer);
    return (
        <Dialog open={dialogOpen} disableScrollLock>
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
                        <MenuItem
                            value={1}
                            sx={{
                                color: (theme) =>
                                    `${theme.palette.success.main}`,
                            }}
                        >
                            Good
                        </MenuItem>
                        <MenuItem
                            value={2}
                            sx={{
                                color: (theme) => `${theme.palette.info.dark}`,
                            }}
                        >
                            Onboarding
                        </MenuItem>
                        <MenuItem
                            value={3}
                            sx={{
                                color: (theme) =>
                                    `${theme.palette.warning.light}`,
                            }}
                        >
                            Churn
                        </MenuItem>
                        <MenuItem
                            value={4}
                            sx={{
                                color: (theme) =>
                                    `${theme.palette.warning.main}`,
                            }}
                        >
                            Inactive
                        </MenuItem>
                        <MenuItem
                            value={5}
                            sx={{
                                color: (theme) => `${theme.palette.error.dark}`,
                            }}
                        >
                            Low Risk
                        </MenuItem>
                        <MenuItem
                            value={6}
                            sx={{
                                color: (theme) => `${theme.palette.error.main}`,
                            }}
                        >
                            Medium Risk
                        </MenuItem>
                        <MenuItem
                            value={7}
                            sx={{
                                color: (theme) =>
                                    `${theme.palette.error.light}`,
                            }}
                        >
                            High Risk
                        </MenuItem>
                    </TextField>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={customer.use_inspector}
                                onChange={(event) => {
                                    handleSetCustomer(
                                        event.target.checked,
                                        "use_inspector"
                                    );
                                }}
                            />
                        }
                        label="Inspector"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={customer.use_timekeeper}
                                onChange={(event) => {
                                    handleSetCustomer(
                                        event.target.checked,
                                        "use_timekeeper"
                                    );
                                }}
                            />
                        }
                        label="TimeKeeper"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={customer.use_training}
                                onChange={(event) => {
                                    handleSetCustomer(
                                        event.target.checked,
                                        "use_training"
                                    );
                                }}
                            />
                        }
                        label="Training"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={customer.use_analytics}
                                onChange={(event) => {
                                    handleSetCustomer(
                                        event.target.checked,
                                        "use_analytics"
                                    );
                                }}
                            />
                        }
                        label="Analytics"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={customer.use_selfaudit}
                                onChange={(event) => {
                                    handleSetCustomer(
                                        event.target.checked,
                                        "use_selfaudit"
                                    );
                                }}
                            />
                        }
                        label="Self Audit"
                    />

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
