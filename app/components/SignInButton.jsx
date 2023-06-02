import { signIn } from "next-auth/react";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { MyTooltip } from "./MyTooltip";

const SignInButton = () => {
    const callbackUrl = process.env.NEXTAUTH_URL;

    return (
        <MyTooltip title="Sign in" placement="left">
            <IconButton
                aria-label="sign in"
                style={{ color: "#fff" }}
                onClick={() => signIn("google", { callbackUrl })}
            >
                <LoginIcon />
            </IconButton>
        </MyTooltip>
    );
};

export default SignInButton;
