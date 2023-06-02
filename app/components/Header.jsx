"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import SignInButton from "./SignInButton";
import { MyTooltip } from "./MyTooltip";

const Header = () => {
    const { data: session } = useSession();

    return (
        <AppBar position="static" style={{ background: "#2A63B2" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="HeavyConnect">
                            <a href="/">
                                <img
                                    src="/hc-icon-white.png"
                                    className="logo"
                                    alt="HC logo"
                                    width={64}
                                />
                            </a>
                        </Tooltip>
                    </Box>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        style={{ textAlign: "center" }}
                    >
                        HC Utils
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        {session ? (
                            <MyTooltip title="Sign out" placement="left">
                                <IconButton
                                    aria-label="sign out"
                                    style={{ color: "#fff" }}
                                    onClick={() => signOut()}
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </MyTooltip>
                        ) : (
                            <SignInButton />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
