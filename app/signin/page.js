"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import { MyLoading } from "../components/MyLoading";
import SignInCard from "../core/SignInCard";

export default function Page() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <MyLoading loading={true} />;
    }

    if (status === "unauthenticated" || !session) {
        return (
            <Fade in={true} timeout={1000}>
                <Box className="display-flex justify-center padding-2rem">
                    <SignInCard />
                </Box>
            </Fade>
        );
    }

    redirect("/");
}
