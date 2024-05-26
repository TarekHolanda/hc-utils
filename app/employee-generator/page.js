"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Fade from "@mui/material/Fade";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ImageIcon from "@mui/icons-material/Image";
import HideImageIcon from "@mui/icons-material/HideImage";

import { QRCodeCanvas } from "qrcode.react";
import JSZip from "jszip";
import saveAs from "file-saver";
import Papa from "papaparse";

import { MyLoadingPage } from "../components/MyLoadingPage";
import { MySpacer } from "../components/MySpacer";
import { MyUploadPageCenter } from "../components/MyUploadPageCenter";
import { MyUploadBar } from "../components/MyUploadBar";

const QR_LOGO = {
    src: "./hc-icon-black.png",
    height: 103,
    width: 128,
    excavate: true,
};

function PageContent(props) {
    if (!props.validCodes) {
        return MyUploadPageCenter(props);
    }

    return MyUploadBar(props);
}

export default function Page() {
    const { data: session, status } = useSession();
    const [logoOn, setLogoOn] = useState(true);
    const [nameOn, setNameOn] = useState(true);
    const [qrCodesNotFormatted, setQrCodesNotFormatted] = useState([]);
    const [qrCodes, setQrCodes] = useState([
        { description: "QR Code", data: "QR Code" },
    ]);
    const [validCodes, setValidCodes] = useState(false);
    const qrRef = useRef(null);

    const updateLogoOn = (event, newLogoOn) => {
        if (newLogoOn !== null && newLogoOn !== logoOn) {
            setLogoOn(newLogoOn);
        }
    };

    const updateNameOn = (event, newNameOn) => {
        if (newNameOn !== null && newNameOn !== nameOn) {
            setNameOn(newNameOn);
        }
    };

    useEffect(() => {
        if (validCodes) {
            formatData();
        }
    }, [qrCodesNotFormatted, nameOn]);

    if (status === "loading") {
        return <MyLoadingPage />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const downloadQRCodes = async () => {
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

    const clearQRCodes = () => {
        setQrCodes([]);
        setValidCodes(false);

        setTimeout(() => {
            document.getElementById("upload-file-center").value = "";
        }, 1000);
    };

    const formatData = () => {
        let dataFormatted = [];

        qrCodesNotFormatted.forEach((fileRow) => {
            dataFormatted.push({
                description: nameOn
                    ? fileRow["First Name"] +
                      " " +
                      fileRow["Last Name"] +
                      " - " +
                      fileRow["QR Code"]
                    : fileRow["QR Code"],
                data: fileRow["QR Code"],
            });
        });

        setQrCodes(dataFormatted);
    };

    const onFileUploaded = (e) => {
        if (e.target.files.length) {
            Papa.parse(e.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    setQrCodesNotFormatted(results.data);
                    setValidCodes(true);
                },
            });
        }
    };

    return (
        <Fade in={true} timeout={1000}>
            <Box>
                <PageContent
                    validCodes={validCodes}
                    onFileUploaded={onFileUploaded}
                    downloadQRCodes={downloadQRCodes}
                    clearQRCodes={clearQRCodes}
                />

                {validCodes && (
                    <Box className="display-flex justify-center">
                        <Box className="text-center">
                            <Typography variant="h6">HC Logo</Typography>
                            <ToggleButtonGroup
                                value={logoOn}
                                exclusive
                                onChange={updateLogoOn}
                                aria-label="logo">
                                <ToggleButton value={true} aria-label="logo on">
                                    <ImageIcon />
                                </ToggleButton>
                                <ToggleButton
                                    value={false}
                                    aria-label="logo off">
                                    <HideImageIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <MySpacer size={20} horizontal />

                        <Divider orientation="vertical" flexItem />

                        <MySpacer size={20} horizontal />

                        <Box className="text-center">
                            <Typography variant="h6">Name</Typography>
                            <ToggleButtonGroup
                                value={nameOn}
                                exclusive
                                onChange={updateNameOn}
                                aria-label="name">
                                <ToggleButton value={true} aria-label="name on">
                                    <ImageIcon />
                                </ToggleButton>
                                <ToggleButton
                                    value={false}
                                    aria-label="name off">
                                    <HideImageIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                )}

                <MySpacer size={20} vertical />

                {validCodes && (
                    <Fade in={validCodes} timeout={1000}>
                        <ImageList
                            sx={{ width: "auto", height: "auto" }}
                            cols={3}
                            gap={64}>
                            {qrCodes.map((qrCode, index) => (
                                <ImageListItem
                                    key={index}
                                    sx={{ margin: "auto" }}>
                                    <QRCodeCanvas
                                        value={qrCode["data"]}
                                        id={"qrCode" + index}
                                        size={352}
                                        level={"H"}
                                        imageSettings={logoOn ? QR_LOGO : {}}
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

                <MySpacer size={20} horizontal />

                <div ref={qrRef} className="display-none">
                    {qrCodes.map((qrCode, index) => {
                        return (
                            <div key={index}>
                                <QRCodeCanvas
                                    value={qrCode["data"]}
                                    id={"qrCode" + index}
                                    size={512}
                                    level={"H"}
                                    imageSettings={logoOn ? QR_LOGO : {}}
                                />
                            </div>
                        );
                    })}
                </div>
            </Box>
        </Fade>
    );
}
