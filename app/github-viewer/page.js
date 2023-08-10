"use client";

import React, { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";
import { handleGet } from "../api/handleCallAPI";
import { getPullRequestsAndReviews } from "./getPullRequestsAndReviews";
import { set } from "date-fns";

export default function Page() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        getPullRequestsAndReviews()
            .then((developers) => {
                console.log(developers);
                setDevelopers(developers);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error.message);
                setLoading(false);
            });
    }, []);

    if (status === "loading" || loading) {
        return <MyLoading loading={true} />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    return (
        <>
            <Container>
                <MySpacer vertical size={64} />

                <Typography variant="h4" component="h1" gutterBottom>
                    GitHub Viewer
                </Typography>

                <MySpacer vertical size={64} />

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {/* Loop on dict of developers where the key is their name */}
                    {Object.keys(developers).map((developer) => {
                        return (
                            <Box
                                key={developer}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{ width: 200 }}
                                >
                                    {developer}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{ width: 200 }}
                                >
                                    {developers[developer].pullRequests}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{ width: 200 }}
                                >
                                    {developers[developer].approvals}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Container>
        </>
    );
}
