"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { MyLoading } from "../components/MyLoading";

// TODO
// Sprint History: last 5, last 20, time range, delayed/not delayed, how to rank worst and best?

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

// Get list of sprints from API
// const [sprints, setSprints] = useState([]);
// useEffect(() => {
//     fetch("http://localhost:8000/hc/test")
//         // fetch("http://127.0.0.1:8000/hc/test")
//         .then((response) => response.json())
//         .then((data) => {
//             if (data.status !== 404) {
//                 // Showw toast error
//                 console.log("Deu ruim!!!");
//                 console.log(data);
//             }

//             console.log("Deu bom!!!");
//             console.log(data);
//             setSprints(data);
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// }, []);
// console.log(sprints);

// useEffect(() => {
//     const fetchData = async () => {
//         const res = await fetch("/api/scan-and-go");
//         const json = await res.json();
//         setData(json);
//     };

//     fetchData();
// }, []);
