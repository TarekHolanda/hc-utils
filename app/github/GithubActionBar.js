import React from "react";

import Box from "@mui/material/Box";
import SyncIcon from "@mui/icons-material/Sync";
import TextField from "@mui/material/TextField";

import { MySpacer } from "../components/MySpacer";
import { MyIconButton } from "../components/MyIconButton";

export const GithubActionBar = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleGetPullRequests,
    loadingPRs,
}) => {
    return (
        <Box
            component="form"
            autoComplete="off"
            size="small"
            className="display-flex justify-space-between padding-top-2rem padding-bottom-1rem">
            <Box>
                <TextField
                    type="date"
                    id="start-date"
                    label="Start Date"
                    value={startDate}
                    className="width-256"
                    inputProps={{ max: endDate }}
                    disabled={loadingPRs}
                    onChange={(event) => {
                        setStartDate(event.target.value);
                    }}></TextField>

                <MySpacer size={16} horizontal />

                <TextField
                    type="date"
                    id="end-date"
                    label="End Date"
                    value={endDate}
                    className="width-256"
                    inputProps={{ min: startDate }}
                    disabled={loadingPRs}
                    onChange={(event) => {
                        setEndDate(event.target.value);
                    }}></TextField>
            </Box>

            <Box>
                <MyIconButton
                    color="primary"
                    onClick={handleGetPullRequests}
                    disabled={loadingPRs}
                    size="large">
                    <SyncIcon fontSize="inherit" />
                </MyIconButton>
            </Box>
        </Box>
    );
};
