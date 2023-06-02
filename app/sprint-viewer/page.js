"use client";

import { useSession, getSession } from "next-auth/react";
import Fade from "@mui/material/Fade";
import { Unauthenticated } from "../components/Unauthenticated";
import { Loading } from "../components/Loading";
import React, { useState, useEffect } from "react";

// Vercel Token
// POV660ATojz8awOcZ6pPGyI1
// async function getData() {
//     const res = await fetch("https://api.publicapis.org/entries");
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.

//     // Recommendation: handle errors
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error("Failed to fetch data");
//     }

//     return res.json();
// }

// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//     const dat = await getData();
//     console.log(dat);

//     return {
//         props: {
//             session,
//             dat,
//         },
//     };
// }

export default function Page() {
    const { data: session, status } = useSession();
    getServerSideProps();
    const [data, setData] = useState([
        {
            id: 1,
            total: 30,
            merged: 15,
            left: 15,
            risky: 2,
            fivePoints: 1,
            threePoints: 2,
            extraDeploy: 1,
        },
        {
            id: 2,
            total: 25,
            merged: 10,
            left: 15,
            risky: 2,
            fivePoints: 1,
            threePoints: 0,
            extraDeploy: 1,
        },
    ]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch("/api/scan-and-go");
    //         const json = await res.json();
    //         setData(json);
    //     };

    //     fetchData();
    // }, []);

    if (status === "loading") {
        return <>{Loading}</>;
    }

    if (status === "unauthenticated" || !session) {
        return <Fade in={status === "unauthenticated"}>{Unauthenticated}</Fade>;
    }

    return (
        <main>
            <h1>Protected Page - Scan & Go</h1>
            <p>You can view this page because you are signed in.</p>
        </main>
    );
}
