"use client";

import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ReorderIcon from "@mui/icons-material/Reorder";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ImageIcon from "@mui/icons-material/Image";
import HideImageIcon from "@mui/icons-material/HideImage";
import Typography from "@mui/material/Typography";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Papa from "papaparse";
import QRCodeCanvas from "qrcode.react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { View, Text, PDFViewer, Image, Document, Page } from "@react-pdf/renderer";

import { formatData } from "./formatData";
import { MySpacer } from "../components/MySpacer";
import { MyLoadingPage } from "../components/MyLoadingPage";
import { MyUploadPageCenter } from "../components/MyUploadPageCenter";
import { MyUploadBar } from "../components/MyUploadBar";
import { MySpeedDial } from "../components/MySpeedDial";
import { styles } from "./styles";

const QR_LOGO = {
    src: "./hc-icon-black.png",
    height: 103,
    width: 128,
    excavate: true,
};

const SIZES = {
    xsmall: {
        qrCodesPerPage: 9,
        qrCodesPerLine: 3,
        linesPerPage: 3,
    },
    small: {
        qrCodesPerPage: 9,
        qrCodesPerLine: 3,
        linesPerPage: 3,
    },
    medium: {
        qrCodesPerPage: 4,
        qrCodesPerLine: 2,
        linesPerPage: 2,
    },
    large: {
        qrCodesPerPage: 2,
        qrCodesPerLine: 1,
        linesPerPage: 2,
    },
};

function PageUploadBar(props) {
    if (!props.validCodes) {
        return MyUploadPageCenter(props);
    }

    return MyUploadBar(props);
}

function buildQRCodeView(qrCodeData, description, index, size) {
    return (
        <View key={"row" + index}>
            <Image
                src={{
                    uri: qrCodeData
                        ? qrCodeData.qrCodeDataUri
                        : "./all-white.png",
                    method: "GET",
                    headers: { "Cache-Control": "no-cache" },
                    body: "",
                }}
                style={
                    size !== "small"
                        ? size === "large"
                            ? styles.qrCodeLarge
                            : size === "medium"
                            ? styles.qrCodeMedium
                            : styles.qrCodeXsmall
                        : styles.qrCodeSmall
                }
            />

            <Text
                style={
                    size !== "small"
                        ? size === "large"
                            ? styles.descriptionLarge
                            : size === "medium"
                            ? styles.descriptionMedium
                            : styles.descriptionXsmall
                        : styles.descriptionSmall
                }>
                {description ? description : ""}
            </Text>
        </View>
    );
}

function buildPDF(aux, size) {
    let table = [];

    for (let i = 0; i < aux.length; i += SIZES[size].qrCodesPerPage) {
        let page = [];
        for (let j = 0; j < SIZES[size].linesPerPage; j++) {
            let line = [];
            for (let k = 0; k < SIZES[size].qrCodesPerLine; k++) {
                let index = i + j * SIZES[size].qrCodesPerLine + k;
                line.push(
                    buildQRCodeView(
                        aux[index],
                        aux[index] ? aux[index].description : "",
                        index,
                        size
                    )
                );
            }

            page.push(
                <View
                    style={
                        size !== "small" && size !== "xsmall"
                            ? styles.inlineNotSmall
                            : styles.inlineSmall
                    }
                    key={"view" + i + j}>
                    {line}
                </View>
            );
        }

        table.push(
            <View style={styles.vertical} key={"parent" + i}>
                {page}
            </View>
        );
    }

    return table;
}

export default function MyPage() {
    const { data: session, status } = useSession();
    const [filename, setFilename] = useState("");
    const [qrCodes, setQrCodes] = useState([]);
    const [qrCodesPDF, setQrCodesPDF] = useState(<View></View>);
    const [pdfLoaded, setPdfLoaded] = useState(false);
    const [validCodes, setValidCodes] = useState(false);
    const [quality, setQuality] = useState("Q");
    const [logoOn, setLogoOn] = useState(false);
    const [size, setSize] = useState("medium");
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const qrRef = useRef();

    if (status === "loading") {
        return <MyLoadingPage />;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const togglePDF = () => {
        startLoading();

        if (!pdfLoaded) {
            generatePDF(qrCodes);
        } else {
            setTimeout(() => {
                stopLoading();
            }, 500);
        }

        setPdfLoaded(!pdfLoaded);
    };

    const updateSize = (event, newSize) => {
        if (newSize && newSize !== size) {
            setSize(newSize);

            // Update the QR Codes PDF Preview when the size is changed
            if (validCodes && pdfLoaded) {
                generatePDF(qrCodes);
            }
        }
    };

    const updateLogoOn = (event, newLogoOn) => {
        if (newLogoOn !== null && newLogoOn !== logoOn) {
            setLogoOn(newLogoOn);

            // Update the QR Codes PDF Preview when the logo is changed
            if (validCodes && pdfLoaded) {
                generatePDF(qrCodes);
            }
        }
    };

    const updateQuality = (event, newQuality) => {
        if (newQuality && newQuality !== quality) {
            setQuality(newQuality);

            // Update the QR Codes PDF Preview when the quality is changed
            if (validCodes && pdfLoaded) {
                generatePDF(qrCodes);
            }
        }
    };

    const downloadQRCodes = async (e) => {
        e.preventDefault();
        const zip = new JSZip();
        
        let imagePromises = qrCodes.map((qrCode, index) => {
            return new Promise((resolve) => {
                const qrCanvas = qrRef?.current?.querySelector("#qrCode" + index);
                const descriptionSize = qrCode.description.length;
                
                if (qrCanvas) {
                    // Add margin to the QR Code
                    const canvas = document.createElement("canvas");
                    const marginContext = canvas.getContext("2d");
        
                    const limit1 = parseInt(1 / 6 * qrCanvas.width) - 3;
                    const limit2 = 5 / 64 * qrCanvas.width;
                    
                    canvas.width = qrCanvas.width + 32;
                    if (descriptionSize >= limit1) {
                        canvas.height = qrCanvas.height + 104;
                    } else if (descriptionSize >= limit2) {
                        canvas.height = qrCanvas.height + 80;
                    } else {
                        canvas.height = qrCanvas.height + 56;
                    }
                    
                    // Draw the QR Code with a white background and margin
                    marginContext.fillStyle = "#fff";
                    marginContext.fillRect(0, 0, canvas.width, canvas.height);
                    marginContext.drawImage(qrCanvas, 16, 16);
        
                    // Draw the QR Code description
                    const labelContext = canvas.getContext("2d");
                    labelContext.font = "24px Arial";
                    labelContext.textBaseline = "bottom";
                    labelContext.fillStyle = "#000000";
                    labelContext.lineWidth = 20;
        
                    labelContext.fillText(
                        qrCode.description.substring(0, limit2),
                        12,
                        qrCanvas.height + 48
                    );
                    if (descriptionSize >= 23) {
                        labelContext.fillText(
                            qrCode.description.substring(limit2, limit1 - 1),
                            12,
                            qrCanvas.height + 72
                        );
                    }
                    if (descriptionSize >= 45) {
                        labelContext.fillText(
                            qrCode.description.substring(limit1 - 1, descriptionSize),
                            12,
                            qrCanvas.height + 96
                        );
                    }
        
                    canvas.toBlob((blob) => {
                        if (blob) {
                            zip.file(`${qrCode.description || "QRCode_" + index}.png`, blob);
                            resolve();
                        }
                    }, "image/png");
                } else {
                    resolve();
                }
            });
        });

        Promise.all(imagePromises).then(() => {
            zip.generateAsync({ type: "blob" }).then((content) => {
                saveAs(content, filename + ".zip");
            });
        });
    };

    const onFileUploaded = (e) => {
        if (e.target.files.length) {
            setPdfLoaded(false);
            startLoading();

            Papa.parse(e.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    let dataFormatted = [];

                    for (let i = 0; i < results.data.length; i++) {
                        const aux = formatData(results.data[i]);

                        dataFormatted.push({
                            description: aux.description,
                            data: JSON.stringify(aux),
                        });
                    }

                    const filename = e.target.files[0].name.split(".").slice(0, -1).join(".");
                    setFilename(filename);
                    setQrCodes(dataFormatted);
                    setValidCodes(true);
                    stopLoading();
                },
            });
        }
    };

    const generatePDF = (pdfQrCodes) => {
        startLoading();
        setPdfLoading(true);

        let aux = [];
        for (let i = 0; i < pdfQrCodes.length; i++) {
            const canvas = qrRef?.current?.querySelector("#qrCode" + i);
            const qrCodeDataUri = canvas.toDataURL();
            aux.push({
                qrCodeDataUri: qrCodeDataUri,
                description: pdfQrCodes[i]["description"],
            });
        }

        const table = buildPDF(aux, size);
        setQrCodesPDF(table);
        stopLoading();
    };

    const clearQRCodes = () => {
        startLoading();
        setFilename("");
        setValidCodes(false);
        setQrCodes([]);

        setTimeout(() => {
            const fileInput = document.getElementById("upload-file-center");
            if (fileInput) {
                fileInput.value = "";
            }

            stopLoading();
        }, 500);
    };

    const startLoading = () => {
        setLoading(true);
    };

    const stopLoading = () => {
        setLoading(false);
    };

    return (
        <Fade in={true} timeout={1000}>
            <Box>
                <PageUploadBar
                    validCodes={validCodes}
                    onFileUploaded={onFileUploaded}
                    downloadQRCodes={downloadQRCodes}
                    clearQRCodes={clearQRCodes}
                    togglePDF={togglePDF}
                    pdfLoaded={pdfLoaded}
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
                            <Typography variant="h6">Density Level</Typography>
                            <ToggleButtonGroup
                                value={quality}
                                exclusive
                                onChange={updateQuality}
                                aria-label="quality">
                                <ToggleButton value="L" aria-label="low">
                                    <HorizontalRuleIcon />
                                </ToggleButton>
                                <ToggleButton value="M" aria-label="medium">
                                    <DragHandleIcon />
                                </ToggleButton>
                                <ToggleButton value="Q" aria-label="quartile">
                                    <ReorderIcon />
                                </ToggleButton>
                                <ToggleButton value="H" aria-label="high">
                                    <FormatAlignJustifyIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <MySpacer size={20} horizontal />

                        <Divider orientation="vertical" flexItem />

                        <MySpacer size={20} horizontal />

                        <Box className="text-center">
                            <Typography variant="h6">Size on PDF</Typography>
                            <ToggleButtonGroup
                                value={size}
                                exclusive
                                onChange={updateSize}
                                aria-label="size">
                                <ToggleButton value="xsmall" aria-label="xsmall">
                                    <LooksOneIcon />
                                </ToggleButton>
                                <ToggleButton value="small" aria-label="small">
                                    <LooksTwoIcon />
                                </ToggleButton>
                                <ToggleButton value="medium" aria-label="medium">
                                    <Looks3Icon />
                                </ToggleButton>
                                <ToggleButton value="large" aria-label="large">
                                    <Looks4Icon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                )}

                <MySpacer size={20} horizontal />

                {validCodes && pdfLoaded && (
                    <Fade in={pdfLoaded} timeout={250}>
                        <Box>
                            <PDFViewer style={{ width: "100%", height: "1192px" }}>
                                <Document onRender={() => setPdfLoading(false)}>
                                    <Page>{qrCodesPDF}</Page>
                                </Document>
                            </PDFViewer>
                        </Box>
                    </Fade>
                )}
                
                <Box ref={qrRef} className={!validCodes || pdfLoaded ? "display-none" : ""}>
                    <Grid container spacing={4} justifyContent="center">
                        {qrCodes.map((qrCode, index) => (
                            <Grid item key={"div-pdf" + index}>
                                <Paper elevation={3} className="bg-white padding-1rem max-width-34rem">
                                    <QRCodeCanvas
                                        value={qrCode["data"]}
                                        key={"qrcode-pdf" + index}
                                        id={"qrCode" + index}
                                        size={512}
                                        level={quality}
                                        imageSettings={logoOn ? QR_LOGO : {}}
                                    />
                                    <Typography className="color-black">
                                        {qrCode["description"]}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <MySpacer size={20} horizontal />

                <MySpeedDial page={"scan-and-go"} />

                {(loading || pdfLoading) && (<MyLoadingPage />)}
            </Box>
        </Fade>
    );
}
