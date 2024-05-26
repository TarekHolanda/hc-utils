"use client";

import React from "react";
import { signOut } from "next-auth/react";

import BadgeIcon from "@mui/icons-material/Badge";
import Box from "@mui/material/Box";
import BrightnessIcon from "@mui/icons-material/BrightnessHigh";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import QrCodeIcon from "@mui/icons-material/QrCodeScanner";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import GitHubIcon from "@mui/icons-material/GitHub";

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
    {
        title: "Sprint View",
        icon: <QueryStatsIcon />,
        link: "/sprint",
    },
    {
        title: "Resources",
        icon: <HomeRepairServiceIcon />,
        link: "/resources",
    },
];

const adminList = [
    {
        title: "Customer X-Ray",
        icon: <AutoGraphIcon />,
        link: "/customer-xray",
    },
];

const superAdminList = [
    {
        title: "GitHub View",
        icon: <GitHubIcon />,
        link: "/github",
    },
];

const devList = [];

export const MyDrawer = ({
    resolvedTheme,
    setTheme,
    isAdmin,
    isSuperAdmin,
    isDev,
}) => {
    return (
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

                {isAdmin &&
                    adminList.map((item, index) => (
                        <Link href={item.link} key={item.title + index}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}

                {isSuperAdmin &&
                    superAdminList.map((item, index) => (
                        <Link href={item.link} key={item.title + index}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}

                {isDev &&
                    devList.map((item, index) => (
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
                <ListItem key={"theme-toggle"} disablePadding>
                    {resolvedTheme === "light" && (
                        <ListItemButton onClick={() => setTheme("dark")}>
                            <ListItemIcon>
                                <DarkModeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Dark Mode"} />
                        </ListItemButton>
                    )}

                    {resolvedTheme !== "light" && (
                        <ListItemButton onClick={() => setTheme("light")}>
                            <ListItemIcon>
                                <BrightnessIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Light Mode"} />
                        </ListItemButton>
                    )}
                </ListItem>
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
};
