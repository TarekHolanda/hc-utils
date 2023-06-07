"use client";

import React from "react";
import { useSession } from "next-auth/react";
import styles from "./styles/page.module.css";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fade from "@mui/material/Fade";
import { redirect } from "next/navigation";
import { MyLoading } from "./components/MyLoading";
import Link from "next/link";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";

export default function Home() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <>{MyLoading}</>;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    return (
        <Fade in={status !== null}>
            <main className={styles.main}>
                <Link href="/employee-generator">
                    <Card className="pointer home-card">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="152"
                                image="./farm-worker.jpg"
                                alt="farm worker"
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    Employee Generator
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    QR Codes with Names and IDs for Employees
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>

                <Link href="/scan-and-go">
                    <Card className="pointer home-card">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="152"
                                image="./qrcode.jpg"
                                alt="qr code"
                            />
                            <CardContent>
                                <Typography variant="h6">Scan & Go</Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    QR Codes to auto populate checklists,
                                    locations, and more
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>

                <Link href="/sprint-viewer">
                    <Card className="pointer home-card">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="152"
                                image="./chart.jpg"
                                alt="chart"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Sprints History
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Review past sprints and their details, and
                                    plan the next one
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </main>
        </Fade>
    );
}
