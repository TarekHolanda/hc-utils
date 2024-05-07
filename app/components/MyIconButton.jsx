import React from "react";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    "&.blueGrey": {
        backgroundColor: theme.palette.blueGrey.light,
        color: theme.palette.blueGrey.contrastText,
    },
    "&.blueGrey:hover": {
        backgroundColor: theme.palette.blueGrey.dark,
    },
    "&.primary": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    "&.primary:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
    "&.error": {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.blueGrey.contrastText,
    },
    "&.error:hover": {
        backgroundColor: theme.palette.error.dark,
    },
    "&:hover": {
        cursor: "pointer",
    },
}));

export const MyIconButton = ({ color, ...content }) => {
    return <StyledIconButton className={color ? color : ""} {...content} />;
};
