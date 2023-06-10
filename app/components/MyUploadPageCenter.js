"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
// import teststyles from "../styles/Test.module.css";

export function MyUploadPageCenter(props) {
    return (
        <Box className="display-flex justify-center padding-1rem align-center box-center-page">
            <Button
                variant="outlined"
                size="large"
                component="label"
                startIcon={<UploadIcon />}
            >
                Upload
                <input
                    hidden
                    accept=".csv"
                    name="file"
                    type="file"
                    id="upload-file-center"
                    onChange={props.onFileUploaded}
                />
            </Button>
        </Box>
    );
}
