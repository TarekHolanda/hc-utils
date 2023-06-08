"use client";

import { useSession, getSession } from "next-auth/react";
import { MyUnauthenticated } from "../components/MyUnauthenticated";
import { MyLoading } from "../components/MyLoading";

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import QRCodeCanvas from "qrcode.react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import {
    PDFDownloadLink,
    View,
    Text,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";

import "../styles/old_index.css";
import { formatData } from "./formatData";
import { Spacer } from "../components/MySpacer";

import { Backdrop, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UploadIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import { darkTheme } from "../components/darkTheme";
import { styles } from "./styles";
import { MyPdfPreview } from "../components/MyPdfPreview";

export default function Page() {
    const { data: session, status } = useSession();
    const [qrCodes, setQrCodes] = useState([]);
    const [qrCodesPDF, setQrCodesPDF] = useState(<View></View>);
    const [qrCodesLoaded, setQrCodesLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const qrRef = useRef();

    if (status === "loading") {
        return <>{MyLoading}</>;
    }

    if (status === "unauthenticated" || !session) {
        return (
            <Fade in={status === "unauthenticated"}>{MyUnauthenticated}</Fade>
        );
    }

    const generatePDF = (qrCodes) => {
        let aux = [];

        for (let i = 0; i < qrCodes.length; i++) {
            const canvas = qrRef?.current?.querySelector("#qrCode" + i);
            const qrCodeDataUri = canvas.toDataURL();
            aux.push({
                qrCodeDataUri: qrCodeDataUri,
                description: qrCodes[i]["description"],
            });
        }

        let table = [];
        for (let i = 0; i < aux.length; i += 9) {
            table.push(
                <View style={styles.vertical} key={"parent" + i}>
                    <View style={styles.inline} key={"view" + i}>
                        <View>
                            <Image
                                src={{
                                    uri: aux[i]
                                        ? aux[i].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i] ? aux[i].description : ""}
                            </Text>
                        </View>

                        <View>
                            <Image
                                src={{
                                    uri: aux[i + 1]
                                        ? aux[i + 1].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i + 1] ? aux[i + 1].description : ""}
                            </Text>
                        </View>

                        <View>
                            <Image
                                src={{
                                    uri: aux[i + 2]
                                        ? aux[i + 2].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i + 2] ? aux[i + 2].description : ""}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.inline} key={"view" + i + 1}>
                        <View>
                            <Image
                                src={{
                                    uri: aux[i + 3]
                                        ? aux[i + 3].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i + 3] ? aux[i + 3].description : ""}
                            </Text>
                        </View>
                        <View>
                            <Image
                                src={{
                                    uri: aux[i + 4]
                                        ? aux[i + 4].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i + 4] ? aux[i + 4].description : ""}
                            </Text>
                        </View>
                        <View>
                            <Image
                                src={{
                                    uri: aux[i + 5]
                                        ? aux[i + 5].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i + 5] ? aux[i + 5].description : ""}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.inline} key={"view" + i + 2}>
                        <View>
                            <Image
                                src={{
                                    uri: aux[i + 6]
                                        ? aux[i + 6].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i + 6] ? aux[i + 6].description : ""}
                            </Text>
                        </View>
                        <View>
                            <Image
                                src={{
                                    uri: aux[i + 7]
                                        ? aux[i + 7].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i + 7] ? aux[i + 7].description : ""}
                            </Text>
                        </View>
                        <View>
                            <Image
                                src={{
                                    uri: aux[i + 8]
                                        ? aux[i + 8].qrCodeDataUri
                                        : "./all-white.png",
                                    method: "GET",
                                    headers: { "Cache-Control": "no-cache" },
                                    body: "",
                                }}
                                style={styles.qrCode}
                            />
                            <Text style={styles.description}>
                                {aux[i + 8] ? aux[i + 8].description : ""}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }
        setQrCodesPDF(table);

        setTimeout(() => {
            setQrCodesLoaded(true);
        }, 1000);

        setTimeout(() => {
            stopLoading();
        }, 2000);
    };

    const downloadQRCode = async (e) => {
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
            const fileName = qrCodes[i]["description"] + ".png";
            zip.file(fileName, blob);
        }

        // Generate the zip file
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // Save the zip file
        FileSaver.saveAs(zipBlob, "QR Codes.zip");
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

                    setTimeout(() => {
                        generatePDF(dataFormatted);
                    }, 1000);
                },
            });
        }
    };

    const clearQRCode = () => {
        startLoading();
        setQrCodesLoaded(false);

        setTimeout(() => {
            document.getElementById("file").value = "";
            setQrCodes([]);
            stopLoading();
        }, 1100);
    };

    const startLoading = () => {
        setLoading(true);
    };

    const stopLoading = () => {
        setLoading(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Fade in={status !== null}>
                <main>
                    <Box>
                        <h1>Scan & Go - QR Code Generator (Inspector)</h1>

                        <Spacer size={24} horizontal={false} />

                        <Button
                            variant="contained"
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
                                id="file"
                                onChange={onFileUploaded}
                            />
                        </Button>

                        <Spacer size={24} horizontal />

                        <Button
                            variant="contained"
                            size="large"
                            onClick={downloadQRCode}
                            disabled={!qrCodesLoaded}
                            startIcon={<DownloadIcon />}
                        >
                            Download ZIP
                        </Button>

                        <Spacer size={20} horizontal />

                        <Button
                            variant="contained"
                            size="large"
                            component="label"
                            startIcon={<PdfIcon />}
                            className="pdf-button"
                        >
                            <PDFDownloadLink
                                document={<MyPdfPreview data={qrCodesPDF} />}
                                fileName="QR Codes.pdf"
                            >
                                {({ blob, url, loading, error }) =>
                                    "Download PDF"
                                }
                            </PDFDownloadLink>
                        </Button>

                        <Spacer size={20} horizontal />

                        <Button
                            variant="contained"
                            size="large"
                            onClick={clearQRCode}
                            startIcon={<DeleteIcon />}
                        >
                            Clear
                        </Button>
                    </Box>

                    <Spacer size={20} horizontal />

                    <Fade in={qrCodesLoaded} timeout={500}>
                        <Box>
                            <PDFViewer
                                style={{ width: "100%", height: "1192px" }}
                            >
                                <MyPdfPreview data={qrCodesPDF} />
                            </PDFViewer>
                        </Box>
                    </Fade>

                    <Box sx={{ display: "none", marginTop: "96px" }}>
                        <Fade in={qrCodesLoaded} timeout={500}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="baseline"
                                className="bg-white color-black padding-bottom-32 qr-code-wrapper"
                                spacing={6}
                            >
                                {qrCodes.map((qrCode, index) => (
                                    <Grid
                                        key={"grid-preview" + index}
                                        item
                                        xs={12}
                                        sm={6}
                                        md={2}
                                    >
                                        <QRCodeCanvas
                                            value={qrCode["data"]}
                                            id={"qrCode" + index}
                                            key={"qrcode-preview" + index}
                                            size={256}
                                            level={"H"}
                                            imageSettings={{
                                                src: "./hc-icon-black.png",
                                                height: 38,
                                                width: 48,
                                                excavate: true,
                                            }}
                                        />
                                        <span className="display-block padding-side-4 line-break-any font-size-24">
                                            {qrCode["description"]}
                                        </span>
                                    </Grid>
                                ))}
                            </Grid>
                        </Fade>
                    </Box>

                    <Box sx={{ display: "none" }} ref={qrRef}>
                        {qrCodes.map((qrCode, index) => (
                            <div key={"div-pdf" + index}>
                                <QRCodeCanvas
                                    value={qrCode["data"]}
                                    key={"qrcode-pdf" + index}
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
                        ))}
                    </Box>

                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </main>
            </Fade>
        </ThemeProvider>
    );
}
