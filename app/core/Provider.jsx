"use client";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { createTheme } from "@mui/material/styles";

const darkMode = createTheme({
    palette: {
        mode: "dark",
        // primary: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#FFF",
        // },
        // secondary: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#FFF",
        // },
        // error: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#FFF",
        // },
        // warning: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#FFF",
        // },
        // info: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#FFF",
        // },
        // success: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#FFF",
        // },
    },
});

const Provider = ({ children }) => {
    return (
        <ThemeProvider theme={darkMode}>
            <CssBaseline />
            <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
    );
};

export default Provider;
