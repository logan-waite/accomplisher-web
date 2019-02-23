import React from 'react'
import {
  Typography,
  ListItem,
  withStyles,
  ListItemSecondaryAction
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/pro-regular-svg-icons'
import { faCheckSquare } from '@fortawesome/pro-solid-svg-icons'
import { Creators } from 'src/redux/goals'
import * as R from 'ramda'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  toggleActionStep: (goalId, actionStepId, currentStatus) => {
    dispatch(Creators.toggleActionStep(goalId, actionStepId, !currentStatus))
  }
})

const ActionStep = props => {
  var icon = props.actionStep.completed ? faCheckSquare : faSquare

  const handleClick = () => {
    props.toggleActionStep(
      props.goalId,
      props.actionStep.id,
      props.actionStep.completed
    )
  }

  return (
    <div onClick={handleClick}>
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

const styles = {
  actionStep: {
    fontSize: 16
  }
}

export default R.pipe(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ActionStep)
