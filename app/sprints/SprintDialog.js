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
import Skeleton from "@mui/material/Skeleton";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

import { MyIconButton } from "../components/MyIconButton";

export const SprintDialog = ({
    sprintDialogOpen,
    sprint,
    loading,
    loadingDialog,
    handleSetSprint,
    handleCloseDialogs,
    handleAddUpdateSprint,
    handleDeleteSprint,
}) => {
    return (
        <Dialog open={sprintDialogOpen} disableScrollLock>
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
                        disabled={loading || loadingDialog}
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
                        value={sprint.total_points}
                        onChange={(event) => {
                            handleSetSprint(
                                parseInt(event.target.value) || "",
                                "total_points"
                            );
                        }}
                        disabled={loading || loadingDialog}
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
                        value={sprint.points_merged}
                        onChange={(event) => {
                            handleSetSprint(
                                parseInt(event.target.value) || "",
                                "points_merged"
                            );
                        }}
                        disabled={loading || loadingDialog}
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
                        value={sprint.extra_deploys}
                        onChange={(event) => {
                            handleSetSprint(
                                parseInt(event.target.value) || "",
                                "extra_deploys"
                            );
                        }}
                        disabled={loading || loadingDialog}
                    />

                    <TextField
                        margin="dense"
                        id="sprint-pr-inclusions"
                        label="PR Inclusions"
                        type="number"
                        fullWidth
                        variant="outlined"
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                        value={sprint.pr_inclusions}
                        onChange={(event) => {
                            handleSetSprint(
                                parseInt(event.target.value) || "",
                                "pr_inclusions"
                            );
                        }}
                        disabled={loading || loadingDialog}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={sprint.date_delay}
                                disabled={loading || loadingDialog}
                            />
                        }
                        label="Date Delay"
                        value={sprint.date_delay}
                        onChange={(event) => {
                            handleSetSprint(event.target.checked, "date_delay");
                        }}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={sprint.process_delay}
                                disabled={loading || loadingDialog}
                            />
                        }
                        label="Process Delay"
                        value={sprint.process_delay}
                        onChange={(event) => {
                            handleSetSprint(
                                event.target.checked,
                                "process_delay"
                            );
                        }}
                    />
                </DialogContent>

                <Divider />

                {loadingDialog ? (
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={58.25}
                    />
                ) : (
                    <DialogActions>
                        {sprint.id && (
                            <MyIconButton
                                color="error"
                                sx={{ position: "absolute", left: "4px" }}
                                onClick={handleDeleteSprint}>
                                <DeleteOutlineIcon fontSize="inherit" />
                            </MyIconButton>
                        )}
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleCloseDialogs}
                            className="width-128"
                            color="blueGrey">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleAddUpdateSprint}
                            className="width-128">
                            Save
                        </Button>
                    </DialogActions>
                )}
            </FormControl>
        </Dialog>
    );
};
