"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { MyLoading } from "../components/MyLoading";

export default function Page() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <>{MyLoading}</>;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    redirect("/");
}
