"use client";

import { useSession, getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Fade from "@mui/material/Fade";
import { MyUnauthenticated } from "../components/MyUnauthenticated";
import { MyLoading } from "../components/MyLoading";
import React, { useState, useEffect } from "react";

export default function Page() {
    const { data: session, status } = useSession();

    // TODO
    // Redirect to home if authenticated

    if (status === "loading") {
        return <>{MyLoading}</>;
    }

    if (status === "unauthenticated" || !session) {
        return (
            <Fade in={status === "unauthenticated"}>{MyUnauthenticated}</Fade>
        );
    }

    return (
        <main>
            <h1>Protected Page - Scan & Go</h1>
            <p>You can view this page because you are signed in.</p>
        </main>
    );
}
