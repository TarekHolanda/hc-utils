"use client";

import React from "react";

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

export const SprintsDialog = ({
    modalOpen,
    sprint,
    loading,
    loadingModal,
    handleSetSprint,
    handleCloseModal,
    handleAddUpdateSprint,
    handleDeleteSprint,
}) => {
    return (
        <Dialog open={modalOpen}>
            <FormControl>
                <DialogTitle>Sprint #{sprint.index}</DialogTitle>

                <Divider />

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sprint-index"
                        label="Sprint Number"
                        type="number"
                        fullWidth
                        variant="outlined"
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                        value={sprint.index}
                        onChange={(event) => {
                            handleSetSprint(
                                parseInt(event.target.value) || "",
                                "index"
                            );
                        }}
                        disabled={loading}
                    />

                    <TextField
                        margin="dense"
                        id="sprint-total"
                        label="Total Points"
                        type="number"
                        fullWidth
                        variant="outlined"
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                        value={sprint.totalPoints}
                        onChange={(event) => {
                            handleSetSprint(
                                parseInt(event.target.value) || "",
                                "totalPoints"
                            );
                        }}
                        disabled={loading}
                    />

                    <TextField
                        margin="dense"
                        id="sprint-merged"
                        label="Points Merged"
                        type="number"
                        fullWidth
                        variant="outlined"
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                        value={sprint.pointsMerged}
                        onChange={(event) => {
                            handleSetSprint(
                                parseInt(event.target.value) || "",
                                "pointsMerged"
                            );
                        }}
                        disabled={loading}
                    />

                    <TextField
                        margin="dense"
                        id="sprint-extra-deploys"
                        label="Extra Deploys"
                        type="number"
                        fullWidth
                        variant="outlined"
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                        value={sprint.extraDeploys}
                        onChange={(event) => {
                            handleSetSprint(
                                parseInt(event.target.value) || "",
                                "extraDeploys"
                            );
                        }}
                        disabled={loading}
                    />

                    <FormControlLabel
                        control={<Switch />}
                        label="Delayed"
                        value={sprint.delayed}
                        onChange={(event) => {
                            handleSetSprint(event.target.checked, "delayed");
                        }}
                    />
                </DialogContent>

                <Divider />

                {loadingModal ? (
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={58.25}
                    />
                ) : (
                    <DialogActions>
                        {sprint.id && (
                            <IconButton
                                aria-label="delete"
                                size="large"
                                onClick={handleDeleteSprint}
                                sx={{ position: "absolute", left: "4px" }}
                                color="error"
                            >
                                <DeleteOutlineIcon fontSize="inherit" />
                            </IconButton>
                        )}
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleCloseModal}
                            className="width-128"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleAddUpdateSprint}
                            className="width-128"
                        >
                            Save
                        </Button>
                    </DialogActions>
                )}
            </FormControl>
        </Dialog>
    );
};
