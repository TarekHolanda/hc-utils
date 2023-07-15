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
import { SprintsDialog } from "./SprintsDialog";
import { SprintsActionBar } from "./SprintsActionBar";

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
            <SprintsActionBar
                sprintsAmount={sprintsAmount}
                setSprintsAmount={setSprintsAmount}
                handleGetSprints={handleGetSprints}
            />

            <SprintsTable
                loading={loading}
                sprints={sprints}
                handleOpenModal={handleOpenModal}
            />

            <SprintsDialog
                modalOpen={modalOpen}
                sprint={sprint}
                loading={loading}
                loadingModal={loadingModal}
                handleSetSprint={handleSetSprint}
                handleCloseModal={handleCloseModal}
                handleAddUpdateSprint={handleAddUpdateSprint}
                handleDeleteSprint={handleDeleteSprint}
            />

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
