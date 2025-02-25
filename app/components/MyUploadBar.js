"use client";

import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import { MySpacer } from "./MySpacer";

export function MyUploadBar(props) {
    return (
        <Box className="display-flex justify-center padding-1rem align-center">
            <Button
                variant="outlined"
                size="large"
                component="label"
                startIcon={<UploadIcon />}>
                Upload
                <input
                    hidden
                    accept=".csv"
                    name="file"
                    type="file"
                    id="upload-file-top"
                    onChange={props.onFileUploaded}
                />
            </Button>

            <MySpacer size={24} horizontal />

            <Button
                variant="outlined"
                size="large"
                onClick={props.downloadQRCodes}
                startIcon={<DownloadIcon />}>
                Download ZIP
            </Button>

            <MySpacer size={20} horizontal />

            <Button
                variant="outlined"
                size="large"
                component="label"
                onClick={props.togglePDF}
                startIcon={<PdfIcon />}
                className="pdf-button">
                    {props.pdfLoaded ? "Preview Images" : "Preview PDF"}
            </Button>
            

            <MySpacer size={20} horizontal />

            <Button
                variant="outlined"
                size="large"
                onClick={props.clearQRCodes}
                startIcon={<DeleteIcon />}>
                Clear
            </Button>
        </Box>
    );
}
