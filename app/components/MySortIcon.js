import React from "react";

import ArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDoubleIcon from "@mui/icons-material/UnfoldMore";

export const MySortIcon = (props) => {
    const iconClasses =
        "position-absolute right-0 top-0 bottom-0 margin-auto-0";

    return (
        <>
            {props.current === props.field ? (
                <>
                    {props.order === "asc" ? (
                        <ArrowUpIcon
                            fontSize="medium"
                            className={iconClasses}
                        />
                    ) : (
                        <ArrowDownIcon
                            fontSize="medium"
                            className={iconClasses}
                        />
                    )}
                </>
            ) : (
                <ArrowDoubleIcon fontSize="medium" className={iconClasses} />
            )}
        </>
    );
};
