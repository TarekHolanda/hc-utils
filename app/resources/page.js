"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(",");
const SUPER_ADMIN_EMAILS = process.env.SUPER_ADMIN_EMAILS.split(",");
const DEV_EMAILS = process.env.DEV_EMAILS.split(",");

const resources = [
    {
        name: "Sprint Review Slides",
        url: "https://docs.google.com/presentation/d/1SByYv3UQu6sU9yzHbiBgNFd30StNDDZdEHgtTW-nxg0",
    },
    {
        name: "Product Release Report",
        url: "https://docs.google.com/presentation/d/1BnQDkOBFI3K1zLUUzQ5u_KwWspVTmy5Z1QuUCSg-QOQ",
    },
    {
        name: "App Center",
        url: "https://appcenter.ms/orgs/HeavyConnect/applications",
    },
    {
        name: "HC Utils API",
        url: "https://hc-utils-api.herokuapp.com",
    },
    {
        name: "Tutorial Videos",
        url: "https://docs.google.com/document/d/1B9nO872-6GvHbkp0Fx6DGbVEFQgFP4piggrpHePG8kc",
    },
    {
        name: "Trello Design Tasks",
        url: "https://trello.com/b/Lk6ChqsA/product-discovery-design",
    },
    {
        name: "Internal Classes",
        url: "https://drive.google.com/drive/folders/1lZR4Bj2ZNmx_HmzUrYlaDJg_9prAZodm",
    },
    {
        name: "Vacation Schedule",
        url: "https://docs.google.com/spreadsheets/d/1dMaoiWvbwVvASPoE_0rf-MvAia3Jlt4TIK-DhYMrZ6A",
    },
    {
        name: "Birthdays BR Team",
        url: "https://docs.google.com/spreadsheets/d/1BKijXhYXUqRHhpq_j4lp3TUTooKTTrZAjk6jE601fWI",
    },
    {
        name: "Open API",
        url: "https://api.heavyconnect.com/doc/v1/",
    },
    {
        name: "Days Off BR Team",
        url: "https://docs.google.com/spreadsheets/d/1yVBpZ6QCLkA7frNdrTW69o5NZ3jCZ10YFeCi44CRulM",
    },
    {
        name: "NPS Responses",
        url: "https://docs.google.com/spreadsheets/d/1wdwVUhmHYH9fCVrcac50YdGBcpMXFQXnfovfu_9GwGw",
    },
    {
        name: "NPS X-Ray",
        url: "https://docs.google.com/spreadsheets/d/1YUWY_2Bm4SHnSXXdH6IIHn1DbrQwJZtNQjMFPGkyKKY",
    },
];

const resourcesAdmin = [
    {
        name: "Customers X-Ray",
        url: "https://docs.google.com/spreadsheets/d/1EepbeQe4_65qSNOkTD8VbPAZdAQMeOvTaJ-Zy596d-0",
    },
];

const resourcesSuperAdmin = [
    {
        name: "US Trip Guidelines",
        url: "https://docs.google.com/document/d/1oRu-2zExERayNVFTtBULTgRrwW4zARzEjCMn7y12WLg",
    },
    {
        name: "All Hands Template",
        url: "https://docs.google.com/presentation/d/1id2sqNo4ezvvo9T6B3wi5kQVAjcvR_QWj96BFUVRQMo",
    },
];

const resourcesDev = [];

const MyResourcesGrid = ({ title, resources }) => {
    return (
        <>
            <Typography variant="h5">{title}</Typography>
            <Divider />
            <MySpacer />

            <Grid container spacing={2}>
                {resources.map((resource) => (
                    <Grid
                        item
                        xs={1} // 0 to 600
                        sm={1} // 600 to 900
                        md={1} // 900 to 1200
                        lg={1} // 1200 to 1536
                        xl={1} // 1536px and up
                        className="display-flex justify-center"
                        minWidth={"144px"}
                        minHeight={"144px"}
                        key={resource.name + " grid"}
                    >
                        <Link target="_blank" href={resource.url}>
                            <Card
                                className="pointer text-center height-100"
                                elevation={6}
                            >
                                <CardActionArea className="height-100">
                                    <CardContent>
                                        <Typography variant="h6">
                                            {resource.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default function Page() {
    const { data: session, status } = useSession();
    const userEmail = session?.user.email;
    const isAdmin = ADMIN_EMAILS.includes(userEmail);
    const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(userEmail);
    const isDev = DEV_EMAILS.includes(userEmail);

    if (status === "loading") {
        return <MyLoading loading={true} />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    return (
        <Box className="padding-1rem">
            <MyResourcesGrid
                title="General - Links & Tools"
                resources={resources}
            />

            <MySpacer size={48} />

            {isAdmin && (
                <MyResourcesGrid
                    title="Admin - Links & Tools"
                    resources={resourcesAdmin}
                />
            )}

            <MySpacer size={48} />

            {isSuperAdmin && (
                <MyResourcesGrid
                    title="Super Admin - Links & Tools"
                    resources={resourcesSuperAdmin}
                />
            )}

            <MySpacer size={48} />

            {isDev && (
                <MyResourcesGrid
                    title="Dev - Links & Tools"
                    resources={resourcesDev}
                />
            )}
        </Box>
    );
}
