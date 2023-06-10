"use client";

import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Fade } from "@mui/material";

const CARDS = {
    "employee-generator": {
        title: "Employee Generator",
        description: "QR Codes with Names and IDs for Employees",
        image: "./farm-worker.jpg",
    },
    "scan-and-go": {
        title: "Scan & Go",
        description:
            "QR Codes to auto populate checklists, locations, and more",
        image: "./qrcode.jpg",
    },
    "email-signature": {
        title: "Email Signature",
        description:
            "Update your email signature from our official HC Template",
        image: "./email.jpg",
    },
    "sprint-viewer": {
        title: "Sprints History",
        description:
            "Review past sprints and plan the next one. More tools coming soon!",
        // image: "./chart.jpg",
        image: "./coming-soon.jpg",
    },
};

export const MyLink = ({ path }) => {
    return (
        <Fade in={true} timeout={1000}>
            <Card className="pointer home-card">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="152"
                        image={CARDS[path].image}
                        alt={CARDS[path].title}
                    />

                    <CardContent>
                        <Typography variant="h6">
                            {CARDS[path].title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {CARDS[path].description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Fade>
    );
};
