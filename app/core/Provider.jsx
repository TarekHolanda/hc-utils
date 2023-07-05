"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { CssBaseline } from "@mui/material";
import { GlobalStyles } from "@mui/material";
import { CacheProvider } from "@emotion/react";

import MyThemeProvider from "../components/MyThemeProvider";
import { globalStyles } from "../components/MyTheme";
import MyEmotionCache from "../components/MyEmotionCache";

const clientSideEmotionCache = MyEmotionCache();

const Provider = ({ children }) => {
    return (
        <ThemeProvider>
            <CacheProvider value={clientSideEmotionCache}>
                <MyThemeProvider>
                    <CssBaseline />
                    <GlobalStyles styles={globalStyles} />
                    <SessionProvider>{children}</SessionProvider>
                </MyThemeProvider>
            </CacheProvider>
        </ThemeProvider>
    );
};

export default Provider;
