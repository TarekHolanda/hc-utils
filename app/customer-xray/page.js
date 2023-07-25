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

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import styled from "@mui/material/styles/styled";
import { formatDate } from "../utils/formatDate";
import SyncIcon from "@mui/icons-material/Sync";
import Skeleton from "@mui/material/Skeleton";
import ArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDoubleIcon from "@mui/icons-material/UnfoldMore";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&.expanded": {
        backgroundColor: theme.palette.action.selected,
    },
    "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const StyledInternalRow = styled(TableRow)(({ theme }) => ({
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const CustomerRow = ({ customer }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <StyledTableRow
                className={expanded ? "expanded" : ""}
                onClick={handleExpand}
            >
                <TableCell align="center">{customer.name}</TableCell>
                <TableCell align="center">${customer.mrr.toFixed(2)}</TableCell>
                <TableCell align="center">
                    {customer.active_users_avg.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                    {customer.reports_avg.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                    {customer.attendances_avg.toFixed(2)}
                </TableCell>
            </StyledTableRow>
            <StyledTableRow onClick={handleExpand}>
                <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Table size="small">
                            <TableBody>
                                {customer.details.map((detail) => (
                                    <StyledInternalRow key={detail.date}>
                                        <TableCell align="center" width={"30%"}>
                                            <Typography
                                                color="primary"
                                                variant="body2"
                                            >
                                                {formatDate(detail.date)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            width={"17.5%"}
                                        >
                                            {detail.active_users > 0 ? (
                                                <Typography
                                                    color="primary"
                                                    variant="body2"
                                                >
                                                    $
                                                    {(
                                                        customer.mrr /
                                                        detail.active_users
                                                    ).toFixed(2)}{" "}
                                                    / user
                                                </Typography>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            width={"17.5%"}
                                        >
                                            <Typography
                                                color="primary"
                                                variant="body2"
                                            >
                                                {detail.active_users.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            width={"17.5%"}
                                        >
                                            <Typography
                                                color="primary"
                                                variant="body2"
                                            >
                                                {detail.reports.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            width={"17.5%"}
                                        >
                                            <Typography
                                                color="primary"
                                                variant="body2"
                                            >
                                                {detail.attendances.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                    </StyledInternalRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </StyledTableRow>
        </>
    );
};

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
            <Box className="display-flex justify-center padding-1rem align-center">
                <FormControl sx={{ width: 256 }}>
                    <InputLabel id="months-label">Date Range</InputLabel>
                    <Select
                        labelId="months-label"
                        id="months"
                        value={months}
                        input={<OutlinedInput label="Date Range" />}
                        onChange={(event) => {
                            setMonths(event.target.value);
                        }}
                    >
                        <MenuItem value={4}>4 months</MenuItem>
                        <MenuItem value={6}>6 months</MenuItem>
                        <MenuItem value={12}>12 months</MenuItem>
                        <MenuItem value={18}>18 months</MenuItem>
                        <MenuItem value={24}>24 months</MenuItem>
                    </Select>
                </FormControl>
                <IconButton
                    aria-label="sync"
                    size="large"
                    onClick={handleGetCustomers}
                    sx={{ float: "right" }}
                >
                    <SyncIcon fontSize="inherit" />
                </IconButton>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                width={"30%"}
                                onClick={() => handleSort("name")}
                            >
                                <Box className="display-flex">
                                    <Typography variant="h6">
                                        Last {months} months
                                    </Typography>
                                    {sortField === "name" ? (
                                        <>
                                            {sortOrder === "asc" ? (
                                                <ArrowUpIcon fontSize="medium" />
                                            ) : (
                                                <ArrowDownIcon fontSize="medium" />
                                            )}
                                        </>
                                    ) : (
                                        <ArrowDoubleIcon fontSize="medium" />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell
                                align="center"
                                width={"17.5%"}
                                onClick={() => handleSort("mrr")}
                            >
                                <Box className="display-flex">
                                    <Typography variant="h6">MRR</Typography>
                                    {sortField === "mrr" ? (
                                        <>
                                            {sortOrder === "asc" ? (
                                                <ArrowUpIcon fontSize="medium" />
                                            ) : (
                                                <ArrowDownIcon fontSize="medium" />
                                            )}
                                        </>
                                    ) : (
                                        <ArrowDoubleIcon fontSize="medium" />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell
                                align="center"
                                width={"17.5%"}
                                onClick={() => handleSort("active_users_avg")}
                            >
                                <Box className="display-flex">
                                    <Typography variant="h6">
                                        Active Users
                                    </Typography>
                                    {sortField === "active_users_avg" ? (
                                        <>
                                            {sortOrder === "asc" ? (
                                                <ArrowUpIcon fontSize="medium" />
                                            ) : (
                                                <ArrowDownIcon fontSize="medium" />
                                            )}
                                        </>
                                    ) : (
                                        <ArrowDoubleIcon fontSize="medium" />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell
                                align="center"
                                width={"17.5%"}
                                onClick={() => handleSort("reports_avg")}
                            >
                                <Box className="display-flex">
                                    <Typography variant="h6">
                                        Reports
                                    </Typography>
                                    {sortField === "reports_avg" ? (
                                        <>
                                            {sortOrder === "asc" ? (
                                                <ArrowUpIcon fontSize="medium" />
                                            ) : (
                                                <ArrowDownIcon fontSize="medium" />
                                            )}
                                        </>
                                    ) : (
                                        <ArrowDoubleIcon fontSize="medium" />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell
                                align="center"
                                width={"17.5%"}
                                onClick={() => handleSort("attendances_avg")}
                            >
                                <Box className="display-flex">
                                    <Typography variant="h6">
                                        Attendances
                                    </Typography>
                                    {sortField === "attendances_avg" ? (
                                        <>
                                            {sortOrder === "asc" ? (
                                                <ArrowUpIcon fontSize="medium" />
                                            ) : (
                                                <ArrowDownIcon fontSize="medium" />
                                            )}
                                        </>
                                    ) : (
                                        <ArrowDoubleIcon fontSize="medium" />
                                    )}
                                </Box>
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
                            <>
                                {customers.map((customer) => (
                                    <CustomerRow
                                        key={customer.id}
                                        customer={customer}
                                    />
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

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
