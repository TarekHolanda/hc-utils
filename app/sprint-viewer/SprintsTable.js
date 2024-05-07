"use client";

import React from "react";

import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor:
            theme.palette.mode === "dark"
                ? theme.palette.action.selected
                : theme.palette.action.selected,
    },
    "&.bg-success-dark": {
        backgroundColor:
            theme.palette.mode === "dark"
                ? theme.palette.success.dark
                : theme.palette.success.light,
    },
    "&.bg-error-dark": {
        backgroundColor:
            theme.palette.mode === "dark"
                ? theme.palette.error.dark
                : theme.palette.error.light,
    },
    "&:hover": {
        cursor: "pointer",
        backgroundColor:
            theme.palette.mode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
    },
    "& span": {
        color:
            theme.palette.mode === "dark"
                ? theme.palette.error.dark
                : theme.palette.error.light,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const calculateAverage = (sprints, index) => {
    const randomID = Math.floor(Math.random() * 10) + 1;

    const total_points = sprints.reduce((acc, sprint) => {
        return acc + sprint.total_points;
    }, 0);

    const points_merged = sprints.reduce((acc, sprint) => {
        return acc + sprint.points_merged;
    }, 0);

    const pointsLeft = sprints.reduce((acc, sprint) => {
        return acc + (sprint.total_points - sprint.points_merged);
    }, 0);

    const extra_deploys = sprints.reduce((acc, sprint) => {
        return acc + sprint.extra_deploys;
    }, 0);

    return {
        id: randomID,
        index: index,
        total_points: (total_points / sprints.length).toFixed(2),
        points_merged: (points_merged / sprints.length).toFixed(2),
        pointsLeft: (pointsLeft / sprints.length).toFixed(2),
        extra_deploys: (extra_deploys / sprints.length).toFixed(2),
    };
};

const MyRow = ({ row, styleClass, handleOpenSprintDialog }) => {
    const {
        id,
        index,
        total_points,
        points_merged,
        pointsLeft,
        extra_deploys,
        date_delay,
    } = row;

    return (
        <StyledTableRow
            key={id}
            className={styleClass ? styleClass : ""}
            onClick={
                handleOpenSprintDialog
                    ? () => handleOpenSprintDialog(row)
                    : null
            }>
            <TableCell align="center">
                <Typography variant="h6">
                    {index} <span>{date_delay ? "(delayed)" : ""}</span>
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">{total_points}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">{points_merged}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">
                    {pointsLeft || total_points - points_merged}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">{extra_deploys}</Typography>
            </TableCell>
        </StyledTableRow>
    );
};

const MyRows = ({ sprints, handleOpenSprintDialog }) => {
    if (!sprints?.length) {
        return;
    }

    // Current Sprint
    const firstSprint = sprints[0];
    // Last Sprints not delayed
    const sprintsNotDelayed = sprints.filter(
        (sprint, index) => index !== 0 && !sprint.date_delay
    );
    // Last Sprints delayed
    const sprintsDelayed = sprints.filter(
        (sprint, index) => index !== 0 && sprint.date_delay
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
            <MyRow
                row={firstSprint}
                key="current"
                handleOpenSprintDialog={handleOpenSprintDialog}
            />

            <MyRow
                row={avgSprintsNotDelayed}
                key="average not delayed"
                styleClass={"bg-success-dark"}
            />

            <MyRow
                row={avgSprintsDelayed}
                key="average delayed"
                styleClass={"bg-error-dark"}
            />

            {sprintsNotDelayed.map((sprint) => (
                <MyRow
                    row={sprint}
                    key={sprint.id}
                    handleOpenSprintDialog={handleOpenSprintDialog}
                />
            ))}

            {sprintsDelayed.map((sprint) => (
                <MyRow
                    row={sprint}
                    key={sprint.id}
                    handleOpenSprintDialog={handleOpenSprintDialog}
                />
            ))}
        </>
    );
};

export const SprintsTable = ({ loading, sprints, handleOpenSprintDialog }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 512 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width={"20%"}>
                            <Typography variant="h5">Sprint #</Typography>
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                            <Typography variant="h5">Total Points</Typography>
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                            <Typography variant="h5">Merged</Typography>
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                            <Typography variant="h5">Points Left</Typography>
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                            <Typography variant="h5">Extra Deploys</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell
                                align="center"
                                colSpan={5}
                                padding="none">
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width="100%"
                                    height={64}
                                />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <MyRows
                            sprints={sprints}
                            handleOpenSprintDialog={handleOpenSprintDialog}
                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
