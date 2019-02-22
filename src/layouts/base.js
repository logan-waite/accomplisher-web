import React from 'react'
import Routes from '../routes'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const NavLink = props => (
  <Typography variant='h6'>
    <Link to={props.to} className={props.classes.navLink}>
      {props.text}
    </Link>{' '}
  </Typography>
)

const Layout = ({ classes, children }) => (
  <div className={classes.root}>
    <CssBaseline />
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <NavLink to='/' classes={classes} text='Goals' />
        <NavLink
          to='/accomplishments'
          classes={classes}
          text='Accomplishments'
        />
      </Toolbar>
    </AppBar>
    <main className={classes.content}>
      <Routes />
    </main>
  </div>
)

const styles = theme => ({
  appBar: {
    color: 'white'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingTop: 75
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    marginRight: 15
  },
  root: {
    display: 'flex'
  }
})

export default withStyles(styles)(Layout)
