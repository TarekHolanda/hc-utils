import { signIn } from "next-auth/react";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";

const SignInButton = () => {
    const callbackUrl = process.env.NEXTAUTH_URL;

    return (
        <IconButton
            aria-label="sign in"
            style={{ color: "#fff" }}
            onClick={() => signIn("google", { callbackUrl })}
        >
            <LoginIcon />
        </IconButton>
    );
};

export default SignInButton;
