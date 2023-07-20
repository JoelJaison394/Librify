import React from "react";
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

export const BookCopyList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const { data: bookData, isLoading: bookIsLoading } = useMany({
        resource: "book",
        ids: dataGridProps?.rows?.map((item: any) => item?.book_id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("book_copy.fields.id"),
                minWidth: 50,
            },
            {
                field: "book_id",
                flex: 1,
                headerName: translate("book_copy.fields.book_id"),
                minWidth: 300,
                renderCell: function render({ value }) {
                    return bookIsLoading ? (
                        <>Loading...</>
                    ) : (
                        bookData?.data?.find((item) => item.id === value)?.title
                    );
                },
            },
            {
                field: "copy_number",
                flex: 1,
                headerName: translate("book_copy.fields.copy_number"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "acquisition_date",
                flex: 1,
                headerName: translate("book_copy.fields.acquisition_date"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "condition",
                flex: 1,
                headerName: translate("book_copy.fields.condition"),
                minWidth: 200,
            },
            {
                field: "purchase_price",
                flex: 1,
                headerName: translate("book_copy.fields.purchase_price"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "created_at",
                flex: 1,
                headerName: translate("book_copy.fields.created_at"),
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
        [translate, bookData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
