"use client";

import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import FilePresentIcon from "@mui/icons-material/FilePresent";

const actions = {
    "scan-and-go": [
        {
            icon: (
                <Link
                    href={
                        "https://www.notion.so/heavyconnect/Scan-Go-3f275f153ad143f88fa06aa95bb63bff?pvs=4"
                    }
                    target="_blank"
                >
                    <QuestionMarkIcon sx={{ verticalAlign: "middle" }} />
                </Link>
            ),
            name: "Documentation",
        },
        {
            icon: <FilePresentIcon />,
            icon: (
                <Link
                    href={
                        "https://docs.google.com/spreadsheets/d/1svR9ILotvQVPXmA3mS_wnK8JAn5RQ2zreAvnY4u09n8"
                    }
                    target="_blank"
                >
                    <FilePresentIcon sx={{ verticalAlign: "middle" }} />
                </Link>
            ),
            name: "Sample File",
        },
    ],
};

export const MySpeedDial = ({ page }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(!open);

    return (
        <Box>
            <Backdrop open={open} onClick={handleClick} />
            <SpeedDial
                ariaLabel="SpeedDial"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={handleClick}
                open={open}
                direction="left"
            >
                {actions[page].map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClick}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
};
