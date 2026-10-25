import { useId } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import type { AnyObjectSchema } from 'yup';
import { errorMessage } from '../lib/request';
import { PasswordInput } from './password-input';

export interface Field {
  name: string;
  label: string;
  type?: string;
  options?: { value: string | number; label: string }[];
}
interface Props {
  title: string;
  fields: Field[];
  initialValues: Record<string, string | number>;
  schema: AnyObjectSchema;
  onSubmit: (values: Record<string, string | number>) => Promise<void>;
  onClose: () => void;
}
export default function FormDialog({
  title,
  fields,
  initialValues,
  schema,
  onSubmit,
  onClose
}: Props) {
  const id = useId();
  const form = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      helpers.setStatus(undefined);
      try {
        await onSubmit(values);
        onClose();
      } catch (error) {
        helpers.setStatus(errorMessage(error));
      }
    }
  });
  return (
    <Dialog
      open
      fullWidth
      maxWidth="sm"
      aria-labelledby={id}
      onClose={() => {
        if (!form.isSubmitting) onClose();
      }}
    >
      <form noValidate onSubmit={form.handleSubmit}>
        <DialogTitle id={id}>{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
            {form.status && <Alert severity="error">{form.status}</Alert>}
            {fields.map(field => {
              const props = {
                ...form.getFieldProps(field.name),
                label: field.label,
                required: true,
                error: !!(form.touched[field.name] && form.errors[field.name]),
                helperText: form.touched[field.name] && form.errors[field.name]
              };
              return field.type === 'password' ? (
                <PasswordInput
                  key={field.name}
                  {...props}
                  autoComplete="new-password"
                />
              ) : (
                <TextField
                  key={field.name}
                  {...props}
                  type={field.type || 'text'}
                  select={!!field.options}
                  slotProps={{ inputLabel: { shrink: true } }}
                >
                  {field.options?.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={form.isSubmitting}>
            取消
          </Button>
          <Button variant="contained" type="submit" loading={form.isSubmitting}>
            确定
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
