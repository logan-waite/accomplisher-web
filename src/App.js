import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { store } from 'src/redux'
import Layout from './layouts/base'
import theme from 'src/theme'

export default () => (
  <ReduxProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  </ReduxProvider>
)
