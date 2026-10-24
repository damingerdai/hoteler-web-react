import { alpha, createTheme } from '@mui/material/styles';

const PRIMARY_MAIN = '#5330bc';
const PRIMARY_DARK = '#3b1f8c';
const PRIMARY_LIGHT = '#7c5ce6';
const SECONDARY_MAIN = '#7B1FA1';

export const BRAND_GRADIENT =
  'linear-gradient(90deg, #5330bc 0%, #7B1FA1 100%)';
export const BRAND_GRADIENT_HOVER =
  'linear-gradient(90deg, #4626a3 0%, #68188a 100%)';

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: PRIMARY_MAIN,
          light: PRIMARY_LIGHT,
          dark: PRIMARY_DARK,
          contrastText: '#ffffff'
        },
        secondary: {
          main: SECONDARY_MAIN,
          light: '#9c4dcc',
          dark: '#4a0072',
          contrastText: '#ffffff'
        },
        background: {
          default: '#f8fafc',
          paper: '#ffffff'
        },
        text: {
          primary: '#1e1b4b',
          secondary: '#64748b'
        },
        divider: '#e5e7eb'
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#9b7ff3',
          light: '#bda8ff',
          dark: PRIMARY_MAIN,
          contrastText: '#130b2e'
        },
        secondary: {
          main: '#ce93d8',
          light: '#f3e5f5',
          dark: SECONDARY_MAIN,
          contrastText: '#1f082b'
        },
        background: {
          default: '#1f2022',
          paper: '#28292d'
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8'
        },
        divider: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  typography: { fontFamily: 'Roboto, "Noto Sans SC", sans-serif' },
  shape: { borderRadius: 10 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: BRAND_GRADIENT,
          boxShadow: 'none',
          color: '#ffffff'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8
        },
        contained: {
          background: BRAND_GRADIENT,
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': {
            background: BRAND_GRADIENT_HOVER,
            boxShadow: '0 8px 20px -4px rgba(83, 48, 188, 0.4)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          borderColor: alpha(theme.palette.primary.main, 0.18),
          transition: theme.transitions.create(['border-color', 'box-shadow'], {
            duration: 200
          }),
          '&:hover': {
            borderColor: alpha(theme.palette.primary.main, 0.45),
            boxShadow: `0 8px 24px -8px ${alpha(
              theme.palette.primary.main,
              0.16
            )}`
          }
        })
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          '& .MuiTableCell-head': {
            color: theme.palette.primary.main,
            fontWeight: 600
          }
        })
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main,
          fontWeight: 600
        })
      }
    },
    MuiTextField: { defaultProps: { fullWidth: true } }
  }
});
