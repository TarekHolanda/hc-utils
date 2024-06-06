"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";

import { MyLoadingPage } from "../components/MyLoadingPage";
import { MySpacer } from "../components/MySpacer";
import { GithubActionBar } from "./GithubActionBar";
import { getPullRequests } from "./getPullRequests";
import { GithubTable } from "./GithubTable";
import { sortDictKeys } from "../utils/sortDictKeys";

const loadingStatus = {
    1: "Loading PRs from the PDF...",
    2: "Loading PRs from the App...",
    3: "Loading PRs from the Dashboard...",
    4: "Loading PRs from the API...",
};

const StyledLinerProgress = styled(LinearProgress)(({ theme }) => ({
    height: "16px",
    borderRadius: 4,
}));

function MyLoadingBar(props) {
    return (
        <Box>
            <MySpacer />

            <Box className="width-100">
                <StyledLinerProgress variant="determinate" {...props} />
            </Box>

            <MySpacer />

            <Box className="text-center">
                <Typography
                    variant="h6"
                    color="text.primary"
                    className="white-space-pre-line">
                    {"This will take a minute\n"}
                    {Math.round(props.value) < 25
                        ? loadingStatus[1]
                        : Math.round(props.value) < 50
                        ? loadingStatus[2]
                        : Math.round(props.value) < 75
                        ? loadingStatus[3]
                        : loadingStatus[4]}
                    {`\n${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export default function Page({ data }) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [loadingPRs, setLoadingPRs] = useState(true);
    const [progress, setProgress] = useState(1);
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [startDate, setStartDate] = useState(
        new Date(
            new Date().setDate(new Date().getDate() - 14)
        ).toLocaleDateString("en-CA")
    );
    const [endDate, setEndDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    const [devs, setDevs] = useState({});
    const sortedDevs = sortDictKeys(devs, sortField, sortOrder);

    useEffect(() => {
        handleGetPullRequests();
    }, []);

    const handleGetPullRequests = () => {
        setLoading(false);
        setLoadingPRs(true);
        setProgress(1);
        getPullRequests(startDate, endDate, setProgress)
            .then((developers) => {
                console.log(developers);
                setDevs(developers);
                setLoading(false);
                setLoadingPRs(false);
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false);
                setLoadingPRs(false);
            });
    };

    if (status === "loading" || loading) {
        return <MyLoadingPage />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    return (
        <>
            <Container>
                <GithubActionBar
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    handleGetPullRequests={handleGetPullRequests}
                    loadingPRs={loadingPRs}
                />

                <MySpacer vertical size={32} />

                <GithubTable
                    devs={devs}
                    sortedDevs={sortedDevs}
                    handleSort={handleSort}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    loadingPRs={loadingPRs}
                />

                <MySpacer vertical size={32} />

                <Zoom in={loadingPRs} mountOnEnter unmountOnExit>
                    <Box>{loadingPRs && <MyLoadingBar value={progress} />}</Box>
                </Zoom>
            </Container>
        </>
    );
}
