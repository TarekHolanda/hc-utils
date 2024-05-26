import React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";

export const MyLoadingRow = (props) => {
    return (
        <TableRow>
            <TableCell align="center" colSpan={props.colSpan} padding="none">
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={props.height}
                />
            </TableCell>
        </TableRow>
    );
};
