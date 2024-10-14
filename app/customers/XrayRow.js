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
    "&.row-even": {
        backgroundColor: theme.palette.blueGrey.main,
    },
    "&.row-odd": {
        backgroundColor: theme.palette.blueGrey.dark,
    },
    "&.row-even:hover, &.row-odd:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.blueGrey.light,
    },
    "& td.good": {
        backgroundColor: theme.palette.success.main,
    },
    "& td.recently-deployed": {
        backgroundColor: theme.palette.info.dark,
    },
    "& td.onboarding": {
        backgroundColor: theme.palette.secondary.dark,
    },
    "& td.risky": {
        backgroundColor: theme.palette.error.main,
    },
    "& td.onboard-at-risk": {
        backgroundColor: theme.palette.error.main,
    },
    "& td.new-deal": {
        backgroundColor: theme.palette.cyan.main,
    },
    "& td.ganaz": {
        backgroundColor: theme.palette.warning.dark,
    },
    "& td.churned": {
        backgroundColor: theme.palette.grey.main,
    },
    "& td.other": {
        backgroundColor: theme.palette.grey.light,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const StyledInternalRow = styled(TableRow)(({ theme }) => ({
    "& td": {
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
            disableScrollLock={true}>
            <MenuItem
                onClick={handleEdit}
                sx={{ width: 320, maxWidth: "100%" }}>
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

    const handleEdit = (event) => {
        event.preventDefault();
        handleOpenDialog(customer);
        handleCloseMenu();
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const getUseCases = () => {
        const useCases = [
            customer.use_inspector && "Inspector",
            customer.use_timekeeper && "TimeKeeper",
            customer.use_training && "Training",
            customer.use_analytics && "Analytics",
            customer.use_selfaudit && "Self Audit"
        ].filter(Boolean);
    
        if (useCases.length > 0) {
            return `(${useCases.join(", ")})`;
        }

        return "";
    };

    return (
        <>
            <StyledTableRow
                className={`${expanded ? "expanded" : ""} ${
                    index % 2 === 0 ? "row-even" : "row-odd"
                }`}
                onClick={handleExpand}
                id={"customer-row-" + customer.id}
                >
                <TableCell onContextMenu={handleEdit}>
                    <Typography variant="body1">
                        {index + 1}. {customer.name}
                    </Typography>
                </TableCell>

                <TableCell align="center" onContextMenu={handleEdit}>
                    <Typography variant="body1">
                        ${customer.mrr.toFixed(2)}
                    </Typography>
                </TableCell>

                <TableCell align="center" onContextMenu={handleEdit}>
                    <Typography variant="body1">
                        {customer.active_users_avg.toFixed(2)}
                    </Typography>
                </TableCell>

                <TableCell align="center" onContextMenu={handleEdit}>
                    <Typography
                        variant="body1"
                        color={
                            customer.active_users_price > 100 ||
                            !customer.active_users_price
                                ? "error"
                                : "primary"
                        }>
                        ${customer.active_users_price.toFixed(2)}
                    </Typography>
                </TableCell>

                <TableCell align="center" onContextMenu={handleEdit}>
                    <Typography variant="body1">
                        {customer.reports_avg.toFixed(2)}
                    </Typography>

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

                <TableCell align="center" onContextMenu={handleEdit}>
                    <Typography variant="body1">
                        {customer.timecards_crew_avg.toFixed(2)}
                    </Typography>

                    <Typography color="primary" variant="body2">
                        {customer.timecards_crew_avg > 0 ? (
                            <>
                                $
                                {(
                                    customer.mrr / customer.timecards_crew_avg
                                ).toFixed(2)}
                            </>
                        ) : (
                            "-"
                        )}
                    </Typography>
                </TableCell>

                <TableCell align="center" onContextMenu={handleEdit}>
                    <Typography variant="body1">
                        {customer.timecards_individual_avg.toFixed(2)}
                    </Typography>

                    <Typography color="primary" variant="body2">
                        {customer.timecards_individual_avg > 0 ? (
                            <>
                                $
                                {(
                                    customer.mrr /
                                    customer.timecards_individual_avg
                                ).toFixed(2)}
                            </>
                        ) : (
                            "-"
                        )}
                    </Typography>
                </TableCell>

                <TableCell align="center" onContextMenu={handleEdit}>
                    <Typography variant="body1">
                        {customer.employees_tracked_avg.toFixed(2)}
                    </Typography>

                    <Typography color="primary" variant="body2">
                        {customer.employees_tracked_avg > 0 ? (
                            <>
                                $
                                {(
                                    customer.mrr /
                                    customer.employees_tracked_avg
                                ).toFixed(2)}
                            </>
                        ) : (
                            "-"
                        )}
                    </Typography>
                </TableCell>

                <TableCell align="center" onContextMenu={handleEdit}>
                    <Typography variant="body1">
                        {customer.employees_exported_avg.toFixed(2)}
                    </Typography>

                    <Typography color="primary" variant="body2">
                        {customer.employees_exported_avg > 0 ? (
                            <>
                                $
                                {(
                                    customer.mrr /
                                    customer.employees_exported_avg
                                ).toFixed(2)}
                            </>
                        ) : (
                            "-"
                        )}
                    </Typography>
                </TableCell>

                <TableCell
                    align="center"
                    onContextMenu={handleEdit}
                    className={CUSTOMER_STATUS[customer.status].class}>
                    <Typography variant="body1">
                        {CUSTOMER_STATUS[customer.status].label}
                    </Typography>
                </TableCell>
            </StyledTableRow>

            <StyledTableRow>
                <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={10}>
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
                                                className="no-border"
                                                rowSpan={
                                                    customer.details.length
                                                }>
                                                <Typography variant="body2">
                                                    {customer.comment}
                                                </Typography>
                                            </TableCell>
                                        )}

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}>
                                            <Typography variant="body2">
                                                {formatDate(detail.date)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}>
                                            <Typography
                                                color="primary"
                                                variant="body2">
                                                {detail.active_users.toFixed(2)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}>
                                            {detail.active_users > 0 ? (
                                                <Typography
                                                    color="primary"
                                                    variant="body2">
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
                                            width={COLUMN_WIDTH_MD}>
                                            <Typography
                                                color="primary"
                                                variant="body2">
                                                {detail.reports.toFixed(2)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}>
                                            <Typography
                                                color="primary"
                                                variant="body2">
                                                {detail.timecards_crew.toFixed(
                                                    2
                                                )}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}>
                                            <Typography
                                                color="primary"
                                                variant="body2">
                                                {detail.timecards_individual.toFixed(
                                                    2
                                                )}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}>
                                            <Typography
                                                color="primary"
                                                variant="body2">
                                                {detail.employees_tracked.toFixed(
                                                    2
                                                )}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            width={COLUMN_WIDTH_MD}>
                                            <Typography
                                                color="primary"
                                                variant="body2">
                                                {detail.employees_exported.toFixed(
                                                    2
                                                )}
                                            </Typography>
                                        </TableCell>

                                        {detail.date ===
                                            customer.details[0].date && (
                                            <TableCell
                                                align="center"
                                                width={COLUMN_WIDTH_SM}
                                                className="no-border"
                                                rowSpan={customer.details.length}>
                                                <Typography variant="body2">
                                                    {customer.children.join(", ")}
                                                </Typography>
                                                
                                                <Typography variant="caption">
                                                    {getUseCases()}
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
