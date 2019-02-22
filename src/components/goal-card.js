import React, { Component } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  List,
  ListItem,
  Typography,
  withStyles
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import classnames from 'classnames'

const GoalCard = props => (
  <Card className={props.classes.goalCard}>
    <CardContent
      className={props.classes.content}
      onClick={props.onExpandClick}
    >
      <Typography>This is a goal card</Typography>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={classnames(props.classes.expand, {
          [props.classes.expandOpen]: props.expanded
        })}
      />
    </CardContent>
    <Collapse in={props.expanded} timeout='auto' unmountOnExit>
      <CardContent>
        <List>
          <ListItem>
            <Typography>Hello?</Typography>
          </ListItem>
        </List>
      </CardContent>
    </Collapse>
  </Card>
)

const styles = theme => ({
  goalCard: {
    width: 300,
    margin: 10,
    height: 'fit-content'
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
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

export default withStyles(styles)(GoalCard)
