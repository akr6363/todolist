
import {createTheme} from "@mui/material";
import {amber, blueGrey, cyan, pink} from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#afafaf',
        },
        secondary:  amber,
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: pink['A200'],
        },
        secondary: {
            main: cyan['A400'],
        },
        background: {
            default: blueGrey['800'],
            paper: blueGrey['700'],
        },
    },
});