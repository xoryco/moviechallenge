import { createMuiTheme } from "@material-ui/core/styles";
/*import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';*/

export default createMuiTheme({
  
  palette: {
    common: { black: "#000", white: "rgba(255, 255, 255, 1)" },
    background: { paper: "rgba(255, 255, 255, 1)", default: "#fafafa" },
    primary: {
      light: "rgba(147, 147, 147, 1)",
      main: "rgba(0, 0, 0, 1)",
      dark: "rgba(110, 110, 110, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "rgba(228, 10, 19, 1)",
      dark: "#c51162",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    title: {
        color: 'black'
    }, 
    useNextVariants: true
  },
  title: {
    color: "red",
    fontSize: 25
  },
  overrides: {
    MuiSlider: {
      track: { backgroundColor: 'red' },
      thumb: { backgroundColor: 'red' },
    },
    CardHeader: {color: "black"}
  }
});
