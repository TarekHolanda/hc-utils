import { ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./MyTheme";

const MyThemeProvider = ({ children }) => {
    const { resolvedTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(darkTheme);

    useEffect(() => {
        resolvedTheme === "light"
            ? setCurrentTheme(lightTheme)
            : setCurrentTheme(darkTheme);
    }, [resolvedTheme]);

    return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default MyThemeProvider;
