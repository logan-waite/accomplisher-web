import React from 'react'
import {
  Typography,
  ListItem,
  withStyles,
  ListItemSecondaryAction
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCircle } from '@fortawesome/pro-regular-svg-icons'
import {
  faCheckSquare,
  faCircle as faSolidCircle
} from '@fortawesome/pro-solid-svg-icons'
import PropTypes from 'prop-types'

const ActionStep = props => {
  var icon = props.isChecked
    ? props.radio
      ? faSolidCircle
      : faCheckSquare
    : props.radio
      ? faCircle
      : faSquare

  return (
    <div onClick={props.handleClick}>
      <ListItem className={props.classes.actionStep}>
        <Typography className={props.classes.actionStep}>
          {props.actionStep.title}
        </Typography>
        <ListItemSecondaryAction>
          <FontAwesomeIcon
            icon={icon}
            size='lg'
            className={props.classes.checkbox}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}

ActionStep.propTypes = {
  classes: PropTypes.object.isRequired,
  actionStep: PropTypes.object.isRequired
}

ActionStep.defaultProps = {
  radio: false
}

const styles = {
  actionStep: {
    fontSize: 16
  }
}

export default withStyles(styles)(ActionStep)
