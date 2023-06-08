"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

import SignInButton from "../core/SignInButton";
import { MyTooltip } from "./MyTooltip";

const getLoginButton = (status) => {
    switch (status) {
        case "loading":
            return (
                <Skeleton
                    animation="wave"
                    variant="circular"
                    width={44}
                    height={44}
                />
            );
        case "authenticated":
            return (
                <MyTooltip title="Sign out" placement="left">
                    <IconButton
                        aria-label="sign out"
                        style={{ color: "#fff" }}
                        onClick={() => signOut()}
                    >
                        <LogoutIcon />
                    </IconButton>
                </MyTooltip>
            );
        default:
            return <SignInButton />;
    }
};

const MyHeader = () => {
    const { data: session, status } = useSession();

    const loginButton = getLoginButton(status);

    return (
        <AppBar position="static" style={{ background: "#2A63B2" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0 }}>
                        <Link href="/">
                            <img
                                src="/hc-icon-white.png"
                                className="logo"
                                alt="HC logo"
                                width={64}
                            />
                        </Link>
                    </Box>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: "center" }}
                    >
                        HC Utils
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>{loginButton}</Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default MyHeader;
