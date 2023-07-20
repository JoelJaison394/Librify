import react , {useEffect , useState} from "react" ;
import { Create, useAutocomplete } from "@refinedev/mui";
import {
  Box,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { supabaseClient } from "../../utility";


export const CheckoutCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: bookCopyAutocompleteProps } = useAutocomplete({
    resource: "book_copy",
  });

  const { autocompleteProps: patronAccountAutocompleteProps } = useAutocomplete(
    {
      resource: "patron_account",
    }
  );

  const [bookData, setBookData] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const { data, error } = await supabaseClient.from('book').select('id, title');
        if (error) {
          console.error('Error fetching book data:', error);
          return;
        }
        setBookData(data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, []);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="book_copy_id"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...bookCopyAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                const matchingBook = bookData.find(
                  (book) => book.id === item?.book_id
                );
                return matchingBook ? matchingBook.title : "";
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("checkout.fields.book_copy_id")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.book_copy_id}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="patron_account_id"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
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
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
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
          // eslint-disable-next-line
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
    </Create>
  );
};
