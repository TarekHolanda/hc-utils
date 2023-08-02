import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";

export const XrayActionBar = ({
    months,
    setMonths,
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
            <TextField
                select
                label="Date Range"
                value={months}
                onChange={(event) => {
                    setMonths(event.target.value);
                }}
                sx={{
                    width: "25%",
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
            <Box></Box>
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                type="search"
                value={search}
                sx={{
                    width: "50%",
                }}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleGetCustomers();
                    }
                }}
            />
            <IconButton
                aria-label="sync"
                size="large"
                onClick={handleGetCustomers}
                sx={{ float: "right" }}
            >
                <SyncIcon fontSize="inherit" />
            </IconButton>
        </Box>
    );
};
