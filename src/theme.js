import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#111315",
    },
    secondary: {
      main: "#5d636a",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
