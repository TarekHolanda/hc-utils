import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SyncIcon from "@mui/icons-material/Sync";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";

import { MySpacer } from "../components/MySpacer";
import { MyIconButton } from "../components/MyIconButton";

export const XrayActionBar = ({
    filterMonths,
    filterStatus,
    filterNoMrr,
    setFilterMonths,
    setFilterStatus,
    setFilterNoMrr,
    search,
    setSearch,
    handleGetCustomers,
}) => {
    return (
        <Box
            component="form"
            autoComplete="off"
            size="small"
            className="display-flex justify-space-between padding-top-2rem padding-bottom-1rem">
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
                    SelectProps={{ MenuProps: { disableScrollLock: true } }}>
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
                    SelectProps={{ MenuProps: { disableScrollLock: true } }}>
                    <MenuItem value={""}>All</MenuItem>
                    <MenuItem value={1}>Good</MenuItem>
                    <MenuItem value={2}>Onboarding</MenuItem>
                    <MenuItem value={3}>Churn</MenuItem>
                    <MenuItem value={4}>Inactive</MenuItem>
                    <MenuItem value={5}>Low Risk</MenuItem>
                    <MenuItem value={6}>Medium Risk</MenuItem>
                    <MenuItem value={7}>High Risk</MenuItem>
                </TextField>

                <MySpacer size={16} horizontal />

                <FormControlLabel
                    control={
                        <Switch
                            checked={filterNoMrr}
                            onChange={(event) => {
                                setFilterNoMrr(event.target.checked);
                            }}
                        />
                    }
                    label="Filter No MRR"
                    labelPlacement="top"
                />
            </Box>

            <Box>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="search-customer">Search...</InputLabel>
                    <OutlinedInput
                        id="search-customer"
                        type={"search"}
                        label="Search"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleGetCustomers();
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <MySpacer size={16} horizontal />

                <MyIconButton
                    color="primary"
                    onClick={handleGetCustomers}
                    size="large">
                    <SyncIcon fontSize="inherit" />
                </MyIconButton>
            </Box>
        </Box>
    );
};
