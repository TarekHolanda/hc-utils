"use client";

import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import PendingIcon from '@mui/icons-material/Pending';

import { MySpacer } from "../components/MySpacer";
import { RULER_DEFAULT } from "../utils/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
    
    "&.phaseOne": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "& svg": {
            color: theme.palette.primary.contrastText,
        },
    },
    "&.phaseTwo": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        "& svg": {
            color: theme.palette.primary.contrastText,
        },
    },
    "&.phaseThree": {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.primary.contrastText,
        "& svg": {
            color: theme.palette.primary.contrastText,
        },
    },
    "&.phaseFour": {
        backgroundColor: theme.palette.success.dark,
        color: theme.palette.primary.contrastText,
        "& svg": {
            color: theme.palette.primary.contrastText,
        },
    },
    "&.phaseFive": {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.primary.contrastText,
        "& svg": {
            color: theme.palette.primary.contrastText,
        },
    },
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.primary.contrastText,
        "& svg": {
            color: theme.palette.primary.main,
        },
    },
    "&.selected": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        "& svg": {
            color: theme.palette.primary.dark,
        },
    },
}));

const tasks = {
    phaseOne: {
        name: "Merge Open PRs",
        icon: (
            <ListItemIcon>
                <TroubleshootIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    phaseTwo: {
        name: "Versioning Tests",
        icon: (
            <ListItemIcon>
                <ScoreboardIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    phaseThree: {
        name: "Acceptance Tests",
        icon: (
            <ListItemIcon>
                <ThumbUpIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    phaseFour: {
        name: "Final & Plugin Tests",
        icon: (
            <ListItemIcon>
                <PhonelinkSetupIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    phaseFive: {
        name: "Buffer",
        icon: (
            <ListItemIcon>
                <PendingIcon fontSize="small" />
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
                        key={"task" + key}
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
    const [days, setDays] = useState(RULER_DEFAULT);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLeftClick = (event, day, line) => {
        const updatedDays = [...days];
        const updatedDay = updatedDays.find((a) => a.index === day.index);
        const updatedLine = updatedDay.lines.find(
            (a) => a.index === line.index
        );

        updatedLine.selected = !line.selected;
        setDays(updatedDays);
        event.preventDefault();
    };

    const handleRightClick = (event, day, line) => {
        const updatedDays = [...days];
        const updatedDay = updatedDays.find((a) => a.index === day.index);
        const updatedLine = updatedDay.lines.find(
            (a) => a.index === line.index
        );

        updatedLine.selected = true;
        setDays(updatedDays);
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = (task) => {
        const updatedDays = [...days];
        updatedDays.forEach((day) => {
            const updatedLines = day.lines.filter(
                (line) => line.selected === true
            );

            if (updatedLines.length) {
                updatedLines.forEach((line) => {
                    line.task = task;
                    line.selected = false;
                });
            }
        });
        setDays(updatedDays);
        handleCloseMenu();
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

            <Stack direction="row" spacing={2}>
                {days.map((day) => {
                    return (
                        <Box className="width-100" key={"day" + day.index}>
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
                                                    event,
                                                    day,
                                                    line
                                                );
                                            }}
                                            onContextMenu={(event) => {
                                                handleRightClick(
                                                    event,
                                                    day,
                                                    line
                                                );
                                            }}>
                                            <ListItemButton className="text-right">
                                                {tasks[line.task].icon}
                                                <ListItemText
                                                    primary={line.index}
                                                />
                                            </ListItemButton>
                                        </StyledListItem>
                                    );
                                })}
                            </List>
                        </Box>
                    );
                })}
            </Stack>

            <MyMenu
                anchorEl={anchorEl}
                open={open}
                handleCloseMenu={handleCloseMenu}
                handleEdit={handleEdit}
            />
        </Dialog>
    );
};
