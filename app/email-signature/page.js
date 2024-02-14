"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import DOMPurify from "dompurify";

import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";
import { MyEmailSignature } from "./MyEmailSignature";

let dompurify = DOMPurify();

export default function Page() {
    const { data: session, status } = useSession();
    const [name, setName] = useState("Tárek Holanda");
    const [role, setRole] = useState("Head of Product");
    const [email, setEmail] = useState("tarek@heavyconnect.com");
    const [phone, setPhone] = useState("");
    const [toast, setToast] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            dompurify = DOMPurify(window);
        }
    }, []);

    const rawHTML = MyEmailSignature(name, role, email, phone);

    const updateName = (event) => {
        setName(event.target.value);
    };

    const updateRole = (event) => {
        setRole(event.target.value);
    };

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };

    const updatePhone = (event) => {
        setPhone(event.target.value);
    };

    const CopyToClipboard = () => {
        const doc = document;
        const text = doc.getElementById("signature");
        let range;
        let selection;

        if (typeof window === "undefined") {
            dompurify = DOMPurify(window);

            setTimeout(() => {
                CopyToClipboard();
            }, 1000);
        } else {
            selection = window.getSelection();
            range = doc.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 1500);
        }
    };

    if (status === "loading") {
        return <MyLoading />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    return (
        <>
            <Box sx={{ width: "100%", height: 64 }}>
                <MySpacer vertical size={8} />

                <Container fixed sx={{ textAlign: "right" }}>
                    <Button
                        variant="outlined"
                        onClick={() => CopyToClipboard()}
                        startIcon={<ContentCopyIcon />}>
                        Copy
                    </Button>
                </Container>
            </Box>

            <Container>
                {
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(rawHTML),
                        }}
                        id="signature"
                        style={{ background: "white", padding: "16px" }}
                        onClick={(event) => event.preventDefault()}
                    />
                }

                <MySpacer vertical size={64} />

                <Box component="form" sx={{ display: "flex" }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={updateName}
                    />

                    <MySpacer horizontal size={32} />

                    <TextField
                        label="Role"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={updateRole}
                    />
                </Box>

                <MySpacer vertical size={32} />

                <Box component="form" sx={{ display: "flex" }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={updateEmail}
                    />

                    <MySpacer horizontal size={32} />

                    <TextField
                        label="Phone"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={updatePhone}
                    />
                </Box>
            </Container>

            <Snackbar
                open={toast}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert severity="info" variant="filled">
                    Copied to clipboard
                </Alert>
            </Snackbar>
        </>
    );
}
