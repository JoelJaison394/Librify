import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
  useOne,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  NumberField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const BookCopyShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: bookData, isLoading: bookIsLoading } = useOne({
      resource: "book",
      id: record?.book_id || "",
      queryOptions: {
          enabled: !!record,
      },
  });

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("book_copy.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book_copy.fields.book_id")}
              </Typography>

              {bookIsLoading ? <>Loading...</> : <>{bookData?.data?.title}</>}
              <Typography variant="body1" fontWeight="bold">
                  {translate("book_copy.fields.copy_number")}
              </Typography>
              <NumberField value={record?.copy_number ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book_copy.fields.acquisition_date")}
              </Typography>
              <DateField value={record?.acquisition_date} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book_copy.fields.condition")}
              </Typography>
              <TextField value={record?.condition} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book_copy.fields.purchase_price")}
              </Typography>
              <NumberField value={record?.purchase_price ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book_copy.fields.created_at")}
              </Typography>
              <DateField value={record?.created_at} />
          </Stack>
      </Show>
  );
};
