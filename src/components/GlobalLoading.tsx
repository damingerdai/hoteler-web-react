import { Box, CircularProgress } from '@mui/material';
export default function GlobalLoading() {
  return (
    <Box
      role="status"
      aria-label="加载中"
      sx={{ display: 'flex', justifyContent: 'center', p: 6 }}
    >
      <CircularProgress />
    </Box>
  );
}
