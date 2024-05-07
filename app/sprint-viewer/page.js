"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";

import { handleGet, handleAPI } from "../api/handleCallAPI";
import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";
import { MySpeedDial } from "../components/MySpeedDial";
import { SprintsTable } from "./SprintsTable";
import { SprintDialog } from "./SprintDialog";
import { SprintsActionBar } from "./SprintsActionBar";
import { RulerDialog } from "./RulerDialog";
import { RULER_DEFAULT_DAY } from "../utils/constants";

export default function Page() {
    const { data: session, status } = useSession();
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDialog, setLoadingDialog] = useState(false);
    const [sprintDialogOpen, setSprintDialogOpen] = useState(false);
    const [rulerDialogOpen, setRulerDialogOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [sprintsAmount, setSprintsAmount] = useState("10");
    const [sprint, setSprint] = useState({
        index: "",
        total_points: "",
        points_merged: "",
        extra_deploys: "",
        date_delay: false,
        process_delay: false,
    });

    const handleGetSprints = () => {
        setLoading(true);
        handleGet("sprints/list", { pageSize: sprintsAmount }).then(
            (response) => {
                if (response.error) {
                    handleAlert(response.error, "error");
                    setLoading(false);

                    return;
                }

                setSprints(response.data);
                setLoading(false);
            }
        );
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
        return <MyLoading />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const handleOpenSprintDialog = (event, current) => {
        event.stopPropagation();
        setSprintDialogOpen(true);

        if (current && current.id) {
            if (!current.ruler?.days) {
                current.ruler = {
                    days: [{ index: 0, lines: RULER_DEFAULT_DAY }],
                };
            }

            setSprint(current);
        }
    };

    const handleCloseDialogs = () => {
        setSprintDialogOpen(false);
        setRulerDialogOpen(false);
        setTimeout(() => {
            setLoadingDialog(false);
            setSprint({
                index: "",
                total_points: "",
                points_merged: "",
                extra_deploys: "",
                date_delay: false,
                process_delay: false,
            });
        }, 500);
    };

    const handleSetSprint = (value, type) => {
        setSprint((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

    const handleAddUpdateSprint = (event) => {
        event?.preventDefault();

        if (!sprint.index || !sprint.total_points) {
            handleAlert(
                "Sprint Index and Total Points are required",
                "warning"
            );
            return;
        }
        setLoadingDialog(true);

        const sprintParam = {
            id: sprint.id || 0,
            index: sprint.index,
            total_points: sprint.total_points,
            points_merged: sprint.points_merged || 0,
            extra_deploys: sprint.extra_deploys || 0,
            date_delay: sprint.date_delay || false,
            process_delay: sprint.process_delay || false,
            ruler: sprint.ruler || {},
        };

        const method = sprint.id ? "PUT" : "POST";
        const url = sprint.id
            ? "sprints/" + sprint.id + "/update"
            : "sprints/add";

        handleAPI(url, sprintParam, method).then((response) => {
            if (response.error) {
                handleAlert(response.error, "error");
                setLoadingDialog(false);
                return;
            }

            handleAlert(
                "Sprint #" +
                    sprint.index +
                    (sprint.id ? " updated" : "  added") +
                    " successfully",
                "success"
            );

            if (sprint.id) {
                const updatedSprints = sprints.map((currentSprint) => {
                    if (currentSprint.id === sprint.id) {
                        return sprint;
                    }

                    return currentSprint;
                });

                setSprints(updatedSprints);
            } else {
                const updatedSprints = [...sprints, response.data]
                    .sort((a, b) => b.index - a.index)
                    .slice(
                        0,
                        sprintsAmount === "0" ? sprints.length : sprintsAmount
                    );

                setSprints(updatedSprints);
            }

            handleCloseDialogs();
        });
    };

    const handleDeleteSprint = (event) => {
        event.preventDefault();
        setLoadingDialog(true);

        const method = "DELETE";
        const url = "sprints/" + sprint.id + "/delete";

        handleAPI(url, {}, method).then((response) => {
            if (response.error) {
                handleAlert(response.error, "error");
                setLoadingDialog(false);
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

            handleCloseDialogs();
        });
    };

    const handleUpdateRuler = (sprintSet) => {
        for (let day of sprintSet?.ruler?.days) {
            for (let line of day.lines) {
                delete line.selected;
            }
        }

        handleAddUpdateSprint();
    };

    const handleOpenRulerDialog = (sprintSet) => {
        setRulerDialogOpen(true);

        if (!sprintSet?.ruler?.days) {
            sprintSet.ruler = {
                days: [{ index: 0, lines: RULER_DEFAULT_DAY }],
            };
        }

        setSprint(sprintSet);
    };

    return (
        <Container>
            <SprintsActionBar
                sprintsAmount={sprintsAmount}
                setSprintsAmount={setSprintsAmount}
                handleGetSprints={handleGetSprints}
            />

            <SprintsTable
                loading={loading}
                sprints={sprints}
                handleOpenSprintDialog={handleOpenSprintDialog}
                handleOpenRulerDialog={handleOpenRulerDialog}
            />

            <SprintDialog
                sprintDialogOpen={sprintDialogOpen}
                sprint={sprint}
                loading={loading}
                loadingDialog={loadingDialog}
                handleSetSprint={handleSetSprint}
                handleCloseDialogs={handleCloseDialogs}
                handleAddUpdateSprint={handleAddUpdateSprint}
                handleDeleteSprint={handleDeleteSprint}
            />

            <RulerDialog
                rulerDialogOpen={rulerDialogOpen}
                sprint={sprint}
                loadingDialog={loadingDialog}
                handleSetSprint={handleSetSprint}
                handleUpdateRuler={handleUpdateRuler}
                handleCloseDialogs={handleCloseDialogs}
            />

            <MySpeedDial
                page={"sprint-viewer"}
                callback={handleOpenSprintDialog}
            />

            <Snackbar
                open={showAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity={alertSeverity} variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>

            <MySpacer size={16} vertical />
        </Container>
    );
}
