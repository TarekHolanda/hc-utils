"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import Switch from "@mui/material/Switch";
import SyncIcon from "@mui/icons-material/Sync";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { handleGet, handlePost } from "../api/handleCallAPI";
import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";
import { MySpeedDial } from "../components/MySpeedDial";

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
        index: index,
        totalPoints: (totalPoints / sprints.length).toFixed(2),
        pointsMerged: (pointsMerged / sprints.length).toFixed(2),
        pointsLeft: (pointsLeft / sprints.length).toFixed(2),
        extraDeploys: (extraDeploys / sprints.length).toFixed(2),
    };
};

const MyRow = ({ row, styleClass }) => {
    const {
        id,
        index,
        totalPoints,
        pointsMerged,
        pointsLeft,
        extraDeploys,
        delayed,
    } = row;

    return (
        <StyledTableRow key={id} className={styleClass ? styleClass : ""}>
            <TableCell align="center">
                <Typography variant="h6">
                    {index} <span>{delayed ? "(delayed)" : ""}</span>
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">{totalPoints}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">{pointsMerged}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">
                    {pointsLeft || totalPoints - pointsMerged}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">{extraDeploys}</Typography>
            </TableCell>
        </StyledTableRow>
    );
};

const MyRows = ({ sprints }) => {
    if (!sprints?.length) {
        return;
    }

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
                styleClass={"bg-success-dark"}
            />

            <MyRow
                row={avgSprintsDelayed}
                key="average delayed"
                styleClass={"bg-error-dark"}
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
    const [loading, setLoading] = useState(false);
    const [crudModalOpen, setCrudModalOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [sprintIndex, setSprintindex] = useState("");
    const [sprintTotalPoints, setSprintTotalPoints] = useState("");
    const [sprintPointsMerged, setSprintPointsMerged] = useState("");
    const [sprintExtraDeploys, setSprintExtraDeploys] = useState("");
    const [sprintDelayed, setSprintDelayed] = useState(false);
    const [sprintsAmount, setSprintsAmount] = useState("10");

    const handleGetSprints = () => {
        setLoading(true);
        handleGet("sprints", { pageSize: sprintsAmount }).then((response) => {
            setSprints(response.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        handleGetSprints();
    }, [sprintsAmount]);

    if (status === "loading") {
        return <MyLoading loading={true} />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const handleCrudModalOpen = () => {
        setCrudModalOpen(!crudModalOpen);
    };

    const handleAddSprint = (event) => {
        event.preventDefault();

        if (!sprintIndex || !sprintTotalPoints) {
            setAlertMessage("Sprint Index and Total Points are required");
            setAlertSeverity("warning");
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 2000);

            return;
        }

        setLoading(true);
        const newSprint = {
            index: sprintIndex,
            totalPoints: sprintTotalPoints,
            pointsMerged: sprintPointsMerged || 0,
            extraDeploys: sprintExtraDeploys || 0,
            delayed: sprintDelayed || false,
        };

        handlePost("sprints/add", newSprint).then((response) => {
            setLoading(false);
            handleCrudModalOpen();

            const newSprints = [...sprints, response.data]
                .sort((a, b) => b.index - a.index)
                .slice(0, sprintsAmount);

            setSprints(newSprints);

            setAlertMessage("Sprint added successfully");
            setAlertSeverity("success");
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 2000);

            setSprintindex("");
            setSprintTotalPoints("");
            setSprintPointsMerged("");
            setSprintExtraDeploys("");
            setSprintDelayed(false);
        });
    };

    return (
        <Container>
            <Box className="display-flex justify-center padding-1rem align-center">
                <ToggleButtonGroup
                    color="primary"
                    value={sprintsAmount}
                    exclusive
                    onChange={(event, value) => {
                        setSprintsAmount(value);
                    }}
                    aria-label="Sprints Amount"
                    size="small"
                >
                    <ToggleButton value="10">5 each</ToggleButton>
                    <ToggleButton value="20">10 each</ToggleButton>
                    <ToggleButton value="0">All Sprints</ToggleButton>
                </ToggleButtonGroup>

                <MySpacer size={16} horizontal />

                <IconButton
                    aria-label="sync"
                    size="large"
                    onClick={handleGetSprints}
                >
                    <SyncIcon fontSize="inherit" />
                </IconButton>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 512 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" width={"20%"}>
                                <Typography variant="h5">Sprint #</Typography>
                            </TableCell>
                            <TableCell align="center" width={"20%"}>
                                <Typography variant="h5">
                                    Total Points
                                </Typography>
                            </TableCell>
                            <TableCell align="center" width={"20%"}>
                                <Typography variant="h5">Merged</Typography>
                            </TableCell>
                            <TableCell align="center" width={"20%"}>
                                <Typography variant="h5">
                                    Points Left
                                </Typography>
                            </TableCell>
                            <TableCell align="center" width={"20%"}>
                                <Typography variant="h5">
                                    Extra Deploys
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    align="center"
                                    colSpan={5}
                                    padding="none"
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        animation="wave"
                                        width="100%"
                                        height={64}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <MyRows sprints={sprints} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={crudModalOpen}>
                <FormControl>
                    <DialogTitle>Sprint</DialogTitle>

                    <Divider />

                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="sprint-index"
                            label="Sprint Number"
                            type="number"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                            value={sprintIndex}
                            onChange={(event) => {
                                setSprintindex(
                                    parseInt(event.target.value) || ""
                                );
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="sprint-total"
                            label="Total Points"
                            type="number"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                            value={sprintTotalPoints}
                            onChange={(event) => {
                                setSprintTotalPoints(
                                    parseInt(event.target.value) || ""
                                );
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="sprint-merged"
                            label="Points Merged"
                            type="number"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                            value={sprintPointsMerged}
                            onChange={(event) => {
                                setSprintPointsMerged(
                                    parseInt(event.target.value) || ""
                                );
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="sprint-extra-deploys"
                            label="Extra Deploys"
                            type="number"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                            value={sprintExtraDeploys}
                            onChange={(event) => {
                                setSprintExtraDeploys(
                                    parseInt(event.target.value) || ""
                                );
                            }}
                        />
                        <FormControlLabel
                            control={<Switch />}
                            label="Delayed"
                            value={sprintDelayed}
                            onChange={(event) => {
                                setSprintDelayed(event.target.checked);
                            }}
                        />
                    </DialogContent>

                    <Divider />

                    <DialogActions>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleCrudModalOpen}
                            className="width-128"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleAddSprint}
                            className="width-128"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </FormControl>
            </Dialog>

            <MySpeedDial
                page={"sprint-viewer"}
                callback={handleCrudModalOpen}
            />

            <Snackbar
                open={showAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert severity={alertSeverity} variant="outlined">
                    {alertMessage}
                </Alert>
            </Snackbar>

            <MySpacer size={16} vertical />
        </Container>
    );
}
