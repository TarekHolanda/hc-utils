"use client";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const MyLoading = ({ loading }) => {
    return loading ? (
        <Backdrop open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    ) : null;
};
