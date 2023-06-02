"use client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockPersonIcon from "@mui/icons-material/LockPerson";

export const Unauthenticated = (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            padding: "2rem",
            flexWrap: "wrap",
            "& > :not(style)": {
                m: 1,
                width: 256,
                height: 256,
            },
        }}
    >
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                flexFlow: "column",
            }}
        >
            <h3 sx={{ flexGrow: 3 }}>You need to sign in first.</h3>
            <div
                sx={{
                    flexBasis: "100%",
                    width: "0px",
                    height: "0px",
                    overflow: "hidden",
                }}
            ></div>
            <LockPersonIcon sx={{ fontSize: 64 }} />
        </Paper>
    </Box>
);
