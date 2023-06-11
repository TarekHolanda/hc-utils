"use client";

import React, { PureComponent } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { MyLoading } from "../components/MyLoading";
import Box from "@mui/material/Box";
// import { LineChart, Line, BarChart, Bar } from "recharts";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 200, pv: 2500, amt: 2300 },
    { name: "Page C", uv: 300, pv: 2000, amt: 2500 },
    { name: "Page D", uv: 100, pv: 2500, amt: 2200 },
    { name: "Page E", uv: 500, pv: 2300, amt: 2300 },
];

const SPRINTS = [
    {
        id: 1,
        name: "Sprint #105",
        index: 105,
        totalPoints: 24,
        pointsLeft: 10,
        tasksRisky: 4,
        tasksFive: 1,
        tasksThree: 0,
        deploysExtra: 1,
    },
    {
        id: 2,
        name: "Sprint #104",
        index: 104,
        totalPoints: 22,
        pointsLeft: 6,
        tasksRisky: 8,
        tasksFive: 1,
        tasksThree: 1,
        deploysExtra: 0,
    },
];

const renderChart = (
    // <LineChart width={400} height={400} data={data}>
    //     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    // </LineChart>
    <BarChart width={800} height={600} data={SPRINTS}>
        <XAxis dataKey="name" />
        <Bar dataKey="totalPoints" fill="#8884d8" />
        <Bar dataKey="pointsLeft" fill="#ddd" />
    </BarChart>
);

export default function Page() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <>{MyLoading}</>;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    // redirect("/");
    // overflow: hidden; // esconder scroll

    return (
        <>
            <Box
                sx={{ width: "1024px", height: "800px" }}
                className="display-block"
            >
                {renderChart}
            </Box>
        </>
    );
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
