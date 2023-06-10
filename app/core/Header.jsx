"use client";

import React, { useState } from "react";
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
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import QrCodeIcon from "@mui/icons-material/QrCodeScanner";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { usePathname } from "next/navigation";

import SignInButton from "./SignInButton";
import { MyTooltip } from "../components/MyTooltip";

const drawerList = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/",
    },
    {
        title: "Employee Generator",
        icon: <BadgeIcon />,
        link: "/employee-generator",
    },
    {
        title: "Scan & Go",
        icon: <QrCodeIcon />,
        link: "/scan-and-go",
    },
    {
        title: "Email Signature",
        icon: <ContactMailIcon />,
        link: "/email-signature",
    },
];

const MyDrawer = (
    <Box sx={{ width: 256 }} role="presentation">
        <List>
            {drawerList.map((item, index) => (
                <Link href={item.link} key={item.title + index}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}
        </List>

        <Divider />

        <List>
            <ListItem key={"signout"} disablePadding>
                <ListItemButton onClick={() => signOut()}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Sign out"} />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
);

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
                        onClick={toggleDrawer(true)}
                    >
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
};

const Header = () => {
    const currentPage = usePathname();

    const { data: session, status } = useSession();
    const [drawerOpen, setdrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        console.log(open);
        setdrawerOpen(open);
    };

    const loginButton = getLoginButton(status, toggleDrawer);

    return (
        <AppBar
            position="static"
            style={{ background: "#2A63B2", width: "100vw" }}
        >
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
            >
                {MyDrawer}
            </Drawer>
        </AppBar>
    );
};

export default Header;
