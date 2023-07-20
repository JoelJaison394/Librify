import { Edit, useAutocomplete } from "@refinedev/mui";
import {
  Box,
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate, useOne } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const CheckoutEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const checkoutData = queryResult?.data?.data;

  const { autocompleteProps: bookCopyAutocompleteProps } = useAutocomplete({
    resource: "book_copy",
    defaultValue: checkoutData?.book_copy_id,
  });

  const { autocompleteProps: patronAccountAutocompleteProps } =
    useAutocomplete({
      resource: "patron_account",
      defaultValue: checkoutData?.patron_account_id,
    });

  const { data: bookCopyData, isLoading: bookCopyIsLoading } = useOne({
    resource: "book_copy",
    id: checkoutData?.book_copy_id || "",
    queryOptions: {
      enabled: !!checkoutData?.book_copy_id,
    },
  });

  const { data: bookData, isLoading: bookIsLoading } = useOne({
    resource: "book",
    id: bookCopyData?.data?.book_id || "",
    queryOptions: {
      enabled: !!bookCopyData?.data?.book_id,
    },
  });

  const bookTitle = bookData?.data?.title;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("checkout.fields.id")}
          name="id"
          disabled
        />
        {bookIsLoading ? (
          <>Loading...</>
        ) : (
          <>
            <TextField
              label={translate("checkout.fields.book_title")}
              value={bookTitle}
              disabled
            />
          </>
        )}
        <Controller
          control={control}
          name="patron_account_id"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...patronAccountAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                return (
                  patronAccountAutocompleteProps?.options?.find(
                    (p) =>
                      p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("checkout.fields.patron_account_id")}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.patron_account_id}
                  helperText={(errors as any)?.patron_account_id?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("return_date", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.return_date}
          helperText={(errors as any)?.return_date?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={translate("checkout.fields.return_date")}
          name="return_date"
        />
        <Controller
          control={control}
          name="return_status"
          defaultValue={null as any}
          render={({ field }) => (
            <FormControlLabel
              label={translate("checkout.fields.return_status")}
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked);
                  }}
                />
              }
            />
          )}
        />
        <TextField
          {...register("fine_amount ", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.["fine_amount "]}
          helperText={(errors as any)?.["fine_amount "]?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("checkout.fields.fine_amount ")}
          name="fine_amount "
        />
        <TextField
          {...register("created_at", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.created_at}
          helperText={(errors as any)?.created_at?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={translate("checkout.fields.created_at")}
          name="created_at"
        />
      </Box>
    </Edit>
  );
};
