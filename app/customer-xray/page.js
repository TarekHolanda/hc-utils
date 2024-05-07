"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";

import { handleGet, handleAPI } from "../api/handleCallAPI";
import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";
import { XrayActionBar } from "./XrayActionBar";
import { XrayTable } from "./XrayTable";
import { XrayDialog } from "./XrayDialog";

export default function Page() {
    const { data: session, status } = useSession();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    const [filterMonths, setFilterMonths] = useState(4);
    const [filterStatus, setFilterStatus] = useState("");
    const [filterNoMrr, setFilterNoMrr] = useState(true);
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [loadingDialog, setLoadingDialog] = useState(false);
    const [customer, setCustomer] = useState({
        id: "",
        name: "",
        mrr: "",
        status: "",
        comment: "",
        use_inspector: false,
        use_timekeeper: false,
        use_training: false,
        use_analytics: false,
        use_selfaudit: false,
    });

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
            filterMonths: filterMonths,
            filterStatus: filterStatus,
            filterNoMrr: filterNoMrr,
            search: search,
        }).then((response) => {
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
    }, [sortField, sortOrder, filterMonths, filterStatus, filterNoMrr]);

    if (status === "loading") {
        return <MyLoading />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const handleSetCustomer = (value, field) => {
        setCustomer((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleOpenDialog = (current) => {
        setDialogOpen(true);

        if (current && current.id) {
            setCustomer({
                id: current.id,
                name: current.name,
                mrr: current.mrr,
                status: current.status,
                comment: current.comment || "",
                use_inspector: current.use_inspector,
                use_timekeeper: current.use_timekeeper,
                use_training: current.use_training,
                use_analytics: current.use_analytics,
                use_selfaudit: current.use_selfaudit,
            });
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCustomer({
            id: "",
            name: "",
            mrr: "",
            status: "",
            comment: "",
            use_inspector: false,
            use_timekeeper: false,
            use_training: false,
            use_analytics: false,
            use_selfaudit: false,
        });
    };

    const handleUpdateCustomer = () => {
        setLoadingDialog(true);

        handleAPI("customers/" + customer.id + "/update", customer, "PUT").then(
            (response) => {
                if (response.error) {
                    handleAlert(response.error, "error");
                    setLoadingDialog(false);

                    return;
                }

                handleAlert("Customer updated", "success");
                setDialogOpen(false);
                setLoadingDialog(false);
                handleGetCustomers();
            }
        );
    };

    return (
        <Box className="margin-side-2rem">
            <XrayActionBar
                filterMonths={filterMonths}
                filterStatus={filterStatus}
                filterNoMrr={filterNoMrr}
                setFilterMonths={setFilterMonths}
                setFilterStatus={setFilterStatus}
                setFilterNoMrr={setFilterNoMrr}
                search={search}
                setSearch={setSearch}
                handleGetCustomers={handleGetCustomers}
            />

            <XrayTable
                loading={loading}
                customers={customers}
                filterMonths={filterMonths}
                sortField={sortField}
                sortOrder={sortOrder}
                handleSort={handleSort}
                handleOpenDialog={handleOpenDialog}
            />

            <XrayDialog
                dialogOpen={dialogOpen}
                customer={customer}
                loading={loading}
                loadingDialog={loadingDialog}
                handleSetCustomer={handleSetCustomer}
                handleCloseDialog={handleCloseDialog}
                handleUpdateCustomer={handleUpdateCustomer}
            />

            <Snackbar
                open={showAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert severity={alertSeverity} variant="outlined">
                    {alertMessage}
                </Alert>
            </Snackbar>

            <MySpacer size={16} vertical />
        </Box>
    );
}
