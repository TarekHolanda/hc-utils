import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import styled from "@mui/material/styles/styled";
import TableRow from "@mui/material/TableRow";

import { formatDate } from "../utils/formatDate";

const COLUMN_WIDTH = "16%";

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

export const CustomerRow = ({ customer }) => {
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
                    <Typography
                        variant="body2"
                        color={
                            customer.active_users_price > 75 ||
                            !customer.active_users_price
                                ? "error"
                                : "primary"
                        }
                    >
                        ${customer.active_users_price.toFixed(2)}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    {customer.reports_avg.toFixed(2)}

                    <Typography color="primary" variant="body2">
                        {customer.reports_avg > 0 ? (
                            <>
                                $
                                {(customer.mrr / customer.reports_avg).toFixed(
                                    2
                                )}
                            </>
                        ) : (
                            "-"
                        )}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    {customer.attendances_avg.toFixed(2)}

                    <Typography color="primary" variant="body2">
                        {customer.attendances_avg > 0 ? (
                            <>
                                $
                                {(
                                    customer.mrr / customer.attendances_avg
                                ).toFixed(2)}
                            </>
                        ) : (
                            "-"
                        )}
                    </Typography>
                </TableCell>
            </StyledTableRow>
            <StyledTableRow onClick={handleExpand}>
                <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Table size="small">
                            <TableBody>
                                {customer.details.map((detail) => (
                                    <StyledInternalRow key={detail.date}>
                                        <TableCell align="center" width={"20%"}>
                                            <Typography></Typography>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH}
                                        >
                                            <Typography variant="body2">
                                                {formatDate(detail.date)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH}
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
                                            width={COLUMN_WIDTH}
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
                                                    ).toFixed(2)}
                                                </Typography>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH}
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
                                            width={COLUMN_WIDTH}
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
