import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            light: "#757ce8",
            main: "#1B1C1E",
            darker: "#053e85",
            dark: "#34495E",
            contrastText: "#fff",
        },
        neutral: {
            main: "#64748B",
            contrastText: "#fff",
        },
    },
});
