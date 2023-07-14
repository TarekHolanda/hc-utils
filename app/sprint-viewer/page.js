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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { styled } from "@mui/material/styles";

import { handleGet, handleAPI } from "../api/handleCallAPI";
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

const MyRow = ({ row, styleClass, handleOpenModal }) => {
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
        <StyledTableRow
            key={id}
            className={styleClass ? styleClass : ""}
            onClick={handleOpenModal ? () => handleOpenModal(row) : null}
        >
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

const MyRows = ({ sprints, handleOpenModal }) => {
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
            <MyRow
                row={firstSprint}
                key="current"
                handleOpenModal={handleOpenModal}
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
                    handleOpenModal={handleOpenModal}
                />
            ))}

            {sprintsDelayed.map((sprint) => (
                <MyRow
                    row={sprint}
                    key={sprint.id}
                    handleOpenModal={handleOpenModal}
                />
            ))}
        </>
    );
};

export default function Page() {
    const { data: session, status } = useSession();
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [sprintsAmount, setSprintsAmount] = useState("10");
    const [sprint, setSprint] = useState({
        index: "",
        totalPoints: "",
        pointsMerged: "",
        extraDeploys: "",
        delayed: false,
    });

    const handleGetSprints = () => {
        setLoading(true);
        handleGet("sprints", { pageSize: sprintsAmount }).then((response) => {
            if (response.error) {
                handleAlert(response.error, "error");
                setLoading(false);

                return;
            }

            setSprints(response.data);
            setLoading(false);
        });
    };

    const handleAlert = (
        message = "Something went wrong",
        severity = "error"
    ) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
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

    const handleOpenModal = (current) => {
        setModalOpen(true);
        console.log("Current");
        console.log(current);
        if (current && current.id) {
            setSprint(current);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSprint({
            index: "",
            totalPoints: "",
            pointsMerged: "",
            extraDeploys: "",
            delayed: false,
        });
    };

    const handleSetSprint = (value, type) => {
        setSprint((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

    const handleAddUpdateSprint = (event) => {
        event.preventDefault();

        if (!sprint.index || !sprint.totalPoints) {
            handleAlert(
                "Sprint Index and Total Points are required",
                "warning"
            );
            return;
        }
        setLoadingModal(true);

        const sprintParam = {
            id: sprint.id || 0,
            index: sprint.index,
            totalPoints: sprint.totalPoints,
            pointsMerged: sprint.pointsMerged || 0,
            extraDeploys: sprint.extraDeploys || 0,
            delayed: sprint.delayed || false,
        };
        const method = sprint.id ? "PUT" : "POST";
        const url = sprint.id
            ? "sprints/" + sprint.id + "/update"
            : "sprints/add";

        handleAPI(url, sprintParam, method).then((response) => {
            if (response.error) {
                handleAlert(response.error, "error");
                setLoadingModal(false);
                return;
            }

            if (sprint.id) {
                const newSprints = sprints.map((sprintCurrent) => {
                    if (sprintCurrent.id === response.data.id) {
                        return response.data;
                    }

                    return sprintCurrent;
                });

                setSprints(newSprints);
                handleAlert(
                    "Sprint #" + sprint.index + " updated successfully",
                    "success"
                );
            } else {
                const newSprints = [...sprints, response.data]
                    .sort((a, b) => b.index - a.index)
                    .slice(
                        0,
                        sprintsAmount === "0" ? sprints.length : sprintsAmount
                    );
                setSprints(newSprints);
                handleAlert(
                    "Sprint #" + sprint.index + " added successfully",
                    "success"
                );
            }

            setModalOpen(false);
            setLoadingModal(false);
            setSprint({
                index: "",
                totalPoints: "",
                pointsMerged: "",
                extraDeploys: "",
                delayed: false,
            });
        });
    };

    const handleDeleteSprint = (event) => {
        event.preventDefault();
        setLoadingModal(true);

        const method = "DELETE";
        const url = "sprints/" + sprint.id + "/delete";

        handleAPI(url, {}, method).then((response) => {
            if (response.error) {
                handleAlert(response.error, "error");
                setLoadingModal(false);
                return;
            }

            const newSprints = sprints.filter(
                (sprintCurrent) => sprintCurrent.id !== sprint.id
            );
            setSprints(newSprints);
            handleAlert(
                "Sprint #" + sprint.index + " deleted successfully",
                "success"
            );
            setModalOpen(false);
            setLoadingModal(false);
            setSprint({
                index: "",
                totalPoints: "",
                pointsMerged: "",
                extraDeploys: "",
                delayed: false,
            });
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
                            <MyRows
                                sprints={sprints}
                                handleOpenModal={handleOpenModal}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={modalOpen}>
                <FormControl>
                    <DialogTitle>Sprint #{sprint.index}</DialogTitle>

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
                            value={sprint.index}
                            onChange={(event) => {
                                handleSetSprint(
                                    parseInt(event.target.value) || "",
                                    "index"
                                );
                            }}
                            disabled={loading}
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
                            value={sprint.totalPoints}
                            onChange={(event) => {
                                handleSetSprint(
                                    parseInt(event.target.value) || "",
                                    "totalPoints"
                                );
                            }}
                            disabled={loading}
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
                            value={sprint.pointsMerged}
                            onChange={(event) => {
                                handleSetSprint(
                                    parseInt(event.target.value) || "",
                                    "pointsMerged"
                                );
                            }}
                            disabled={loading}
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
                            value={sprint.extraDeploys}
                            onChange={(event) => {
                                handleSetSprint(
                                    parseInt(event.target.value) || "",
                                    "extraDeploys"
                                );
                            }}
                            disabled={loading}
                        />

                        <FormControlLabel
                            control={<Switch />}
                            label="Delayed"
                            value={sprint.delayed}
                            onChange={(event) => {
                                handleSetSprint(
                                    event.target.checked,
                                    "delayed"
                                );
                            }}
                        />
                    </DialogContent>

                    <Divider />

                    {loadingModal ? (
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            height={58.25}
                        />
                    ) : (
                        <DialogActions>
                            {sprint.id && (
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    onClick={handleDeleteSprint}
                                    sx={{ position: "absolute", left: "4px" }}
                                    color="error"
                                >
                                    <DeleteOutlineIcon fontSize="inherit" />
                                </IconButton>
                            )}
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleCloseModal}
                                className="width-128"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleAddUpdateSprint}
                                className="width-128"
                            >
                                Save
                            </Button>
                        </DialogActions>
                    )}
                </FormControl>
            </Dialog>

            <MySpeedDial
                page={"sprint-viewer"}
                callback={() => {
                    setModalOpen(true);
                }}
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
