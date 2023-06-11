import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    inlineSmall: {
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "calc(100% / 3)",
    },
    inlineNotSmall: {
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "calc(100% / 2)",
    },
    qrCodeSmall: {
        width: "180px",
        height: "180px",
    },
    qrCodeMedium: {
        width: "280",
        height: "280px",
    },
    qrCodeLarge: {
        width: "350px",
        height: "350px",
    },
    descriptionSmall: {
        width: "180px",
        height: "64px",
    },
    descriptionMedium: {
        width: "280px",
        height: "64px",
    },
    descriptionLarge: {
        width: "350px",
        height: "64px",
    },
    vertical: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});
