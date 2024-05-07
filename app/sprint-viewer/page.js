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

export default function Page() {
    const { data: session, status } = useSession();
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDialog, setLoadingDialog] = useState(false);
    const [sprintDialogOpen, setSprintDialogOpen] = useState(false);
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
    });

    const [rulerDialogOpen, setRulerDialogOpen] = useState(false);
    const [ruler, setRuler] = useState({
        monday: [1, 1, 1, 1],
        tuesday: [2, 2, 2, 2],
        wednesday: [3, 3, 3, 3],
        thursday: [4, 4, 4, 4],
        friday: [5, 5, 5, 5],
    });

    const handleSetRuler = (value, type) => {
        setRuler((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

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

    const handleOpenSprintDialog = (current) => {
        setSprintDialogOpen(true);

        if (current && current.id) {
            setSprint(current);
        }
    };

    const handleCloseSprintDialog = () => {
        setSprintDialogOpen(false);
        setLoadingDialog(false);
        setSprint({
            index: "",
            total_points: "",
            points_merged: "",
            extra_deploys: "",
            date_delay: false,
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

            handleCloseSprintDialog();
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

            handleCloseSprintDialog();
        });
    };

    const handleOpenRulerDialog = () => {
        console.log("Open Ruler");
        setRulerDialogOpen(true);
    };

    const handleCloseRulerDialog = () => {
        console.log("Close Ruler");
        setRulerDialogOpen(false);
    };

    return (
        <Container>
            <SprintsActionBar
                sprintsAmount={sprintsAmount}
                setSprintsAmount={setSprintsAmount}
                handleGetSprints={handleGetSprints}
                handleOpenRulerDialog={handleOpenRulerDialog}
            />

            <SprintsTable
                loading={loading}
                sprints={sprints}
                handleOpenSprintDialog={handleOpenSprintDialog}
            />

            <SprintDialog
                sprintDialogOpen={sprintDialogOpen}
                sprint={sprint}
                loading={loading}
                loadingDialog={loadingDialog}
                handleSetSprint={handleSetSprint}
                handleCloseSprintDialog={handleCloseSprintDialog}
                handleAddUpdateSprint={handleAddUpdateSprint}
                handleDeleteSprint={handleDeleteSprint}
            />

            <RulerDialog
                rulerDialogOpen={rulerDialogOpen}
                ruler={ruler}
                handleSetRuler={handleSetRuler}
                loading={loading}
                loadingDialog={loadingDialog}
                handleCloseRulerDialog={handleCloseRulerDialog}
            />

            <MySpeedDial
                page={"sprint-viewer"}
                callback={handleOpenSprintDialog}
            />

            <Snackbar
                open={showAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert severity={alertSeverity} variant="outlined">
                    {alertMessage}
                </Alert>
            </Snackbar>

            <MySpacer size={16} vertical />
        </Container>
    );
}
