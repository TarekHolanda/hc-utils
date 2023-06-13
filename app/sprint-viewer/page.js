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
import { Typography } from "@mui/material";

const SPRINTS = [
    {
        id: 1,
        name: "Sprint #105",
        index: 105,
        totalPoints: 24,
        pointsMerged: 10,
        tasksRisky: 4,
        tasksFive: 1,
        tasksThree: 0,
        deploysExtra: 1,
        delayed: false,
    },
    {
        id: 2,
        name: "Sprint #104",
        index: 104,
        totalPoints: 30,
        pointsMerged: 11,
        tasksRisky: 4,
        tasksFive: 1,
        tasksThree: 1,
        deploysExtra: 1,
        delayed: true,
    },
    {
        id: 3,
        name: "Sprint #103",
        index: 103,
        totalPoints: 22,
        pointsMerged: 6,
        tasksRisky: 8,
        tasksFive: 1,
        tasksThree: 1,
        deploysExtra: 0,
        delayed: true,
    },
    {
        id: 4,
        name: "Sprint #101",
        index: 101,
        totalPoints: 15,
        pointsMerged: 5,
        tasksRisky: 4,
        tasksFive: 0,
        tasksThree: 0,
        deploysExtra: 0,
        delayed: false,
    },
    {
        id: 5,
        name: "Sprint #100",
        index: 100,
        totalPoints: 35,
        pointsMerged: 25,
        tasksRisky: 8,
        tasksFive: 1,
        tasksThree: 4,
        deploysExtra: 2,
        delayed: true,
    },
];

function createData(
    index,
    totalPoints,
    pointsMerged,
    tasksRisky,
    tasksFive,
    tasksThree,
    deploysExtra,
    delayed
) {
    return {
        index,
        totalPoints,
        pointsMerged,
        tasksRisky,
        tasksFive,
        tasksThree,
        deploysExtra,
        delayed,
    };
}

const rows = [
    createData(105, 24, 10, 4, 1, 0, 1, false),
    createData(104, 30, 11, 4, 1, 1, 1, true),
    createData(103, 22, 6, 8, 1, 1, 0, false),
    createData(101, 15, 5, 4, 0, 0, 1, false),
    createData(100, 35, 25, 8, 1, 4, 2, true),
    createData(99, 35, 25, 8, 1, 4, 2, true),
    createData(98, 35, 25, 8, 1, 4, 2, true),
    createData(97, 35, 25, 8, 1, 4, 2, true),
];

const AverageRows = () => {
    var avg = {
        totalPoints: 0,
        pointsMerged: 0,
        tasksRisky: 0,
        tasksFive: 0,
        tasksThree: 0,
        deploysExtra: 0,
    };
    var avgDelay = {
        totalPoints: 0,
        pointsMerged: 0,
        tasksRisky: 0,
        tasksFive: 0,
        tasksThree: 0,
        deploysExtra: 0,
    };

    // Calculate average of data in rows and set to avg
    rows.forEach((row) => {
        if (row.delayed) {
            avgDelay.totalPoints += row.totalPoints;
            avgDelay.pointsMerged += row.pointsMerged;
            avgDelay.tasksRisky += row.tasksRisky;
            avgDelay.tasksFive += row.tasksFive;
            avgDelay.tasksThree += row.tasksThree;
            avgDelay.deploysExtra += row.deploysExtra;
        } else {
            avg.totalPoints += row.totalPoints;
            avg.pointsMerged += row.pointsMerged;
            avg.tasksRisky += row.tasksRisky;
            avg.tasksFive += row.tasksFive;
            avg.tasksThree += row.tasksThree;
            avg.deploysExtra += row.deploysExtra;
        }
    });

    avg.totalPoints = (avg.totalPoints / rows.length).toFixed(1);
    avg.pointsMerged = (avg.pointsMerged / rows.length).toFixed(1);
    avg.tasksRisky = (avg.tasksRisky / rows.length).toFixed(1);
    avg.tasksFive = (avg.tasksFive / rows.length).toFixed(1);
    avg.tasksThree = (avg.tasksThree / rows.length).toFixed(1);
    avg.deploysExtra = (avg.deploysExtra / rows.length).toFixed(1);

    avgDelay.totalPoints = (avgDelay.totalPoints / rows.length).toFixed(1);
    avgDelay.pointsMerged = (avgDelay.pointsMerged / rows.length).toFixed(1);
    avgDelay.tasksRisky = (avgDelay.tasksRisky / rows.length).toFixed(1);
    avgDelay.tasksFive = (avgDelay.tasksFive / rows.length).toFixed(1);
    avgDelay.tasksThree = (avgDelay.tasksThree / rows.length).toFixed(1);
    avgDelay.deploysExtra = (avgDelay.deploysExtra / rows.length).toFixed(1);

    return (
        <>
            <TableRow key={"average-on-time"} sx={{ backgroundColor: "blue" }}>
                <TableCell component="th" scope="row" align="center">
                    On Time Average
                </TableCell>
                <TableCell align="center">{avg.totalPoints}</TableCell>
                <TableCell align="center">
                    {(avg.totalPoints - avg.pointsMerged).toFixed(1)}
                </TableCell>
                <TableCell align="center">{avg.pointsMerged}</TableCell>
                <TableCell align="center">{avg.tasksRisky}</TableCell>
                <TableCell align="center">{avg.tasksFive}</TableCell>
                <TableCell align="center">{avg.tasksThree}</TableCell>
                <TableCell align="center">{avg.deploysExtra}</TableCell>
            </TableRow>
            <TableRow key={"average-delayed"} sx={{ backgroundColor: "red" }}>
                <TableCell component="th" scope="row" align="center">
                    Delayed Average
                </TableCell>
                <TableCell align="center">{avgDelay.totalPoints}</TableCell>
                <TableCell align="center">
                    {(avgDelay.totalPoints - avgDelay.pointsMerged).toFixed(1)}
                </TableCell>
                <TableCell align="center">{avgDelay.pointsMerged}</TableCell>
                <TableCell align="center">{avgDelay.tasksRisky}</TableCell>
                <TableCell align="center">{avgDelay.tasksFive}</TableCell>
                <TableCell align="center">{avgDelay.tasksThree}</TableCell>
                <TableCell align="center">{avgDelay.deploysExtra}</TableCell>
            </TableRow>
        </>
    );
};

export default function Page() {
    const { data: session, status } = useSession();
    const [sprints, setSprints] = useState([]);

    // Get list of sprints from API
    useEffect(() => {
        // fetch("http://localhost:8000/hc/test")
        fetch("http://127.0.0.1:8000/hc/test")
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== 404) {
                    // Showw toast error
                    console.log("Deu ruim!!!");
                    console.log(data);
                }

                console.log("Deu bom!!!");
                console.log(data);
                // setSprints(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    // console.log(sprints);

    if (status === "loading") {
        return <>{MyLoading}</>;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    // redirect("/");

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "black" }}>
                            <TableCell align="center">Sprint Number</TableCell>
                            <TableCell align="center">Total Points</TableCell>
                            <TableCell align="center">Merged</TableCell>
                            <TableCell align="center">Points Left</TableCell>
                            <TableCell align="center">Risky</TableCell>
                            <TableCell align="center">5 Points</TableCell>
                            <TableCell align="center">3 Points</TableCell>
                            <TableCell align="center">Deploys</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <AverageRows />

                        {rows.map((row, index) => (
                            <TableRow
                                key={row.index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                    ...(index === 0 && {
                                        backgroundColor: "green",
                                    }),
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    #{row.index}{" "}
                                    {index === 0 && <span>(current)</span>}
                                </TableCell>
                                <TableCell align="center">
                                    {row.totalPoints}
                                </TableCell>
                                <TableCell align="center">
                                    {row.totalPoints - row.pointsMerged}
                                </TableCell>
                                <TableCell align="center">
                                    {row.pointsMerged}
                                </TableCell>
                                <TableCell align="center">
                                    {row.tasksRisky}
                                </TableCell>
                                <TableCell align="center">
                                    {row.tasksFive}
                                </TableCell>
                                <TableCell align="center">
                                    {row.tasksThree}
                                </TableCell>
                                <TableCell align="center">
                                    {row.deploysExtra}
                                </TableCell>
                            </TableRow>
                        ))}
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
