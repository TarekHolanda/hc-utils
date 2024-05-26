import React from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { MyHeadCell } from "../components/MyHeadCell";
import { MyLoadingRow } from "../components/MyLoadingRow";
import { XrayRow } from "./XrayRow";
import {
    COLUMN_WIDTH_LG,
    COLUMN_WIDTH_MD,
    COLUMN_WIDTH_SM,
} from "../utils/constants";

export const XrayTable = ({
    loading,
    customers,
    filterMonths,
    sortField,
    sortOrder,
    handleSort,
    handleOpenDialog,
}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <MyHeadCell
                            id="name"
                            label={`Last ${filterMonths} months`}
                            subLabel={`(${customers.length})`}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            width={COLUMN_WIDTH_LG}
                        />

                        <MyHeadCell
                            id="mrr"
                            label={"MRR"}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            width={COLUMN_WIDTH_MD}
                        />

                        <MyHeadCell
                            id="active_users_avg"
                            label={"Users"}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            width={COLUMN_WIDTH_MD}
                        />

                        <MyHeadCell
                            id="active_users_price"
                            label={"User Price"}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            width={COLUMN_WIDTH_MD}
                        />

                        <MyHeadCell
                            id="reports_avg"
                            label={"Reports"}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            width={COLUMN_WIDTH_MD}
                        />

                        <MyHeadCell
                            id="attendances_crew_avg"
                            label={"Att. Crew"}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            width={COLUMN_WIDTH_MD}
                        />

                        <MyHeadCell
                            id="attendances_individual_avg"
                            label={"Att. Support"}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            width={COLUMN_WIDTH_MD}
                        />

                        <MyHeadCell
                            id="status"
                            label={"Status"}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            width={COLUMN_WIDTH_SM}
                        />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loading ? (
                        <MyLoadingRow colSpan={8} height={64} />
                    ) : (
                        <>
                            {customers.map((customer, index) => (
                                <XrayRow
                                    key={customer.id}
                                    customer={customer}
                                    index={index}
                                    handleOpenDialog={handleOpenDialog}
                                />
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
