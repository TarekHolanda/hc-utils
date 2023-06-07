"use client";

import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function Transition(props) {
    return <Slide {...props} direction="down" />;
}
function MyToast(props) {
    console.log("Chama");
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const hideToast = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            onClick={() => hideToast(false)}
            severity="warning"
            className="pointer"
            // anchorOrigin={{
            //     vertical: { props.vertical },
            //     horizontal: { props.horizontal },
            // }}
            TransitionComponent={Transition}
        >
            <Alert severity="warning">{props.message}</Alert>
        </Snackbar>
    );
}
