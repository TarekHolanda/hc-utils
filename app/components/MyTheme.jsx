import { createTheme, css } from "@mui/material/styles";
import {
    blueGrey,
    cyan,
    lightGreen,
    grey,
    yellow,
    red,
    teal,
    purple,
} from "@mui/material/colors";

export const DEFAULT_THEME = "dark";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        blueGrey: {
            light: blueGrey[50],
            main: blueGrey[100],
            dark: blueGrey[200],
            contrastText: blueGrey[900],
        },
        cyan: {
            light: cyan[300],
            main: cyan[500],
            dark: cyan[700],
            contrastText: cyan[50],
        },
        grey: {
            light: grey[500],
            main: grey[700],
            dark: grey[900],
            contrastText: grey[50],
        },
        warning: {
            light: yellow[50],
            main: yellow[800],
            dark: yellow[900],
            contrastText: yellow[900],
        },
        background: {
            paper: grey[200],
            // default: "#fff",
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: grey[200],
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        blueGrey: {
            light: blueGrey[500],
            main: blueGrey[800],
            dark: blueGrey[900],
            contrastText: blueGrey[50],
        },
        cyan: {
            light: cyan[300],
            main: cyan[500],
            dark: cyan[700],
            contrastText: cyan[50],
        },
        grey: {
            light: grey[500],
            main: grey[700],
            dark: grey[900],
            contrastText: grey[50],
        },
        // lightGreen: {
        //     light: lightGreen["A100"],
        //     main: lightGreen["A200"],
        //     dark: lightGreen["A300"],
        //     contrastText: lightGreen["A700"],
        // },
        // common: {
        //     black: purple[500],
        //     white: purple[500],
        // },
        // primary: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#fff",
        // },
        // secondary: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#fff",
        // },
        // error: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#fff",
        // },
        warning: {
            light: yellow[300],
            main: yellow[500],
            dark: yellow[900],
            contrastText: yellow[50],
        },
        // info: {
        //     light: "#000",
        //     main: "#000",
        //     dark: "#000",
        //     contrastText: "#fff",
        // },
        // success: {
        //     light: green[300],
        //     main: green[500],
        //     dark: green[700],
        //     contrastText: "#fff",
        // },
        text: {
            primary: cyan[50],
            // secondary: rgba(255, 255, 255, 0.7),
            secondary: cyan[500],
            // disabled: rgba(255, 255, 255, 0.5),
            disabled: cyan[900],
            // icon: rgba(255, 255, 255, 0.5),
            icon: cyan[900],
        },
        // divider: rgba(255, 255, 255, 0.12),
        background: {
            paper: grey[900],
            // default: "#121212",
        },
        // action: {
        // active: "#fff",
        // hover: rgba(255, 255, 255, 0.08),
        // hoverOpacity: 0.08,
        // selected: rgba(255, 255, 255, 0.16),
        // selectedOpacity: 0.16,
        // disabled: rgba(255, 255, 255, 0.3),
        // disabledBackground: rgba(255, 255, 255, 0.12),
        // disabledOpacity: 0.38,
        // focus: rgba(255, 255, 255, 0.12),
        // focusOpacity: 0.12,
        // activatedOpacity: 0.24,
        // active: "#9c27b0",
        // hover: "#9c27b0",
        // hoverOpacity: 0.08,
        // selected: "#9c27b0",
        // selectedOpacity: 0.16,
        // disabled: "#9c27b0",
        // disabledBackground: "#9c27b0",
        // disabledOpacity: 0.38,
        // focus: "#9c27b0",
        // focusOpacity: 0.12,
        // activatedOpacity: 0.24,
        // },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: grey[900],
                },
            },
        },
    },
});
