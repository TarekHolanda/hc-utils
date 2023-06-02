import React from "react";
import Box from "@mui/material/Box";

export const Spacer = ({ horizontal, size }) => {
    const defaultValue = "auto";

    return (
        <Box
            sx={{
                width: horizontal ? size : defaultValue,
                height: !horizontal ? size : defaultValue,
                display: "inline-block",
            }} />
    );
};
