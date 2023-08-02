import React from "react";

import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import ArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDoubleIcon from "@mui/icons-material/UnfoldMore";
import Box from "@mui/material/Box";

import { CustomerRow } from "./CustomerRow";

const COLUMN_WIDTH = "16%";

export const XrayTable = ({
    customers,
    months,
    sortField,
    sortOrder,
    handleSort,
    loading,
}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow className="pointer">
                        <TableCell
                            align="center"
                            width={"20%"}
                            onClick={() => handleSort("name")}
                        >
                            <Box className="display-flex justify-center">
                                <Typography variant="h6">
                                    Last {months} months
                                </Typography>
                                <Typography
                                    color="primary"
                                    variant="body2"
                                    className="margin-top-6px margin-left-8px"
                                >
                                    ({customers.length})
                                </Typography>
                                {sortField === "name" ? (
                                    <>
                                        {sortOrder === "asc" ? (
                                            <ArrowUpIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <ArrowDoubleIcon
                                        fontSize="medium"
                                        className="margin-top-4px margin-left-8px"
                                    />
                                )}
                            </Box>
                        </TableCell>
                        <TableCell
                            align="center"
                            width={COLUMN_WIDTH}
                            onClick={() => handleSort("mrr")}
                        >
                            <Box className="display-flex justify-center">
                                <Typography variant="h6">MRR</Typography>
                                {sortField === "mrr" ? (
                                    <>
                                        {sortOrder === "asc" ? (
                                            <ArrowUpIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <ArrowDoubleIcon
                                        fontSize="medium"
                                        className="margin-top-4px margin-left-8px"
                                    />
                                )}
                            </Box>
                        </TableCell>
                        <TableCell
                            align="center"
                            width={COLUMN_WIDTH}
                            onClick={() => handleSort("active_users_avg")}
                        >
                            <Box className="display-flex justify-center">
                                <Typography variant="h6">
                                    Active Users
                                </Typography>
                                {sortField === "active_users_avg" ? (
                                    <>
                                        {sortOrder === "asc" ? (
                                            <ArrowUpIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <ArrowDoubleIcon
                                        fontSize="medium"
                                        className="margin-top-4px margin-left-8px"
                                    />
                                )}
                            </Box>
                        </TableCell>
                        <TableCell
                            align="center"
                            width={COLUMN_WIDTH}
                            onClick={() => handleSort("active_users_price")}
                        >
                            <Box className="display-flex justify-center">
                                <Typography variant="h6">User Price</Typography>
                                {sortField === "active_users_price" ? (
                                    <>
                                        {sortOrder === "asc" ? (
                                            <ArrowUpIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <ArrowDoubleIcon
                                        fontSize="medium"
                                        className="margin-top-4px margin-left-8px"
                                    />
                                )}
                            </Box>
                        </TableCell>
                        <TableCell
                            align="center"
                            width={COLUMN_WIDTH}
                            onClick={() => handleSort("reports_avg")}
                        >
                            <Box className="display-flex justify-center">
                                <Typography variant="h6">Reports</Typography>
                                {sortField === "reports_avg" ? (
                                    <>
                                        {sortOrder === "asc" ? (
                                            <ArrowUpIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <ArrowDoubleIcon
                                        fontSize="medium"
                                        className="margin-top-4px margin-left-8px"
                                    />
                                )}
                            </Box>
                        </TableCell>
                        <TableCell
                            align="center"
                            width={COLUMN_WIDTH}
                            onClick={() => handleSort("attendances_avg")}
                        >
                            <Box className="display-flex justify-center">
                                <Typography variant="h6">
                                    Attendances
                                </Typography>
                                {sortField === "attendances_avg" ? (
                                    <>
                                        {sortOrder === "asc" ? (
                                            <ArrowUpIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                fontSize="medium"
                                                className="margin-top-4px margin-left-8px"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <ArrowDoubleIcon
                                        fontSize="medium"
                                        className="margin-top-4px margin-left-8px"
                                    />
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
                                colSpan={6}
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
    );
};
