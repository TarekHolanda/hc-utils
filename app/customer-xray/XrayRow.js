import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import styled from "@mui/material/styles/styled";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import EditIcon from "@mui/icons-material/Edit";

import { formatDate } from "../utils/formatDate";
import {
    CUSTOMER_STATUS,
    USE_CASE,
    COLUMN_WIDTH_LG,
    COLUMN_WIDTH_MD,
    COLUMN_WIDTH_SM,
} from "../utils/constants";

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
    "& td.good": {
        backgroundColor: theme.palette.success.main,
    },
    "& td.onboarding": {
        backgroundColor: theme.palette.info.dark,
    },
    "& td.churn": {
        backgroundColor: theme.palette.warning.light,
    },
    "& td.inactive": {
        backgroundColor: theme.palette.warning.main,
    },
    "& td.high-risk": {
        backgroundColor: theme.palette.error.dark,
    },
    "& td.medium-risk": {
        backgroundColor: theme.palette.error.main,
    },
    "& td.low-risk": {
        backgroundColor: theme.palette.error.light,
    },
}));

const StyledInternalRow = styled(TableRow)(({ theme }) => ({
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const MyMenu = ({ anchorEl, open, handleCloseMenu, handleEdit }) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
            disableScrollLock={true}
        >
            <MenuItem
                onClick={handleEdit}
                sx={{ width: 320, maxWidth: "100%" }}
            >
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
            </MenuItem>
        </Menu>
    );
};

export const XrayRow = ({ customer, index, handleOpenDialog }) => {
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleOpenDialog(customer);
        handleCloseMenu();
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <StyledTableRow
                className={expanded ? "expanded" : ""}
                onClick={handleExpand}
            >
                <TableCell onContextMenu={handleContextMenu}>
                    {index + 1}. {customer.name}
                </TableCell>
                <TableCell align="center" onContextMenu={handleContextMenu}>
                    ${customer.mrr.toFixed(2)}
                </TableCell>
                <TableCell align="center" onContextMenu={handleContextMenu}>
                    {customer.active_users_avg.toFixed(2)}
                </TableCell>
                <TableCell align="center" onContextMenu={handleContextMenu}>
                    <Typography
                        variant="body2"
                        color={
                            customer.active_users_price > 100 ||
                            !customer.active_users_price
                                ? "error"
                                : "primary"
                        }
                    >
                        ${customer.active_users_price.toFixed(2)}
                    </Typography>
                </TableCell>
                <TableCell align="center" onContextMenu={handleContextMenu}>
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
                <TableCell align="center" onContextMenu={handleContextMenu}>
                    {customer.attendances_crew_avg.toFixed(2)}

                    <Typography color="primary" variant="body2">
                        {customer.attendances_crew_avg > 0 ? (
                            <>
                                $
                                {(
                                    customer.mrr / customer.attendances_crew_avg
                                ).toFixed(2)}
                            </>
                        ) : (
                            "-"
                        )}
                    </Typography>
                </TableCell>
                <TableCell align="center" onContextMenu={handleContextMenu}>
                    {customer.attendances_individual_avg.toFixed(2)}

                    <Typography color="primary" variant="body2">
                        {customer.attendances_individual_avg > 0 ? (
                            <>
                                $
                                {(
                                    customer.mrr /
                                    customer.attendances_individual_avg
                                ).toFixed(2)}
                            </>
                        ) : (
                            "-"
                        )}
                    </Typography>
                </TableCell>
                <TableCell
                    align="center"
                    onContextMenu={handleContextMenu}
                    className={CUSTOMER_STATUS[customer.status].class}
                >
                    {CUSTOMER_STATUS[customer.status].label}
                </TableCell>
            </StyledTableRow>

            <StyledTableRow>
                <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Table size="small">
                            <TableBody>
                                {customer.details.map((detail) => (
                                    <StyledInternalRow key={detail.date}>
                                        {detail.date ===
                                            customer.details[0].date && (
                                            <TableCell
                                                align="center"
                                                width={COLUMN_WIDTH_LG}
                                                rowSpan={
                                                    customer.details.length
                                                }
                                            >
                                                <Typography variant="body2">
                                                    {customer.comment}
                                                </Typography>
                                            </TableCell>
                                        )}

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}
                                        >
                                            <Typography variant="body2">
                                                {formatDate(detail.date)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}
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
                                            width={COLUMN_WIDTH_MD}
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
                                            width={COLUMN_WIDTH_MD}
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
                                            width={COLUMN_WIDTH_MD}
                                        >
                                            <Typography
                                                color="primary"
                                                variant="body2"
                                            >
                                                {detail.attendances_crew.toFixed(
                                                    2
                                                )}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}
                                        >
                                            <Typography
                                                color="primary"
                                                variant="body2"
                                            >
                                                {detail.attendances_individual.toFixed(
                                                    2
                                                )}
                                            </Typography>
                                        </TableCell>

                                        {detail.date ===
                                            customer.details[0].date && (
                                            <TableCell
                                                align="center"
                                                width={COLUMN_WIDTH_LG}
                                                rowSpan={
                                                    customer.details.length
                                                }
                                            >
                                                <Typography variant="body2">
                                                    {customer.use_inspector &&
                                                        "Inspector, "}
                                                    {customer.use_timekeeper &&
                                                        "TimeKeeper, "}
                                                    {customer.use_training &&
                                                        "Training, "}
                                                    {customer.use_analytics &&
                                                        "Analytics, "}
                                                    {customer.use_selfaudit &&
                                                        "Self Audit"}
                                                </Typography>
                                            </TableCell>
                                        )}
                                    </StyledInternalRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </StyledTableRow>

            <MyMenu
                anchorEl={anchorEl}
                open={open}
                handleCloseMenu={handleCloseMenu}
                handleEdit={handleEdit}
            />
        </>
    );
};
