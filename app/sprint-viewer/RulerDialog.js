"use client";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ListItemButton } from "@mui/material";
import { MySpacer } from "../components/MySpacer";
import CommentIcon from "@mui/icons-material/Comment";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import WifiIcon from "@mui/icons-material/Wifi";
import EditIcon from "@mui/icons-material/Edit";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
    "&.phaseOne": {
        backgroundColor: theme.palette.primary.main,
    },
    "&.phaseTwo": {
        backgroundColor: theme.palette.primary.dark,
    },
    "&.phaseThree": {
        backgroundColor: theme.palette.success.light,
    },
    "&.phaseFour": {
        backgroundColor: theme.palette.success.dark,
    },
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    "&.selected": {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
    },
}));

const tasks = {
    phaseOne: {
        name: "Merge Open PRs",
        icon: (
            <ListItemIcon>
                <WifiIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    phaseTwo: {
        name: "Versioning Tests",
        icon: (
            <ListItemIcon>
                <EditIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    phaseThree: {
        name: "Acceptance Tests",
        icon: (
            <ListItemIcon>
                <WifiIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    phaseFour: {
        name: "Final & Plugin Tests",
        icon: (
            <ListItemIcon>
                <EditIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
};

const MyMenu = ({ anchorEl, open, handleCloseMenu, handleEdit }) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
            disableScrollLock={true}>
            {Object.keys(tasks).map((key) => {
                return (
                    <MenuItem
                        onClick={() => {
                            handleEdit(key);
                        }}
                        sx={{ width: 320, maxWidth: "100%" }}>
                        {tasks[key].icon}
                        <ListItemText>{tasks[key].name}</ListItemText>
                    </MenuItem>
                );
            })}
        </Menu>
    );
};

export const RulerDialog = ({
    rulerDialogOpen,
    ruler,
    handleSetRuler,
    loading,
    loadingDialog,
    handleCloseRulerDialog,
}) => {
    const [days, setDays] = useState([
        {
            index: 0,
            name: "Monday",
            lines: [
                {
                    index: 0,
                    selected: false,
                    task: "phaseOne",
                },
                {
                    index: 1,
                    selected: false,
                    task: "phaseTwo",
                },
                {
                    index: 2,
                    selected: false,
                    task: "phaseThree",
                },
                {
                    index: 3,
                    selected: false,
                    task: "phaseFour",
                },
                {
                    index: 4,
                    selected: false,
                    task: "phaseOne",
                },
                {
                    index: 5,
                    selected: false,
                    task: "phaseOne",
                },
                {
                    index: 6,
                    selected: false,
                    task: "phaseOne",
                },
                {
                    index: 7,
                    selected: false,
                    task: "phaseOne",
                },
            ],
        },
        {
            index: 1,
            name: "Tuesday",
            lines: [
                {
                    index: 0,
                    selected: false,
                    task: "phaseTwo",
                },
                {
                    index: 1,
                    selected: false,
                    task: "phaseTwo",
                },
                {
                    index: 2,
                    selected: false,
                    task: "phaseTwo",
                },
                {
                    index: 3,
                    selected: false,
                    task: "phaseTwo",
                },
                {
                    index: 4,
                    selected: false,
                    task: "phaseTwo",
                },
                {
                    index: 5,
                    selected: false,
                    task: "phaseTwo",
                },
                {
                    index: 6,
                    selected: false,
                    task: "phaseTwo",
                },
                {
                    index: 7,
                    selected: false,
                    task: "phaseTwo",
                },
            ],
        },
    ]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLeftClick = (day, line, event) => {
        const updatedDays = [...days];
        const updatedDay = updatedDays.find((a) => a.index === day.index);
        const updatedLine = updatedDay.lines.find(
            (a) => a.index === line.index
        );

        updatedLine.selected = !line.selected;
        setDays(updatedDays);
        event.preventDefault();
    };

    const handleRightClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = (task) => {
        console.log(task);
        const updatedDays = [...days];
        updatedDays.forEach((day) => {
            const updatedLine = day.lines.find(
                (line) => line.selected === true
            );
            console.log(updatedLine);
            // updatedLine.task = "phaseFour";
        });
        // setDays(updatedDays);
    };

    return (
        <Dialog
            fullScreen
            open={rulerDialogOpen}
            TransitionComponent={Transition}
            disableScrollLock>
            <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseRulerDialog}
                        aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div">
                        Deploy Week - Estimation
                    </Typography>
                    <Button
                        autoFocus
                        color="inherit"
                        onClick={handleCloseRulerDialog}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>

            <MySpacer size={16} vertical />

            <Grid container spacing={0}>
                {days.map((day) => {
                    return (
                        <Grid
                            item
                            xs={2}
                            className="display-flex justify-center"
                            key={"day" + day.index}>
                            <Box className="width-100">
                                <Typography
                                    className="text-center"
                                    variant="h6">
                                    {day.name}
                                </Typography>

                                <List className="width-100">
                                    {day.lines.map((line) => {
                                        return (
                                            <StyledListItem
                                                key={
                                                    "day" +
                                                    day.index +
                                                    "line" +
                                                    line.index
                                                }
                                                disablePadding
                                                className={
                                                    line.selected
                                                        ? "selected"
                                                        : line.task
                                                }
                                                onClick={(event) => {
                                                    handleLeftClick(
                                                        day,
                                                        line,
                                                        event
                                                    );
                                                }}
                                                onContextMenu={
                                                    handleRightClick
                                                }>
                                                <ListItemButton className="text-center">
                                                    <ListItemText
                                                        primary={line.index}
                                                    />
                                                </ListItemButton>
                                            </StyledListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>

            <MyMenu
                anchorEl={anchorEl}
                open={open}
                handleCloseMenu={handleCloseMenu}
                handleEdit={handleEdit}
            />
        </Dialog>
    );
};
