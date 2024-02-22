"use client";

import React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import SyncIcon from "@mui/icons-material/Sync";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { MySpacer } from "../components/MySpacer";

export const SprintsActionBar = ({
    sprintsAmount,
    setSprintsAmount,
    handleGetSprints,
    handleOpenRulerDialog,
}) => {
    return (
        <Box
            component="form"
            autoComplete="off"
            size="small"
            className="display-flex justify-space-between padding-top-2rem padding-bottom-1rem">
            <TextField
                select
                id="sprints-amount"
                label="Sprints Amount"
                value={sprintsAmount}
                className="width-256"
                onChange={(event) => {
                    setSprintsAmount(event.target.value);
                }}
                SelectProps={{ MenuProps: { disableScrollLock: true } }}>
                <MenuItem value={"10"}>5 each</MenuItem>
                <MenuItem value={"20"}>10 each</MenuItem>
                <MenuItem value={"30"}>15 each</MenuItem>
                <MenuItem value={"40"}>20 each</MenuItem>
                <MenuItem value={"0"}>All Sprints</MenuItem>
            </TextField>

            <MySpacer size={16} horizontal />

            <Box>
                {/* <Button
                    variant="outlined"
                    size="large"
                    onClick={handleOpenRulerDialog}>
                    Ruler
                </Button> */}

                <MySpacer size={16} horizontal />

                <IconButton
                    aria-label="sync"
                    size="large"
                    onClick={handleGetSprints}>
                    <SyncIcon fontSize="inherit" />
                </IconButton>
            </Box>
        </Box>
    );
};
