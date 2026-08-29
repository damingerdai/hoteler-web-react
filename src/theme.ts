import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    darkBgLight: Palette["primary"];
  }

  interface PaletteOptions {
    darkBgLight?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5330bc",
    },
    darkBgLight: {
      main: "#1a1a1a",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
