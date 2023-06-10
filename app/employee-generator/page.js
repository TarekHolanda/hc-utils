"use client";

import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { QRCodeCanvas } from "qrcode.react";
import JSZip from "jszip";
import saveAs from "file-saver";
import Papa from "papaparse";

import { MyLoading } from "../components/MyLoading";
import { MySpacer } from "../components/MySpacer";

function PageContent(props) {
    if (!props.validCodes) {
        return (
            <Container className="display-flex justify-around align-center container-center-button">
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
                        id="employee-qr-code-file"
                        onChange={props.onFileUploaded}
                    />
                </Button>
            </Container>
        );
    }

    return (
        <Container className="display-flex justify-around padding-1rem align-center">
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
                    id="employee-qr-code-file"
                    onChange={props.onFileUploaded}
                />
            </Button>

            <MySpacer size={24} horizontal />

            <Button
                variant="outlined"
                size="large"
                onClick={props.downloadQrCodes}
                startIcon={<DownloadIcon />}
            >
                Download
            </Button>

            <MySpacer size={24} horizontal />

            <Button
                variant="outlined"
                size="large"
                onClick={props.clearQrCodes}
                startIcon={<DeleteIcon />}
            >
                Clear
            </Button>
        </Container>
    );
}

export default function Page() {
    const { data: session, status } = useSession();
    const [qrCodes, setQrCodes] = useState([
        { description: "QR Code", data: "QR Code" },
    ]);
    const [validCodes, setValidCodes] = useState(false);
    const qrRef = useRef(null);

    if (status === "loading") {
        return <>{MyLoading}</>;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const downloadQrCodes = async () => {
        const zip = new JSZip();

        for (let i = 0; i < qrCodes.length; i++) {
            const canvas = qrRef.current.querySelector("#qrCode" + i);
            const descriptionSize = qrCodes[i]["description"].length;

            // Add margin to the QR Code
            const canvasWithMargin = document.createElement("canvas");
            const marginContext = canvasWithMargin.getContext("2d");
            canvasWithMargin.width = canvas.width + 32;

            if (descriptionSize >= 45) {
                canvasWithMargin.height = canvas.height + 184;
            } else if (descriptionSize >= 23) {
                canvasWithMargin.height = canvas.height + 136;
            } else {
                canvasWithMargin.height = canvas.height + 88;
            }

            marginContext.fillStyle = "#fff";
            marginContext.fillRect(
                0,
                0,
                canvasWithMargin.width,
                canvasWithMargin.height
            );
            marginContext.drawImage(canvas, 16, 16);

            // Draw the QR Code description
            const labelContext = canvasWithMargin.getContext("2d");
            labelContext.font = "48px Arial";
            labelContext.textBaseline = "bottom";
            labelContext.fillStyle = "#000000";
            labelContext.lineWidth = 20;

            labelContext.fillText(
                qrCodes[i]["description"].substring(0, 23),
                12,
                592
            );
            if (descriptionSize >= 23) {
                labelContext.fillText(
                    qrCodes[i]["description"].substring(23, 44),
                    12,
                    640
                );
            }
            if (descriptionSize >= 45) {
                labelContext.fillText(
                    qrCodes[i]["description"].substring(44, descriptionSize),
                    12,
                    688
                );
            }

            const blob = await new Promise((resolve) =>
                canvasWithMargin.toBlob(resolve)
            );
            const fileName = `${qrCodes[i]["description"]}.png`;
            zip.file(fileName, blob);
        }

        // Generate zip file
        zip.generateAsync({ type: "blob" }).then((content) => {
            // Save zip file
            saveAs(content, "QRCode.zip");
        });
    };

    const generateQrCodes = () => {
        let aux = [];
        if (min && max) {
            for (let i = min; i <= max; i++) {
                aux.push({
                    description: i,
                    data: "" + i,
                });
            }

            setQrCodes(aux);
            setValidCodes(true);
        }
    };

    const clearQrCodes = () => {
        setQrCodes([]);
        setValidCodes(false);
    };

    const formatData = (fileRow) => {
        let dataTemp = {
            description:
                fileRow["First Name"] +
                " " +
                fileRow["Last Name"] +
                " - " +
                fileRow["QR Code"],
            data: fileRow["QR Code"],
        };

        return dataTemp;
    };

    const onFileUploaded = (e) => {
        if (e.target.files.length) {
            Papa.parse(e.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    let dataFormatted = [];

                    for (let i = 0; i < results.data.length; i++) {
                        dataFormatted.push(formatData(results.data[i]));
                    }

                    setQrCodes(dataFormatted);
                    setValidCodes(true);
                },
            });
        }
    };

    return (
        <Fade in={true} timeout={1000}>
            <Box>
                <PageContent
                    generateQrCodes={generateQrCodes}
                    downloadQrCodes={downloadQrCodes}
                    clearQrCodes={clearQrCodes}
                    validCodes={validCodes}
                    onFileUploaded={onFileUploaded}
                />

                <MySpacer size={20} vertical />

                {validCodes && (
                    <Fade in={validCodes} timeout={1000}>
                        <ImageList
                            sx={{ width: "auto", height: "auto" }}
                            cols={3}
                            gap={64}
                        >
                            {qrCodes.map((qrCode, index) => (
                                <ImageListItem
                                    key={index}
                                    sx={{ margin: "auto" }}
                                >
                                    <QRCodeCanvas
                                        value={qrCode["data"]}
                                        id={"qrCode" + index}
                                        size={352}
                                        level={"H"}
                                        imageSettings={{
                                            src: "./hc-icon-black.png",
                                            height: 38,
                                            width: 48,
                                            excavate: true,
                                        }}
                                    />

                                    <ImageListItemBar
                                        title={qrCode["description"]}
                                        position="bottom"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Fade>
                )}

                <div ref={qrRef} className="display-none">
                    {qrCodes.map((qrCode, index) => {
                        return (
                            <div key={index}>
                                <QRCodeCanvas
                                    value={qrCode["data"]}
                                    id={"qrCode" + index}
                                    size={512}
                                    level={"H"}
                                    imageSettings={{
                                        src: "./hc-icon-black.png",
                                        height: 103,
                                        width: 128,
                                        excavate: true,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </Box>
        </Fade>
    );
}
