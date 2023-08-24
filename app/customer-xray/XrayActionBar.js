import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";

import { MySpacer } from "../components/MySpacer";

export const XrayActionBar = ({
    filterMonths,
    setFilterMonths,
    filterStatus,
    setFilterStatus,
    search,
    setSearch,
    handleGetCustomers,
}) => {
    return (
        <Box
            component="form"
            autoComplete="off"
            size="small"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "2rem",
                paddingBottom: "1rem",
            }}
        >
            <Box>
                <TextField
                    select
                    id="date-range"
                    label="Date Range"
                    value={filterMonths}
                    className="width-128"
                    onChange={(event) => {
                        setFilterMonths(event.target.value);
                    }}
                    SelectProps={{ MenuProps: { disableScrollLock: true } }}
                >
                    <MenuItem value={1}>1 month</MenuItem>
                    <MenuItem value={2}>2 months</MenuItem>
                    <MenuItem value={3}>3 months</MenuItem>
                    <MenuItem value={4}>4 months</MenuItem>
                    <MenuItem value={6}>6 months</MenuItem>
                    <MenuItem value={12}>12 months</MenuItem>
                    <MenuItem value={18}>18 months</MenuItem>
                    <MenuItem value={24}>24 months</MenuItem>
                </TextField>

                <MySpacer size={16} horizontal />

                <TextField
                    select
                    id="status"
                    label="Status"
                    value={filterStatus}
                    className="width-256"
                    onChange={(event) => {
                        setFilterStatus(event.target.value);
                    }}
                    SelectProps={{ MenuProps: { disableScrollLock: true } }}
                >
                    <MenuItem value={""}>All</MenuItem>
                    <MenuItem value={1}>Good</MenuItem>
                    <MenuItem value={2}>Onboarding</MenuItem>
                    <MenuItem value={3}>Churn</MenuItem>
                    <MenuItem value={4}>Inactive</MenuItem>
                    <MenuItem value={5}>Low Risk</MenuItem>
                    <MenuItem value={6}>Medium Risk</MenuItem>
                    <MenuItem value={7}>High Risk</MenuItem>
                </TextField>
            </Box>

            <Box>
                <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    type="search"
                    value={search}
                    className="width-256"
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleGetCustomers();
                        }
                    }}
                />

                <MySpacer size={16} horizontal />

                <IconButton
                    aria-label="sync"
                    size="large"
                    onClick={handleGetCustomers}
                >
                    <SyncIcon fontSize="inherit" />
                </IconButton>
            </Box>
        </Box>
    );
};
