"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";

function Transition(props) {
    return <Slide {...props} direction="down" />;
}

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [toast, setToast] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const redirect = (path) => () => {
        if (session) {
            setLoading(true);
            router.push(`/${path}`);
        } else {
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 1500);
        }
    };

    return (
        <Fade in={status !== null}>
            <main className={styles.main}>
                <Card
                    className="pointer home-card"
                    onClick={redirect("employee-generator")}
                >
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Employee
                        </Typography>
                        <Typography variant="h6" component="div">
                            Generator
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    className="pointer home-card"
                    onClick={redirect("scan-and-go")}
                >
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Scan & Go
                        </Typography>
                        <Typography variant="h6" component="div">
                            QR Code Generator
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    className="pointer home-card"
                    onClick={redirect("sprint-viewer")}
                >
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Sprints History
                        </Typography>
                        <Typography variant="h6" component="div">
                            Viewer
                        </Typography>
                    </CardContent>
                </Card>

                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={status === "loading" || loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Snackbar
                    open={toast}
                    onClick={() => setToast(false)}
                    severity="warning"
                    className="pointer"
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    TransitionComponent={Transition}
                >
                    <Alert severity="warning">You need to sign in first.</Alert>
                </Snackbar>
            </main>
        </Fade>
    );
}
