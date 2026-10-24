import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
export default function PageHeader({
  title,
  action,
  onCreate
}: {
  title: string;
  action: string;
  onCreate: () => void;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 3, alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={onCreate}>
        {action}
      </Button>
    </Stack>
  );
}
