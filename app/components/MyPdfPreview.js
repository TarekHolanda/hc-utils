import React from "react";
import { Document, Page } from "@react-pdf/renderer";

export const MyPdfPreview = ({ data }) => (
    <Document>
        <Page size="A4">{data}</Page>
    </Document>
);
