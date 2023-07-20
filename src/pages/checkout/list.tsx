import React, { useEffect, useState } from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IResourceComponentsProps,
  useTranslate,
  useMany,
} from "@refinedev/core";
import { Checkbox } from "@mui/material";
import { supabaseClient } from "../../utility";

export const CheckoutList: React.FC<IResourceComponentsProps> = () => {

  interface Book {
    id: string;
    title: string;
    // Add other properties if available
}
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();
  const [bookData, setBookData] = useState<Book[]>([]);


  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const { data, error } = await supabaseClient.from("book").select("*");
        if (error) {
          console.error("Error fetching book data:", error);
          return;
        }
        setBookData(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
      }
    };

    fetchBookData();
  }, []);

  const { data: bookCopyData, isLoading: bookCopyIsLoading } = useMany({
    resource: "book_copy",
    ids: dataGridProps?.rows?.map((item: any) => item?.book_copy_id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: patronAccountData, isLoading: patronAccountIsLoading } =
    useMany({
      resource: "patron_account",
      ids:
        dataGridProps?.rows?.map((item: any) => item?.patron_account_id) ?? [],
      queryOptions: {
        enabled: !!dataGridProps?.rows,
      },
    });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: translate("checkout.fields.id"),
        minWidth: 50,
      },
      // {
      //     field: "book_copy_id",
      //     flex: 1,
      //     headerName: translate("checkout.fields.book_copy_id"),
      //     minWidth: 300,
      //     renderCell: function render({ value }) {
      //         return bookCopyIsLoading ? (
      //             <>Loading...</>
      //         ) : (
      //             bookCopyData?.data?.find((item) => item.id === value)
      //         );
      //     },
      // },
      // {
      //     field: "patron_account_id",
      //     flex: 1,
      //     headerName: translate("checkout.fields.patron_account_id"),
      //     minWidth: 300,
      //     renderCell: function render({ value }) {
      //         return patronAccountIsLoading ? (
      //             <>Loading...</>
      //         ) : (
      //             patronAccountData?.data?.find(
      //                 (item) => item.id === value,
      //             )
      //         );
      //     },
      // },
      {
        field: "book_copy_id",
        flex: 1,
        headerName: translate("checkout.fields.book_copy_id"),
        minWidth: 300,
        renderCell: function render({ value }) {
          const matchingCopy = bookCopyData?.data?.find(
            (item) => item.id === value
          );

          if (bookCopyIsLoading) {
            return <>Loading...</>;
          } else if (matchingCopy) {
            const bookId = matchingCopy.book_id;
            const matchingBook = bookData?.find((item) => item.id === bookId);


            if (matchingBook) {
              return <span>{matchingBook.title}</span>;
            }
          }

          return null; // Or any default value if no match is found
        },
      },
      {
        field: "patron_account_id",
        flex: 1,
        headerName: translate("checkout.fields.patron_account_id"),
        minWidth: 300,
        renderCell: function render({ value }) {
          const matchingAccount = patronAccountData?.data?.find(
            (item) => item.id === value
          );

          if (patronAccountIsLoading) {
            return <>Loading...</>;
          } else if (matchingAccount) {
            return <span>{matchingAccount.name}</span>;
          } else {
            return null; // Or any default value you prefer if no match is found
          }
        },
      },
      {
        field: "return_date",
        flex: 1,
        headerName: translate("checkout.fields.return_date"),
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "return_status",
        headerName: translate("checkout.fields.return_status"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "fine_amount ",
        flex: 1,
        headerName: translate("checkout.fields.fine_amount "),
        type: "number",
        minWidth: 200,
      },
      {
        field: "created_at",
        flex: 1,
        headerName: translate("checkout.fields.created_at"),
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: translate("table.actions"),
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [translate, bookCopyData?.data, patronAccountData?.data]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
