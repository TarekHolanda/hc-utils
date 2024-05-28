import React from "react";

import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { MySortIcon } from "./MySortIcon";

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.grey.dark,
    "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.blueGrey.light,
    },
}));

export const MyHeadCell = (props) => {
    const {
        id,
        label,
        subLabel,
        sortField,
        sortOrder,
        handleSort,
        width = "auto",
    } = props;

    const isValidId = typeof id === "string" && id.trim().length > 0;
    const isSortValid =
        isValidId &&
        handleSort &&
        typeof handleSort === "function" &&
        typeof sortOrder === "string" &&
        typeof sortField === "string";

    const onSortClick = () => {
        if (isSortValid) {
            handleSort(props.id);
        }
    };

    if (!isValidId) {
        return (
            <TableCell width={width}>
                <Box className="display-flex justify-center text-center">
                    <Typography variant="h6" color="error">
                        Error: Invalid ID
                    </Typography>
                </Box>
            </TableCell>
        );
    }

    return (
        <StyledHeadCell width={width || "auto"} onClick={onSortClick}>
            <Box className="display-flex justify-center text-center">
                <Typography variant="h6">{label || id}</Typography>

                {subLabel && (
                    <Typography
                        color="primary"
                        variant="body2"
                        className="margin-top-6px margin-left-8px">
                        {subLabel}
                    </Typography>
                )}

                {isSortValid && (
                    <MySortIcon
                        current={id}
                        order={sortOrder}
                        field={sortField}
                    />
                )}
            </Box>
        </StyledHeadCell>
    );
};
