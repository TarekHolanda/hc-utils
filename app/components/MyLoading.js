"use client";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const MyLoading = (
    <main>
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </main>
);
