"use client";

import React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import SyncIcon from "@mui/icons-material/Sync";

import { MySpacer } from "../components/MySpacer";

export const SprintsActionBar = ({
    sprintsAmount,
    setSprintsAmount,
    handleGetSprints,
}) => {
    return (
        <Box className="display-flex justify-center padding-1rem align-center">
            <FormControl sx={{ width: 256 }}>
                <InputLabel id="sprints-amount-label">
                    Sprints Amount
                </InputLabel>
                <Select
                    labelId="sprints-amount-label"
                    id="sprints-amount"
                    value={sprintsAmount}
                    input={<OutlinedInput label="Sprints Amount" />}
                    onChange={(event) => {
                        setSprintsAmount(event.target.value);
                    }}
                >
                    <MenuItem value={"10"}>5 each</MenuItem>
                    <MenuItem value={"20"}>10 each</MenuItem>
                    <MenuItem value={"30"}>15 each</MenuItem>
                    <MenuItem value={"40"}>20 each</MenuItem>
                    <MenuItem value={"0"}>All Sprints</MenuItem>
                </Select>
            </FormControl>

            <MySpacer size={16} horizontal />

            <IconButton
                aria-label="sync"
                size="large"
                onClick={handleGetSprints}
            >
                <SyncIcon fontSize="inherit" />
            </IconButton>
        </Box>
    );
};
