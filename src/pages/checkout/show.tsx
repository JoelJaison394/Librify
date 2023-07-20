import { useState } from "react";
import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
  useOne,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  DateField,
  BooleanField,
  NumberField,
} from "@refinedev/mui";
import { Typography, Stack, Paper, Box, Button } from "@mui/material";
import { renderToString } from "react-dom/server";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// PDF styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: "1rem",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  fieldValue: {
    fontSize: 12,
    marginBottom: "0.5rem",
  },
});

export const CheckoutShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: bookCopyData, isLoading: bookCopyIsLoading } = useOne({
    resource: "book_copy",
    id: record?.book_copy_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: patronAccountData, isLoading: patronAccountIsLoading } = useOne({
    resource: "patron_account",
    id: record?.patron_account_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: bookData, isLoading: bookIsLoading } = useOne({
    resource: "book",
    id: bookCopyData?.data?.book_id || "",
    queryOptions: {
      enabled: !!bookCopyData?.data,
    },
  });

  // Function to generate and download the PDF
  const generatePDF = () => {
    const doc = (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>{translate("checkout.show.title")}</Text>
          <Text style={styles.fieldLabel}>{translate("checkout.fields.id")}</Text>
          <Text style={styles.fieldValue}>{record?.id}</Text>
          {/* Render other fields as Text components */}
        </Page>
      </Document>
    );

    const pdfString = renderToString(doc);
    const pdfBlob = new Blob([pdfString], { type: "application/pdf" });
    saveAs(pdfBlob, "receipt.pdf");
  };

  return (
    <Show isLoading={isLoading}>
      <Paper elevation={2} sx={{ padding: "1rem" }}>
        <Stack spacing={2}>
          <Typography variant="h6">{translate("checkout.show.title")}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {translate("checkout.fields.id")}
          </Typography>
          <TextField value={record?.id} />

          {/* <Typography variant="body1" fontWeight="bold">
            {translate("checkout.fields.book_copy_id")}
          </Typography>
          {bookCopyIsLoading ? (
            <>Loading...</>
          ) : (
            <TextField value={bookCopyData?.data} />
          )} */}

          <Typography variant="body1" fontWeight="bold">
            {translate("checkout.fields.book_title")}
          </Typography>
          {bookIsLoading ? (
            <>Loading...</>
          ) : (
            <TextField value={bookData?.data?.title} />
          )}

          <Typography variant="body1" fontWeight="bold">
            {translate("checkout.fields.patron_account_id")}
          </Typography>
          {patronAccountIsLoading ? (
            <>Loading...</>
          ) : (
            <TextField value={patronAccountData?.data?.name} />
          )}

          <Typography variant="body1" fontWeight="bold">
            {translate("checkout.fields.return_date")}
          </Typography>
          <DateField value={record?.return_date} />

          <Typography variant="body1" fontWeight="bold">
            {translate("checkout.fields.return_status")}
          </Typography>
          <BooleanField value={record?.return_status} />

          <Typography variant="body1" fontWeight="bold">
            {translate("checkout.fields.fine_amount")}
          </Typography>
          <NumberField value={record?.fine_amount ?? ""} />

          <Typography variant="body1" fontWeight="bold">
            {translate("checkout.fields.created_at")}
          </Typography>
          <DateField value={record?.created_at} />

          <Button variant="contained" onClick={generatePDF}>
            Download Receipt
          </Button>
        </Stack>
      </Paper>
    </Show>
  );
};
