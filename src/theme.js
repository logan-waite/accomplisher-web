import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#fff'
    },
    secondary: {
      light: '#33d375',
      main: '#00c853',
      dark: '#008c3a',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
})
