"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";

import { handleGet } from "../api/handleCallAPI";
import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";
import { XrayActionBar } from "./XrayActionBar";
import { XrayTable } from "./XrayTable";

export default function Page() {
    const { data: session, status } = useSession();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [months, setMonths] = useState(4);
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const handleGetCustomers = () => {
        setLoading(true);
        handleGet("customers", {
            sort: sortField,
            order: sortOrder,
            months: months,
            search: search,
        }).then((response) => {
            console.log(response);
            if (response.error) {
                handleAlert(response.error, "error");
                setLoading(false);

                return;
            }

            setCustomers(response.data);
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
        handleGetCustomers();
    }, [sortField, sortOrder, months]);

    if (status === "loading") {
        return <MyLoading loading={true} />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    return (
        <Container>
            <XrayActionBar
                months={months}
                setMonths={setMonths}
                search={search}
                setSearch={setSearch}
                handleGetCustomers={handleGetCustomers}
            />

            <XrayTable
                customers={customers}
                months={months}
                sortField={sortField}
                sortOrder={sortOrder}
                handleSort={handleSort}
                loading={loading}
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
