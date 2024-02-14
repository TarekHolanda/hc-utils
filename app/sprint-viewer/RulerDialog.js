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

const MyMenu = ({ anchorEl, open, handleCloseMenu }) => {
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
            <MenuItem
                // onClick={handleEdit}
                sx={{ width: 320, maxWidth: "100%" }}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>MERGE OPENED PULL REQUESTS</ListItemText>
            </MenuItem>
            <MenuItem
                // onClick={handleEdit}
                sx={{ width: 320, maxWidth: "100%" }}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>VERSIONING TESTS</ListItemText>
            </MenuItem>
        </Menu>
    );
};

const lines = [1, 2, 3, 4, 5, 6, 7, 8];
const days = [
    {
        name: "Monday",
        lines: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
        name: "Tuesday",
        lines: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
        name: "Wednesday",
        lines: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
        name: "Thursday",
        lines: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
        name: "Friday",
        lines: [1, 2, 3, 4, 5, 6, 7, 8],
    },
];

export const RulerDialog = ({
    rulerDialogOpen,
    ruler,
    handleSetRuler,
    loading,
    loadingDialog,
    handleCloseRulerDialog,
}) => {
    const [checked, setChecked] = useState([0]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
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

            <Grid container spacing={0} onContextMenu={handleContextMenu}>
                <Grid item xs={1} className="display-flex justify-center">
                    <Box className="width-100">
                        <Typography className="text-center" variant="h6">
                            Time / Day
                        </Typography>

                        <List className="width-100">
                            {lines.map((line) => (
                                <ListItem key={"line" + line} disablePadding>
                                    <ListItemButton className="text-center">
                                        <ListItemText primary={line} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>

                {days.map((day) => (
                    <Grid
                        item
                        xs={2}
                        className="display-flex justify-center"
                        key={"day" + day.name}>
                        <Box className="width-100">
                            <Typography className="text-center" variant="h6">
                                {day.name}
                            </Typography>

                            <List className="width-100">
                                {day.lines.map((line) => {
                                    return (
                                        <ListItem
                                            key={"day-line" + line}
                                            disablePadding>
                                            <ListItemButton className="text-center">
                                                <ListItemText primary={line} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <MyMenu
                anchorEl={anchorEl}
                open={open}
                handleCloseMenu={handleCloseMenu}
                // handleEdit={handleEdit}
            />
        </Dialog>
    );
};
