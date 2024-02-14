"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";
import { getPullRequestsAndReviews } from "./getPullRequestsAndReviews";

export default function Page({ data }) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        getPullRequestsAndReviews()
            .then((devs) => {
                setDevs(devs);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false);
            });
    }, []);

    if (status === "loading" || loading) {
        return <MyLoading loading={true} />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    return (
        <>
            <Container>
                <MySpacer vertical size={32} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Who</TableCell>
                                <TableCell align="center">
                                    Pull Requests
                                </TableCell>
                                <TableCell align="center">
                                    Code Reviews
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(devs).map((dev) => {
                                return (
                                    <TableRow
                                        key={dev}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}>
                                        <TableCell component="th" scope="row">
                                            {devs[dev].name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {devs[dev].pullRequests}
                                        </TableCell>
                                        <TableCell align="center">
                                            {devs[dev].reviews}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <MySpacer vertical size={32} />
            </Container>
        </>
    );
}
