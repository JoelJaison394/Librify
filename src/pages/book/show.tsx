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
  MarkdownField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const BookShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
      resource: "category",
      id: record?.category_id || "",
      queryOptions: {
          enabled: !!record,
      },
  });

  const { data: authorData, isLoading: authorIsLoading } = useOne({
      resource: "author",
      id: record?.author_id || "",
      queryOptions: {
          enabled: !!record,
      },
  });

  const { data: publisherData, isLoading: publisherIsLoading } = useOne({
      resource: "publisher",
      id: record?.publisher_id || "",
      queryOptions: {
          enabled: !!record,
      },
  });

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.created_at")}
              </Typography>
              <DateField value={record?.created_at} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.title")}
              </Typography>
              <TextField value={record?.title} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.ISBN")}
              </Typography>
              <TextField value={record?.ISBN} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.language")}
              </Typography>
              <TextField value={record?.language} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.description")}
              </Typography>
              <MarkdownField value={record?.description} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.publication_date")}
              </Typography>
              <DateField value={record?.publication_date} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.category_id")}
              </Typography>

              {categoryIsLoading ? (
                  <>Loading...</>
              ) : (
                  <>{categoryData?.data?.name}</>
              )}
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.author_id")}
              </Typography>

              {authorIsLoading ? (
                  <>Loading...</>
              ) : (
                  <>{authorData?.data?.name}</>
              )}
              <Typography variant="body1" fontWeight="bold">
                  {translate("book.fields.publisher_id")}
              </Typography>

              {publisherIsLoading ? (
                  <>Loading...</>
              ) : (
                  <>{publisherData?.data?.name}</>
              )}
          </Stack>
      </Show>
  );
};
