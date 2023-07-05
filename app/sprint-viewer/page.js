"use client";

import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MyLoading } from "../components/MyLoading";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { Tab, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    "&:nth-child(2)": {
        backgroundColor: theme.palette.success.dark,
    },
    "&:nth-child(3)": {
        backgroundColor: theme.palette.error.dark,
    },
    "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.primary.dark,
    },
}));

// Calculate sprints average
const calculateAverage = (sprints, name) => {
    const randomID = Math.floor(Math.random() * 10) + 1;

    const totalPoints = sprints.reduce((acc, sprint) => {
        return acc + sprint.totalPoints;
    }, 0);

    const pointsMerged = sprints.reduce((acc, sprint) => {
        return acc + sprint.pointsMerged;
    }, 0);

    const pointsLeft = sprints.reduce((acc, sprint) => {
        return acc + (sprint.totalPoints - sprint.pointsMerged);
    }, 0);

    const extraDeploys = sprints.reduce((acc, sprint) => {
        return acc + sprint.extraDeploys;
    }, 0);

    return {
        id: randomID,
        index: name,
        totalPoints: totalPoints / sprints.length,
        pointsMerged: pointsMerged / sprints.length,
        pointsLeft: pointsLeft / sprints.length,
        extraDeploys: extraDeploys / sprints.length,
    };
};

const MyRow = ({ row }) => {
    const { id, index, name, totalPoints, pointsMerged, extraDeploys } = row;

    return (
        <StyledTableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            key={id}
        >
            <TableCell align="center">{index}</TableCell>
            <TableCell align="center">{totalPoints}</TableCell>
            <TableCell align="center">{pointsMerged}</TableCell>
            <TableCell align="center">{totalPoints - pointsMerged}</TableCell>
            <TableCell align="center">{extraDeploys}</TableCell>
        </StyledTableRow>
    );
};

const MyRows = ({ sprints }) => {
    // Current Sprint
    const firstSprint = sprints[0];
    // Last Sprints not delayed
    const sprintsNotDelayed = sprints.filter(
        (sprint, index) => index !== 0 && !sprint.delayed
    );
    // Last Sprints delayed
    const sprintsDelayed = sprints.filter(
        (sprint, index) => index !== 0 && sprint.delayed
    );

    const avgSprintsNotDelayed = calculateAverage(
        sprintsNotDelayed,
        "Average Not Delayed"
    );

    const avgSprintsDelayed = calculateAverage(
        sprintsDelayed,
        "Average Delayed"
    );

    return (
        <>
            <MyRow row={firstSprint} key="current" />

            <MyRow
                row={avgSprintsNotDelayed}
                key="average not delayed"
                collapsed={sprintsNotDelayed}
            />

            <MyRow
                row={avgSprintsDelayed}
                key="average delayed"
                collapsed={sprintsDelayed}
            />

            {sprintsNotDelayed.map((sprint) => (
                <MyRow row={sprint} key={sprint.id} />
            ))}

            {sprintsDelayed.map((sprint) => (
                <MyRow row={sprint} key={sprint.id} />
            ))}
        </>
    );
};

export default function Page() {
    const { data: session, status } = useSession();
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/hc/sprints")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSprints(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
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
        <Container>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 512 }}
                    aria-label="sprints table"
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sprint #</TableCell>
                            <TableCell align="center">Total Points</TableCell>
                            <TableCell align="center">Merged</TableCell>
                            <TableCell align="center">Points Left</TableCell>
                            <TableCell align="center">Extra Deploys</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MyRows sprints={sprints} />
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

// useEffect(() => {
//     const fetchData = async () => {
//         const res = await fetch("/api/scan-and-go");
//         const json = await res.json();
//         setData(json);
//     };

//     fetchData();
// }, []);
