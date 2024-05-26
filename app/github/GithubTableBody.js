import React from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { MyLoadingRow } from "../components/MyLoadingRow";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    height: 64,
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.blueGrey.main,
    },
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.blueGrey.dark,
    },
    "&:hover": {
        backgroundColor: theme.palette.blueGrey.light,
    },
}));

export const GithubTableBody = ({ devs, sortedDevs, loadingPRs }) => {
    return (
        <TableBody>
            {loadingPRs ? (
                <MyLoadingRow colSpan={5} height={64} />
            ) : (
                <>
                    {sortedDevs.map((dev) => (
                        <StyledTableRow key={dev}>
                            <TableCell component="th" scope="row">
                                <Typography variant="body1">
                                    {devs[dev].name}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography variant="body1">
                                    {devs[dev].reviews}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography variant="body1">
                                    {devs[dev].approved}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography variant="body1">
                                    {devs[dev].changesRequested}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography variant="body1">
                                    {devs[dev].pullRequests}
                                </Typography>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </>
            )}
        </TableBody>
    );
};
