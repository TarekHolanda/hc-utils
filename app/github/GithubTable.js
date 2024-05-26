import React from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { MyHeadCell } from "../components/MyHeadCell";
import { GithubTableBody } from "./GithubTableBody";

export const GithubTable = ({
    devs,
    sortedDevs,
    handleSort,
    sortField,
    sortOrder,
    loadingPRs,
}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <MyHeadCell
                            label="Name"
                            id="name"
                            handleSort={handleSort}
                            sortField={sortField}
                            sortOrder={sortOrder}
                        />

                        <MyHeadCell
                            label="Code Reviews"
                            id="reviews"
                            handleSort={handleSort}
                            sortField={sortField}
                            sortOrder={sortOrder}
                        />

                        <MyHeadCell
                            label="Approvals"
                            id="approved"
                            handleSort={handleSort}
                            sortField={sortField}
                            sortOrder={sortOrder}
                        />

                        <MyHeadCell
                            label="Changes Requested"
                            id="changesRequested"
                            handleSort={handleSort}
                            sortField={sortField}
                            sortOrder={sortOrder}
                        />

                        <MyHeadCell
                            label="Pull Requests"
                            id="pullRequests"
                            handleSort={handleSort}
                            sortField={sortField}
                            sortOrder={sortOrder}
                        />
                    </TableRow>
                </TableHead>

                <GithubTableBody
                    devs={devs}
                    sortedDevs={sortedDevs}
                    loadingPRs={loadingPRs}
                />
            </Table>
        </TableContainer>
    );
};
