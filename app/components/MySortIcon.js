import React from "react";

import ArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDoubleIcon from "@mui/icons-material/UnfoldMore";

export const MySortIcon = (props) => {
    return (
        <>
            {props.current === props.field ? (
                <>
                    {props.order === "asc" ? (
                        <ArrowUpIcon
                            fontSize="medium"
                            className="margin-top-4px margin-left-8px"
                        />
                    ) : (
                        <ArrowDownIcon
                            fontSize="medium"
                            className="margin-top-4px margin-left-8px"
                        />
                    )}
                </>
            ) : (
                <ArrowDoubleIcon
                    fontSize="medium"
                    className="margin-top-4px margin-left-8px"
                />
            )}
        </>
    );
};
