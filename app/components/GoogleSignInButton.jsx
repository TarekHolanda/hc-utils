"use client";

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";

const GoogleSignInButton = () => {
    const callbackUrl = process.env.NEXTAUTH_URL;

    return (
        <Button
            variant="contained"
            onClick={() => signIn("google", { callbackUrl })}
        >
            Sign in with Google
        </Button>
    );
};

export default GoogleSignInButton;
