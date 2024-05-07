"use client";

import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
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

import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Skeleton from "@mui/material/Skeleton";

import { MySpacer } from "../components/MySpacer";
import { RULER_DEFAULT_DAY } from "../utils/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
    "&.merge": {
        backgroundColor: theme.palette.cyan.dark,
    },
    "&.version": {
        backgroundColor: theme.palette.cyan.main,
    },
    "&.accept": {
        backgroundColor: theme.palette.success.main,
    },
    "&.final": {
        backgroundColor: theme.palette.info.main,
    },
    "&.none": {
        backgroundColor: theme.palette.blueGrey.main,
    },
    "&:hover": {
        backgroundColor: theme.palette.blueGrey.light,
    },
    "&.selected": {
        color: theme.palette.blueGrey.dark,
        backgroundColor: theme.palette.blueGrey.contrastText,
    },
}));

const tasks = {
    merge: {
        name: "Merge Open PRs",
        icon: (
            <ListItemIcon>
                <TroubleshootIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    version: {
        name: "Versioning Tests",
        icon: (
            <ListItemIcon>
                <ScoreboardIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    accept: {
        name: "Acceptance Tests",
        icon: (
            <ListItemIcon>
                <ThumbUpIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    final: {
        name: "Final & Plugin Tests",
        icon: (
            <ListItemIcon>
                <PhonelinkSetupIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
    none: {
        name: "None",
        icon: (
            <ListItemIcon>
                <IndeterminateCheckBoxIcon fontSize="small" />
            </ListItemIcon>
        ),
    },
};

const weekdays = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Monday",
    6: "Tuesday",
    7: "Wednesday",
    8: "Thursday",
    9: "Friday",
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
    sprint,
    loadingDialog,
    handleSetSprint,
    handleUpdateRuler,
    handleCloseDialogs,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLeftClick = (event, dayIndex, lineIndex) => {
        const newData = sprint.ruler.days;

        newData[dayIndex] = {
            ...newData[dayIndex],
            lines: [...newData[dayIndex].lines],
        };

        newData[dayIndex].lines[lineIndex] = {
            ...newData[dayIndex].lines[lineIndex],
            selected: !newData[dayIndex].lines[lineIndex].selected,
        };

        const updatedRuler = {
            ...sprint.ruler,
            days: newData,
        };

        handleSetSprint(updatedRuler, "ruler");
        event.preventDefault();
    };

    const handleRightClick = (event, dayIndex, lineIndex) => {
        const newData = sprint.ruler.days;

        newData[dayIndex] = {
            ...newData[dayIndex],
            lines: [...newData[dayIndex].lines],
        };

        newData[dayIndex].lines[lineIndex] = {
            ...newData[dayIndex].lines[lineIndex],
            selected: true,
        };

        const updatedRuler = {
            ...sprint.ruler,
            days: newData,
        };

        handleSetSprint(updatedRuler, "ruler");
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = (task) => {
        const updatedDays = sprint.ruler.days.map((day) => ({
            ...day,
            lines: day.lines.map((line) => ({
                ...line,
                task: line.selected ? task : line.task,
                selected: false,
            })),
        }));

        const updatedRuler = {
            ...sprint.ruler,
            days: updatedDays,
        };

        handleSetSprint(updatedRuler, "ruler");
        handleCloseMenu();
    };

    const handleAddDay = () => {
        if (sprint.ruler.days.length < 10) {
            const newDay = {
                index: sprint.ruler.days.length,
                lines: RULER_DEFAULT_DAY,
            };

            const updatedRuler = {
                ...sprint.ruler,
                days: [...sprint.ruler.days, newDay],
            };

            handleSetSprint(updatedRuler, "ruler");
        }
    };

    const handleRemoveDay = () => {
        const updatedRuler = {
            ...sprint.ruler,
            days: sprint.ruler.days.slice(0, -1),
        };

        handleSetSprint(updatedRuler, "ruler");
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
                        onClick={handleCloseDialogs}
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
                        variant="contained"
                        size="large"
                        disabled={loadingDialog}
                        onClick={() => handleUpdateRuler(sprint)}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>

            <MySpacer size={16} vertical />

            {loadingDialog ? (
                <Skeleton variant="rectangular" animation="wave" height={256} />
            ) : (
                <Grid container spacing={0}>
                    {sprint?.ruler?.days.map((day) => {
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
                                        {weekdays[day.index]}
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
                                                            day.index,
                                                            line.index
                                                        );
                                                    }}
                                                    onContextMenu={(event) => {
                                                        handleRightClick(
                                                            event,
                                                            day.index,
                                                            line.index
                                                        );
                                                    }}>
                                                    <ListItemButton className="text-center">
                                                        <ListItemText
                                                            primary={
                                                                tasks[line.task]
                                                                    .name
                                                            }
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
            )}

            {!loadingDialog && (
                <DialogActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="blueGrey"
                        onClick={handleRemoveDay}
                        className="width-128">
                        Remove
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="blueGrey"
                        onClick={handleAddDay}
                        className="width-128">
                        Add Day
                    </Button>
                </DialogActions>
            )}

            <MyMenu
                anchorEl={anchorEl}
                open={open}
                handleCloseMenu={handleCloseMenu}
                handleEdit={handleEdit}
            />
        </Dialog>
    );
};
