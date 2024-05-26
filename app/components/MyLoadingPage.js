"use client";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const MyLoadingPage = () => {
    return (
        <Backdrop open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
