import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  palette: { primary: { main: '#5330bc' } },
  typography: { fontFamily: 'Roboto, "Noto Sans SC", sans-serif' },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
    MuiTextField: { defaultProps: { fullWidth: true } }
  }
});
