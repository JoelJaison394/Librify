import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  NumberField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const PatronAccountShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("patron_account.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("patron_account.fields.name")}
              </Typography>
              <TextField value={record?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("patron_account.fields.address")}
              </Typography>
              <TextField value={record?.address} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("patron_account.fields.email")}
              </Typography>
              <TextField value={record?.email} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("patron_account.fields.phone_number")}
              </Typography>
              <NumberField value={record?.phone_number ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("patron_account.fields.date_of_birth")}
              </Typography>
              <DateField value={record?.date_of_birth} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("patron_account.fields.registration_date")}
              </Typography>
              <DateField value={record?.registration_date} />
          </Stack>
      </Show>
  );
};
