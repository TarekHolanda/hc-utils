"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import UploadIcon from "@mui/icons-material/Upload";
import Divider from "@mui/material/Divider";

import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ReorderIcon from "@mui/icons-material/Reorder";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ImageIcon from "@mui/icons-material/Image";
import HideImageIcon from "@mui/icons-material/HideImage";

import Papa from "papaparse";
import QRCodeCanvas from "qrcode.react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { View, Text, PDFViewer, Image } from "@react-pdf/renderer";

import { formatData } from "./formatData";
import { MySpacer } from "../components/MySpacer";
import { MyLoading } from "../components/MyLoading";
import { MyPdfPreview } from "../components/MyPdfPreview";
import { styles } from "./styles";
import { MyUploadPageCenter } from "../components/MyUploadPageCenter";
import { MyUploadBar } from "../components/MyUploadBar";
import { Typography } from "@mui/material";

function PageContent(props) {
    if (!props.validCodes) {
        return MyUploadPageCenter(props);
    }

    return MyUploadBar(props);
}

const QR_LOGO = {
    src: "./hc-icon-black.png",
    height: 103,
    width: 128,
    excavate: true,
};

export default function Page() {
    const { data: session, status } = useSession();
    const [qrCodes, setQrCodes] = useState([]);
    const [qrCodesPDF, setQrCodesPDF] = useState(<View></View>);
    const [validCodes, setValidCodes] = useState(false);
    const [quality, setQuality] = useState("Q");
    const [logoOn, setLogoOn] = useState(true);
    const [loading, setLoading] = useState(false);
    const qrRef = useRef();

    const updateLogoOn = (event, newLogoOn) => {
        if (newLogoOn && newLogoOn !== logoOn) {
            setLogoOn(newLogoOn);

            if (validCodes) {
                setLoading(true);
                setTimeout(() => {
                    generatePDF();
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
                    generatePDF();
                }, 250);
            }
        }
    };

    useEffect(() => {
        if (qrCodes.length > 0) {
            setTimeout(() => {
                generatePDF();
            }, 1000);
        }
    }, [qrCodes]);

    if (status === "loading") {
        return <>{MyLoading}</>;
    }

    if (status === "unauthenticated" || !session) {
        redirect("/signin");
    }

    const generatePDF = () => {
        let aux = [];
        console.log("Foi... 0");
        console.log(qrCodes);
        console.log("Foi... 00");

        for (let i = 0; i < qrCodes.length; i++) {
            const canvas = qrRef?.current?.querySelector("#qrCode" + i);
            const qrCodeDataUri = canvas.toDataURL();
            aux.push({
                qrCodeDataUri: qrCodeDataUri,
                description: qrCodes[i]["description"],
            });
        }
        console.log("Foi... 1");

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

        console.log("Foi... 2");
        setQrCodesPDF(table);
        console.log("Foi... 3");
        setTimeout(() => {
            setValidCodes(true);
            console.log("Foi... 4");
        }, 1000);

        setTimeout(() => {
            console.log("Foi... 5");
            stopLoading();
        }, 2000);
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

                <MySpacer size={20} horizontal />

                <Divider />

                <Box>
                    <Typography variant="h6">Error Level</Typography>
                    <ToggleButtonGroup
                        value={quality}
                        exclusive
                        onChange={updateQuality}
                        aria-label="quality"
                    >
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

                    <Typography variant="h6">Show Logo</Typography>
                    <ToggleButtonGroup
                        value={logoOn}
                        exclusive
                        onChange={updateLogoOn}
                        aria-label="logo"
                    >
                        <ToggleButton value={true} aria-label="logo on">
                            <ImageIcon />
                        </ToggleButton>
                        <ToggleButton value={false} aria-label="logo off">
                            <HideImageIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Divider />

                <MySpacer size={20} horizontal />

                {validCodes && (
                    <Fade in={validCodes} timeout={500}>
                        <Box>
                            <PDFViewer
                                style={{ width: "100%", height: "1192px" }}
                            >
                                <MyPdfPreview data={qrCodesPDF} />
                            </PDFViewer>
                        </Box>
                    </Fade>
                )}

                <Box sx={{ display: "block" }} ref={qrRef}>
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

                {loading && <>{MyLoading}</>}
            </Box>
        </Fade>
    );
}

// This is how we previewed QR Codes before the PDF
// {oldQRCodesPreview(validCodes, qrCodes)}
// function oldQRCodesPreview(validCodes, qrCodes) {
//     return <Box sx={{ display: "none", marginTop: "96px" }}>
//         <Fade in={validCodes} timeout={500}>
//             <Grid
//                 container
//                 direction="row"
//                 justifyContent="space-evenly"
//                 alignItems="baseline"
//                 className="bg-white color-black padding-bottom-32 qr-code-wrapper"
//                 spacing={6}
//             >
//                 {qrCodes.map((qrCode, index) => (
//                     <Grid
//                         key={"grid-preview" + index}
//                         item
//                         xs={12}
//                         sm={6}
//                         md={2}
//                     >
//                         <QRCodeCanvas
//                             value={qrCode["data"]}
//                             id={"qrCode" + index}
//                             key={"qrcode-preview" + index}
//                             size={256}
//                             level={"H"}
//                             imageSettings={{
//                                 src: "./hc-icon-black.png",
//                                 height: 38,
//                                 width: 48,
//                                 excavate: true,
//                             }} />
//                         <span className="display-block padding-side-4 line-break-any font-size-24">
//                             {qrCode["description"]}
//                         </span>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Fade>
//     </Box>;
// }
