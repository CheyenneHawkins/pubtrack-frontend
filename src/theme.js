import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material'

const pubTheme = createTheme({
    palette: {
        primary: {
            main: colors.lightBlue[400]
        }
    },
    typography: {
        fontFamily: ['indivisible', 'Open Sans'].join(','),
    },
    text: {
        primary: colors.deepOrange[500]
    }
})

export default pubTheme;