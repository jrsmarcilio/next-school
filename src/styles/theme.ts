import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D9E6F6",
      dark: "#1976d2"
      
    },
    secondary: {
      main: "#6F92BB",
      dark: "#5579A1",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#2E7BB4",
      secondary: "#388BB0",
      disabled: "#2F4A71", // Tertiary Text
    },
    background: {
      default: "#D9E6F6",
    },
  },
});

export default theme;
