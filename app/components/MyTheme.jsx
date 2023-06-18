import { createTheme, css } from "@mui/material/styles";

export const DEFAULT_THEME = "dark";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export const globalStyles = css`
    :root {
        body {
            background-color: #fff;
            color: #121212;
        }
    }

    [data-theme="dark"] {
        body {
            background-color: #121212;
            color: #fff;
        }
    }
`;

// const darkMode = createTheme({
//     palette: {
//         mode: "dark",
//         // primary: {
//         //     light: "#000",
//         //     main: "#000",
//         //     dark: "#000",
//         //     contrastText: "#FFF",
//         // },
//         // secondary: {
//         //     light: "#000",
//         //     main: "#000",
//         //     dark: "#000",
//         //     contrastText: "#FFF",
//         // },
//         // error: {
//         //     light: "#000",
//         //     main: "#000",
//         //     dark: "#000",
//         //     contrastText: "#FFF",
//         // },
//         // warning: {
//         //     light: "#000",
//         //     main: "#000",
//         //     dark: "#000",
//         //     contrastText: "#FFF",
//         // },
//         // info: {
//         //     light: "#000",
//         //     main: "#000",
//         //     dark: "#000",
//         //     contrastText: "#FFF",
//         // },
//         // success: {
//         //     light: "#000",
//         //     main: "#000",
//         //     dark: "#000",
//         //     contrastText: "#FFF",
//         // },
//     },
// });
