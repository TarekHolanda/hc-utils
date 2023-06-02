import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    inline: {
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "calc(100% / 3)",
    },
    qrCode: {
        width: "180px",
        height: "180px",
    },
    description: {
        width: "180px",
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
