"use client";

import React from "react";

import Link from "next/link";
import Grid from "@mui/material/Grid";

import { MyLink } from "./MyLink";
import { MySpacer } from "../components/MySpacer";

export const MyHomeLinks = ({ path }) => {
    return (
        <>
            <MySpacer size={32} vertical />

            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12} // 0 to 600
                    sm={6} // 600 to 900
                    md={4} // 900 to 1200
                    lg={3} // 1200 to 1536
                    xl={3} // 1536px and up
                    className="display-flex justify-center"
                >
                    <Link href={"/employee-generator"}>
                        <MyLink path={"employee-generator"} />
                    </Link>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                    className="display-flex justify-center"
                >
                    <Link href={"/scan-and-go"}>
                        <MyLink path={"scan-and-go"} />
                    </Link>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                    className="display-flex justify-center"
                >
                    <Link href={"/email-signature"}>
                        <MyLink path={"email-signature"} />
                    </Link>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    lg={3}
                    xl={3}
                    className="display-flex justify-center"
                >
                    <Link href={"/sprint-viewer"}>
                        <MyLink path={"sprint-viewer"} />
                    </Link>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    lg={3}
                    xl={3}
                    className="display-flex justify-center"
                >
                    <Link href={"/resources"}>
                        <MyLink path={"resources"} />
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};
