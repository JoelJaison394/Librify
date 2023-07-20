import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DateField,
  MarkdownField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IResourceComponentsProps,
  useTranslate,
  useMany,
} from "@refinedev/core";

export const BookList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "category",
    ids: dataGridProps?.rows?.map((item: any) => item?.category_id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: authorData, isLoading: authorIsLoading } = useMany({
    resource: "author",
    ids: dataGridProps?.rows?.map((item: any) => item?.author_id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: publisherData, isLoading: publisherIsLoading } = useMany({
    resource: "publisher",
    ids: dataGridProps?.rows?.map((item: any) => item?.publisher_id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: translate("Id"),
        minWidth: 180,
      },
      {
        field: "title",
        flex: 1,
        headerName: translate("Title"),
        minWidth: 250,
      },
      {
        field: "ISBN",
        flex: 1,
        headerName: translate("ISBN"),
        minWidth: 140,
      },
      {
        field: "language",
        flex: 1,
        headerName: translate("Language"),
        minWidth: 80,
      },
      {
        field: "description",
        flex: 1,
        headerName: translate("Description"),
        minWidth: 250,
        renderCell: function render({ value }) {
          return <MarkdownField value={(value ?? "").slice(0, 80) + "..."} />;
        },
      },
      {
        field: "publication_date",
        flex: 1,
        headerName: translate("Published Date"),
        minWidth: 120,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "category_id",
        flex: 1,
        headerName: translate("Category"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "author_id",
        flex: 1,
        headerName: translate("Author"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return authorIsLoading ? (
            <>Loading...</>
          ) : (
            authorData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "publisher_id",
        flex: 1,
        headerName: translate("Publisher"),
        minWidth: 200,
        renderCell: function render({ value }) {
          return publisherIsLoading ? (
            <>Loading...</>
          ) : (
            publisherData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "created_at",
        flex: 1,
        headerName: translate("Created At"),
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
    [translate, categoryData?.data, authorData?.data, publisherData?.data]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
