import React from "react";

import Box from "@mui/material/Box";
import SyncIcon from "@mui/icons-material/Sync";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box>
                    <DatePicker
                        label="Start Date"
                        defaultValue={dayjs(startDate)}
                        className="width-256"
                        maxDate={dayjs(endDate)}
                        disabled={loadingPRs}
                        onChange={(newValue) => {
                            setStartDate(newValue.format("YYYY-MM-DD"));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <MySpacer size={16} horizontal />

                    <DatePicker
                        label="End Date"
                        defaultValue={dayjs(endDate)}
                        className="width-256"
                        minDate={dayjs(startDate)}
                        disabled={loadingPRs}
                        onChange={(newValue) => {
                            setEndDate(newValue.format("YYYY-MM-DD"));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
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
            </LocalizationProvider>
        </Box>
    );
};
