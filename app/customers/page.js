"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import { handleGet, handleAPI } from "../api/handleCallAPI";
import { formatCurrency } from "../utils/formatCurrency";
import { MyLoadingPage } from "../components/MyLoadingPage";
import { MySpacer } from "../components/MySpacer";
import { XrayActionBar } from "./XrayActionBar";
import { XrayTable } from "./XrayTable";
import { XrayDialog } from "./XrayDialog"
import { MyTooltip } from "../components/MyTooltip"

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "24px",
    borderRadius: 4,
}));

const ARR_LAST_YEAR = 1307692.31;
const ARR_GOAL = 1700000;

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
    const [scrollToCustomer, setScrollToCustomer] = useState(0);

    const [currentArr, setCurrentArr] = useState(0);
    const [showGrowthGoal, setShowGrowthGoal] = useState(false);
    const [totalArrPercentage, setTotalArrPercentage] = useState(0);
    const [growthArrPercentage, setGrowthArrPercentage] = useState(0);

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

    const scrollTo = () => {
        if (scrollToCustomer === 0) return;

        const row = document.querySelector("#customer-row-" + scrollToCustomer);
        if (row) {
            const previousRow = row.previousElementSibling;
            if (previousRow) {
                const previousOfPreviousRow = previousRow.previousElementSibling;
                if (previousOfPreviousRow) {
                    previousOfPreviousRow.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        }

        setScrollToCustomer(0);
    };

    const handleGetCustomers = () => {
        setLoading(true);
        handleGet("customers/list", {
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
            setCurrentArr(response.current_arr);
            setTotalArrPercentage(Math.round((response.current_arr / ARR_GOAL) * 100));

            const growth = response.current_arr - ARR_LAST_YEAR;
            const goal = ARR_GOAL - ARR_LAST_YEAR;
            setGrowthArrPercentage(Math.round((growth / goal) * 100));
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

    useEffect(() => {
        scrollTo();
    }, [customers]);

    if (status === "loading") {
        return <MyLoadingPage />;
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
                setScrollToCustomer(customer.id);
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

            <Box position="relative" display="inline-flex" width="100%">
                {showGrowthGoal ? (
                    <MyTooltip
                        placement="top"
                        style={{ cursor: "pointer" }}
                        title={
                            <span>
                                Current Growth: {formatCurrency(currentArr - ARR_LAST_YEAR)}
                                <br/>
                                Growth Goal: {formatCurrency(ARR_GOAL - ARR_LAST_YEAR)}
                            </span>
                        }
                        onClick={() => {
                            setShowGrowthGoal(false);
                        }}
                    >
                        <StyledLinearProgress variant="determinate" value={loading ? 0 : growthArrPercentage > 100 ? 100 : growthArrPercentage} className="width-100" />
                    </MyTooltip>
                ) : (
                    <MyTooltip
                        placement="top"
                        style={{ cursor: "pointer" }}
                        title={
                            <span>
                                Current ARR: {formatCurrency(currentArr)}
                                <br/>
                                ARR Goal: {formatCurrency(ARR_GOAL)}
                            </span>
                        }
                        onClick={() => {
                            setShowGrowthGoal(true);
                        }}
                    >
                        <StyledLinearProgress variant="determinate" value={loading ? 0 : totalArrPercentage > 100 ? 100 : totalArrPercentage} className="width-100" />
                    </MyTooltip>
                )}

                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    style={{ transform: "translate(-50%, -50%)" }}
                >
                    <Typography variant="h6" color="blueGrey.dark">
                        {loading ? "Loading ARR Goal..." : `${showGrowthGoal ? growthArrPercentage : totalArrPercentage}%`}
                    </Typography>
                </Box>
            </Box>

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
