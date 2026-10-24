import { Box, Button, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
export default function PageHeader({
  title,
  action,
  onCreate
}: {
  title: string;
  action?: string;
  onCreate?: () => void;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={theme => ({
        mb: 3,
        p: 2.5,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        color: 'text.primary',
        transition: theme.transitions.create('border-color', {
          duration: 200
        }),
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.5)
        }
      })}
    >
      <Box>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'primary.main', mt: 0.5, fontWeight: 500 }}
        >
          Hoteler / {title}
        </Typography>
      </Box>
      {action && onCreate && (
        <Button variant="contained" startIcon={<Add />} onClick={onCreate}>
          {action}
        </Button>
      )}
    </Stack>
  );
}
