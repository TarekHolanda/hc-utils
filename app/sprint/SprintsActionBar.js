import React from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import SyncIcon from "@mui/icons-material/Sync";
import TextField from "@mui/material/TextField";

import { MySpacer } from "../components/MySpacer";
import { MyIconButton } from "../components/MyIconButton";

export const SprintsActionBar = ({
    sprintsAmount,
    setSprintsAmount,
    handleGetSprints,
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
                <MyIconButton
                    color="primary"
                    onClick={handleGetSprints}
                    size="large">
                    <SyncIcon fontSize="inherit" />
                </MyIconButton>
            </Box>
        </Box>
    );
};
