import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

export const MyTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "#1b1c1e",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#1b1c1e",
    },
}));
