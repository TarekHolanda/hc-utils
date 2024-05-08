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
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import { styled } from "@mui/material/styles";

import { MyIconButton } from "../components/MyIconButton";
import { MyTooltip } from "../components/MyTooltip";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.blueGrey.main,
    },
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.blueGrey.dark,
    },
    "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.blueGrey.light,
    },
}));

const calculateAverage = (sprints, index) => {
    const randomID = Math.floor(Math.random() * 10) + 1;

    const totalPoints = sprints.reduce((acc, sprint) => {
        return acc + sprint.total_points;
    }, 0);

    const pointsMerged = sprints.reduce((acc, sprint) => {
        return acc + sprint.points_merged;
    }, 0);

    const pointsLeft = sprints.reduce((acc, sprint) => {
        return acc + (sprint.total_points - sprint.points_merged);
    }, 0);

    const extraDeploys = sprints.reduce((acc, sprint) => {
        return acc + sprint.extra_deploys;
    }, 0);

    return {
        id: randomID,
        index: index,
        total_points: (totalPoints / sprints.length).toFixed(2),
        points_merged: (pointsMerged / sprints.length).toFixed(2),
        points_left: (pointsLeft / sprints.length).toFixed(2),
        extra_deploys: (extraDeploys / sprints.length).toFixed(2),
    };
};

const MyRow = ({ row, handleOpenSprintDialog, handleOpenRulerDialog }) => {
    const {
        id,
        index,
        total_points,
        points_merged,
        points_left,
        extra_deploys,
        date_delay,
        process_delay,
    } = row;

    return (
        <StyledTableRow
            key={id}
            onClick={
                handleOpenRulerDialog ? () => handleOpenRulerDialog(row) : null
            }>
            <TableCell align="center">
                <Typography variant="h6">{index}</Typography>
            </TableCell>

            <TableCell align="center">
                <Typography variant="h6">{total_points}</Typography>
            </TableCell>

            <TableCell align="center">
                <Typography variant="h6">{points_merged}</Typography>
            </TableCell>

            <TableCell align="center">
                <Typography variant="h6">
                    {points_left || total_points - points_merged}
                </Typography>
            </TableCell>

            <TableCell align="center">
                <Typography variant="h6">{extra_deploys}</Typography>
            </TableCell>

            <TableCell align="center">
                {date_delay && (
                    <MyTooltip title="Date Delay" placement="top">
                        <ErrorIcon
                            fontSize="large"
                            color="warning"
                            sx={{ marginTop: "4px" }}
                        />
                    </MyTooltip>
                )}
            </TableCell>

            <TableCell align="center">
                {process_delay && (
                    <MyTooltip title="Process Delay" placement="left">
                        <ErrorIcon
                            fontSize="large"
                            color="warning"
                            sx={{ marginTop: "4px" }}
                        />
                    </MyTooltip>
                )}
            </TableCell>

            <TableCell align="center">
                {Number.isInteger(index) && (
                    <MyIconButton
                        color="blueGrey"
                        onClick={
                            handleOpenSprintDialog
                                ? (e) => handleOpenSprintDialog(e, row)
                                : null
                        }>
                        <EditIcon fontSize="inherit" />
                    </MyIconButton>
                )}
            </TableCell>
        </StyledTableRow>
    );
};

const MyRows = ({ sprints, handleOpenSprintDialog, handleOpenRulerDialog }) => {
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
        "Avg. Not Delayed"
    );

    const avgSprintsDelayed = calculateAverage(sprintsDelayed, "Avg. Delayed");

    return (
        <>
            <MyRow
                row={firstSprint}
                key="current"
                handleOpenSprintDialog={handleOpenSprintDialog}
                handleOpenRulerDialog={handleOpenRulerDialog}
            />

            <MyRow row={avgSprintsNotDelayed} key="average not delayed" />

            <MyRow row={avgSprintsDelayed} key="average delayed" />

            {sprintsNotDelayed.map((sprint) => (
                <MyRow
                    row={sprint}
                    key={sprint.id}
                    handleOpenSprintDialog={handleOpenSprintDialog}
                    handleOpenRulerDialog={handleOpenRulerDialog}
                />
            ))}

            {sprintsDelayed.map((sprint) => (
                <MyRow
                    row={sprint}
                    key={sprint.id}
                    handleOpenSprintDialog={handleOpenSprintDialog}
                    handleOpenRulerDialog={handleOpenRulerDialog}
                />
            ))}
        </>
    );
};

export const SprintsTable = ({
    loading,
    sprints,
    handleOpenSprintDialog,
    handleOpenRulerDialog,
}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 512 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width={"20%"}>
                            <Typography variant="h5">Sprint #</Typography>
                        </TableCell>
                        <TableCell align="center" width={"15%"}>
                            <Typography variant="h5">Total Points</Typography>
                        </TableCell>
                        <TableCell align="center" width={"15%"}>
                            <Typography variant="h5">Merged</Typography>
                        </TableCell>
                        <TableCell align="center" width={"15%"}>
                            <Typography variant="h5">Points Left</Typography>
                        </TableCell>
                        <TableCell align="center" width={"15%"}>
                            <Typography variant="h5">Extra Deploys</Typography>
                        </TableCell>
                        <TableCell align="center" width={"5%"}>
                            <Typography variant="h5">Date Delay</Typography>
                        </TableCell>
                        <TableCell align="center" width={"5%"}>
                            <Typography variant="h5">Process Delay</Typography>
                        </TableCell>
                        <TableCell align="center" width={"10%"}>
                            <Typography variant="h5">Edit</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell
                                align="center"
                                colSpan={8}
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
                            handleOpenRulerDialog={handleOpenRulerDialog}
                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
