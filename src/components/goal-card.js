import React from 'react'
import {
  Card,
  CardContent,
  Collapse,
  List,
  Typography,
  withStyles,
  Divider
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import classnames from 'classnames'
import ActionStep from 'src/components/action-step'
import * as R from 'ramda'
import { Creators } from 'src/redux/goals'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  toggleActionStep: (goalId, actionStepId, completed) => {
    dispatch(Creators.toggleActionStep(goalId, actionStepId, !completed))
  }
})

const GoalCard = props => {
  const handleClick = ({ goalId, id, completed }) => event => {
    props.toggleActionStep(goalId, id, completed)
  }

  return (
    <Card className={props.classes.root}>
      <CardContent
        className={props.classes.content}
        onClick={props.onExpandClick}
      >
        <Typography variant='h6'>{props.goal.title}</Typography>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={classnames(props.classes.expand, {
            [props.classes.expandOpen]: props.expanded
          })}
        />
      </CardContent>
      <Collapse in={props.expanded} timeout='auto' unmountOnExit>
        <Divider variant='middle' />
        <CardContent className={props.classes.items}>
          <List>
            {R.values(props.goal.actionSteps).map((actionStep, index) => (
              <ActionStep
                key={index}
                isChecked={actionStep.completed}
                actionStep={actionStep}
                goalId={props.goal.id}
                handleClick={handleClick({
                  goalId: props.goal.id,
                  ...actionStep
                })}
              />
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
}

const styles = theme => ({
  root: {
    width: 300,
    margin: 10,
    height: 'fit-content'
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 14,
    '&:last-child': {
      paddingBottom: 14
    }
  },
  items: {
    padding: 14,
    '&:last-child': {
      paddingBottom: 14
    }
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

export default R.pipe(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(GoalCard)
