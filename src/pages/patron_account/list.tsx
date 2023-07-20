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
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const PatronAccountList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("patron_account.fields.id"),
                minWidth: 50,
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("patron_account.fields.name"),
                minWidth: 200,
            },
            {
                field: "address",
                flex: 1,
                headerName: translate("patron_account.fields.address"),
                minWidth: 200,
            },
            {
                field: "email",
                flex: 1,
                headerName: translate("patron_account.fields.email"),
                minWidth: 200,
            },
            {
                field: "phone_number",
                flex: 1,
                headerName: translate("patron_account.fields.phone_number"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "date_of_birth",
                flex: 1,
                headerName: translate("patron_account.fields.date_of_birth"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "registration_date",
                flex: 1,
                headerName: translate(
                    "patron_account.fields.registration_date",
                ),
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
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
