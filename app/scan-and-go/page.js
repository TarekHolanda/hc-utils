"use client";

import React, { useState, useRef, useEffect } from "react";
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

import Papa from "papaparse";
import QRCodeCanvas from "qrcode.react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { View, Text, PDFViewer, Image } from "@react-pdf/renderer";

import { formatData } from "./formatData";
import { MySpacer } from "../components/MySpacer";
import { MyLoadingPage } from "../components/MyLoadingPage";
import { MyPdfPreview } from "../components/MyPdfPreview";
import { styles } from "./styles";
import { MyUploadPageCenter } from "../components/MyUploadPageCenter";
import { MyUploadBar } from "../components/MyUploadBar";
import { MySpeedDial } from "../components/MySpeedDial";

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

function PageContent(props) {
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

export default function Page() {
    const { data: session, status } = useSession();
    const [qrCodes, setQrCodes] = useState([]);
    const [qrCodesPDF, setQrCodesPDF] = useState(<View></View>);
    const [validCodes, setValidCodes] = useState(false);
    const [quality, setQuality] = useState("Q");
    const [logoOn, setLogoOn] = useState(true);
    const [size, setSize] = useState("small");
    const [loading, setLoading] = useState(false);
    const qrRef = useRef();
    const qrCodesDivRef = useRef();

    const generatePDF = (pdfSize) => {
        let aux = [];

        for (let i = 0; i < qrCodes.length; i++) {
            const canvas = qrRef?.current?.querySelector("#qrCode" + i);
            const qrCodeDataUri = canvas.toDataURL();
            aux.push({
                qrCodeDataUri: qrCodeDataUri,
                description: qrCodes[i]["description"],
            });
        }

        const table = buildPDF(aux, pdfSize);

        setQrCodesPDF(table);

        setTimeout(() => {
            setValidCodes(true);
        }, 1000);

        setTimeout(() => {
            stopLoading();
        }, 2000);
    };

    useEffect(() => {
        if (qrCodes.length > 0) {
            setTimeout(() => {
                generatePDF(size);
            }, 1000);
        }
    }, [qrCodes]);

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const updateSize = (event, newSize) => {
        if (newSize && newSize !== size) {
            setSize(newSize);

            if (validCodes) {
                setLoading(true);
                generatePDF(newSize);
            }
        }
    };

    const updateLogoOn = (event, newLogoOn) => {
        if (newLogoOn !== null && newLogoOn !== logoOn) {
            setLogoOn(newLogoOn);

            if (validCodes) {
                setLoading(true);

                setTimeout(() => {
                    generatePDF(size);
                }, 250);
            }
        }
    };

    const updateQuality = (event, newQuality) => {
        if (newQuality && newQuality !== quality) {
            setQuality(newQuality);

            if (validCodes) {
                setLoading(true);
                setTimeout(() => {
                    generatePDF(size);
                }, 250);
            }
        }
    };

    const downloadQRCodes = async (e) => {
        e.preventDefault();
        const zip = new JSZip();

        // Generate a QR code for each item in the array and add it to the zip
        for (let i = 0; i < qrCodes.length; i++) {
            const canvas = qrRef?.current?.querySelector("#qrCode" + i);
            const descriptionSize = qrCodes[i]["description"].length;

            // Add margin to the QR Code
            const canvasWithMargin = document.createElement("canvas");
            const marginContext = canvasWithMargin.getContext("2d");
            canvasWithMargin.width = canvas.width + 32;


            const auxMinus = canvas.width > 512 ? 3 : 1;
            const limit1 = parseInt(1 / 12 * canvas.width) - auxMinus;
            const limit2 = 5 / 128 * canvas.width;

            if (descriptionSize >= limit1) {
                canvasWithMargin.height = canvas.height + 184;
            } else if (descriptionSize >= limit2) {
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
                qrCodes[i]["description"].substring(0, limit2),
                12,
                canvas.height + 80
            );
            if (descriptionSize >= 23) {
                labelContext.fillText(
                    qrCodes[i]["description"].substring(limit2, limit1 - 1),
                    12,
                    canvas.height + 128
                );
            }
            if (descriptionSize >= 45) {
                labelContext.fillText(
                    qrCodes[i]["description"].substring(limit1 - 1, descriptionSize),
                    12,
                    canvas.height + 176
                );
            }

            const blob = await new Promise((resolve) =>
                canvasWithMargin.toBlob(resolve)
            );
            const fileName = qrCodes[i]["description"] + ".png";
            zip.file(fileName, blob);

            // Dev Mode: Show QR Codes image preview
            // showImagePreview(blob);
        }

        // Generate the zip file
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // Save the zip file
        FileSaver.saveAs(zipBlob, "QR Codes.zip");
    };

    const showImagePreview = (blob) => {
        const qrCodeDiv = document.createElement("div");
        qrCodeDiv.style.width = "512px";
        qrCodeDiv.style.height = "512px";
        qrCodeDiv.style.display = "inline-block";
        qrCodeDiv.style.margin = "16px";
        qrCodeDiv.style.position = "relative";

        const qrCodeImage = document.createElement("img");
        qrCodeImage.src = URL.createObjectURL(blob);
        qrCodeImage.style.width = "512px";
        qrCodeImage.style.height = "512px";
        qrCodeImage.style.position = "absolute";
        qrCodeImage.style.top = "0";
        qrCodeImage.style.left = "0";

        qrCodeDiv.appendChild(qrCodeImage);
        qrCodesDivRef.current.innerHTML = "";
        qrCodesDivRef.current.appendChild(qrCodeDiv);
    };

    const onFileUploaded = (e) => {
        if (e.target.files.length) {
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

                    setQrCodes(dataFormatted);
                },
            });
        }
    };

    const clearQRCodes = () => {
        startLoading();
        setValidCodes(false);
        setQrCodes([]);

        setTimeout(() => {
            document.getElementById("upload-file-center").value = "";
            stopLoading();
        }, 1000);
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
                <PageContent
                    validCodes={validCodes}
                    onFileUploaded={onFileUploaded}
                    downloadQRCodes={downloadQRCodes}
                    clearQRCodes={clearQRCodes}
                    pdfPreview={<MyPdfPreview data={qrCodesPDF} />}
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
                            <Typography variant="h6">Size</Typography>
                            <ToggleButtonGroup
                                value={size}
                                exclusive
                                onChange={updateSize}
                                aria-label="size">
                                <ToggleButton
                                    value="xsmall"
                                    aria-label="xsmall">
                                    <LooksOneIcon />
                                </ToggleButton>
                                <ToggleButton value="small" aria-label="small">
                                    <LooksTwoIcon />
                                </ToggleButton>
                                <ToggleButton
                                    value="medium"
                                    aria-label="medium">
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

                <Box ref={qrCodesDivRef}>
                </Box>

                {validCodes && (
                    <Fade in={validCodes} timeout={500}>
                        <Box>
                            <PDFViewer
                                style={{ width: "100%", height: "1192px" }}>
                                <MyPdfPreview data={qrCodesPDF} />
                            </PDFViewer>
                        </Box>
                    </Fade>
                )}

                <Box sx={{ display: "none" }} ref={qrRef}>
                    {qrCodes.map((qrCode, index) => (
                        <div key={"div-pdf" + index}>
                            <QRCodeCanvas
                                value={qrCode["data"]}
                                key={"qrcode-pdf" + index}
                                id={"qrCode" + index}
                                size={512}
                                level={quality}
                                imageSettings={logoOn ? QR_LOGO : {}}
                            />
                        </div>
                    ))}
                </Box>

                <MySpeedDial page={"scan-and-go"} />

                {/* This loading needs to be here, so the QR Codes can load after render */}
                {loading && <MyLoadingPage />}
            </Box>
        </Fade>
    );
}
