import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  MarkdownField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const AuthorShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("author.fields.name")}
              </Typography>
              <TextField value={record?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("author.fields.biography")}
              </Typography>
              <MarkdownField value={record?.biography} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("author.fields.created_at")}
              </Typography>
              <DateField value={record?.created_at} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("author.fields.id")}
              </Typography>
              <TextField value={record?.id} />
          </Stack>
      </Show>
  );
};
