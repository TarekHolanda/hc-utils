"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

import SignInButton from "./SignInButton";
import { MyTooltip } from "../components/MyTooltip";
import { MyDrawer } from "./MyDrawer";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(",");
const SUPER_ADMIN_EMAILS = process.env.SUPER_ADMIN_EMAILS.split(",");
const DEV_EMAILS = process.env.DEV_EMAILS.split(",");

const getLoginButton = (status, toggleDrawer) => {
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
                <MyTooltip title="Menu" placement="left">
                    <IconButton
                        aria-label="open menu"
                        style={{ color: "#fff" }}
                        onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </MyTooltip>
            );
        default:
            return <SignInButton />;
    }
};

const pages = {
    "/": "HC Utils",
    "/employee-generator": "HC Utils - Employee Generator",
    "/scan-and-go": "HC Utils - Scan & Go",
    "/email-signature": "HC Utils - Email Signature",
    "/sprint": "HC Utils - Sprint View",
    "/resources": "HC Utils - Resources",
    "/customer-xray": "HC Utils - Customer X-Ray",
    "/github": "HC Utils - GitHub View",
};

const Header = () => {
    const currentPage = usePathname();
    const { theme, resolvedTheme, setTheme } = useTheme();
    const { data: session, status } = useSession();
    const userEmail = session?.user.email;
    const isAdmin = ADMIN_EMAILS.includes(userEmail);
    const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(userEmail);
    const isDev = DEV_EMAILS.includes(userEmail);
    const [drawerOpen, setdrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        setdrawerOpen(open);
    };

    const loginButton = getLoginButton(status, toggleDrawer);

    return (
        <AppBar
            position="static"
            style={{ background: "#2A63B2", width: "100vw" }}>
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
                        sx={{ flexGrow: 1, textAlign: "center" }}>
                        {pages[currentPage]}
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>{loginButton}</Box>
                </Toolbar>
            </Container>

            <Drawer
                anchor={"right"}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onClick={toggleDrawer(false)}
                ModalProps={{ disableScrollLock: true }}>
                <MyDrawer
                    resolvedTheme={resolvedTheme}
                    setTheme={setTheme}
                    isAdmin={isAdmin}
                    isSuperAdmin={isSuperAdmin}
                    isDev={isDev}
                />
            </Drawer>
        </AppBar>
    );
};

export default Header;
