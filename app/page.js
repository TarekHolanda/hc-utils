"use client";

import { useSession, signOut } from "next-auth/react";
import styles from "./page.module.css";
import GoogleSignInButton from "./components/GoogleSignInButton";
import Typography from "@mui/material/Typography";

export default function Home() {
    const { data: session } = useSession();

    return (
        <main className={styles.main}>
            <div style={{ justifyContent: "center" }}>
                {session ? (
                    <div as="div" className="relative">
                        <div>Welcome {session.user.name}</div>
                    </div>
                ) : (
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        style={{ textAlign: "center" }}
                    >
                        HeavyConnect Employees Only
                    </Typography>
                )}
            </div>
        </main>
    );
}
