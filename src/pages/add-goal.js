import React, { useRef, useEffect } from 'react'
import {
  Typography,
  withStyles,
  TextField,
  Button,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-regular-svg-icons'
import * as R from 'ramda'
import ActionStep from 'src/components/action-step'
import { Creators } from 'src/redux/goals'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  addGoal: ({ title, setDate, actionSteps, nextActionStep }) => {
    dispatch(Creators.addGoal(title, setDate, actionSteps, nextActionStep))
  }
})

const Title = ({ classes, name, handleChange }) => {
  return (
    <div>
      <Typography paragraph>
        Choose a goal you would like to complete. Try to pick one you could do
        in 30 days, so you can start filling up your accomplishment board.
      </Typography>
      <TextField
        name='title'
        id='goal-title'
        label='Goal Title'
        className={classes.textField}
        value={name}
        onChange={handleChange}
        margin='normal'
        variant='outlined'
        fullWidth
      />
    </div>
  )
}

const ActionSteps = ({
  classes,
  actionSteps,
  handleChange,
  handleAddAction
}) => {
  const endDiv = useRef(null)

  useEffect(
    () => {
      endDiv.current.scrollIntoView()
    },
    [R.values(actionSteps).length]
  )
  return (
    <div className={classes.root}>
      <Typography paragraph>
        List out the steps that you can take to help you achieve your goal. Each
        step should only take around one day to complete. Don't worry about the
        order you'll do them in, we'll take care of that later.
      </Typography>
      <div className={classes.actionStepWrapper}>
        {R.values(actionSteps).map((actionStep, index) => {
          let num = index + 1
          return (
            <TextField
              key={index}
              name={`actionStep${num}`}
              id={`action-step-${num}`}
              label={`Action Step ${num}`}
              className={classes.textField}
              value={actionStep.title}
              onChange={handleChange}
              margin='normal'
              variant='outlined'
              fullWidth
            />
          )
        })}
        <div ref={endDiv} />
      </div>
      <Button
        variant='text'
        className={classes.addButton}
        onClick={handleAddAction}
      >
        <FontAwesomeIcon icon={faPlus} className={classes.leftIcon} /> Add
        Another Step
      </Button>
    </div>
  )
}

const ChooseActionStep = props => {
  return (
    <div>
      <Typography paragraph>
        Now choose the first action step that you will do to start working
        towards your goal.
      </Typography>
      <div className={props.classes.actionStepWrapper}>
        <List>
          {R.values(props.actionSteps).map(actionStep => (
            <ActionStep
              radio
              key={actionStep.id}
              actionStep={actionStep}
              isChecked={props.nextActionStep === actionStep.id}
              handleClick={props.handleSelectActionStep(actionStep.id)}
            />
          ))}
        </List>
      </div>
    </div>
  )
}

class AddGoal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      screenPosition: 0,
      title: '',
      actionSteps: {
        1: { id: 1, title: '', completed: false },
        2: { id: 2, title: '', completed: false },
        3: { id: 3, title: '', completed: false }
      },
      nextActionStep: 0
    }
  }

  handleSelectActionStep = actionStepId => event => {
    this.setState({ nextActionStep: actionStepId })
  }

  handleChange = event => {
    let name = event.target.name
    let value = event.target.value

    if (name.indexOf('actionStep') > -1) {
      var index = name.slice(10)
      var actionSteps = this.state.actionSteps
      actionSteps[index].title = value
      this.setState({ actionSteps })
    } else {
      this.setState({ [name]: value })
    }
  }

  handleNext = event => {
    if (this.state.screenPosition === 0) {
      this.setState({ screenPosition: 1 })
    } else if (this.state.screenPosition === 1) {
      this.setState({ screenPosition: 2 })
    } else if (this.state.screenPosition === 2) {
      // submit to redux
      this.props.addGoal(this.state)
      this.props.handleClose()
    }
  }

  handleAddAction = event => {
    var length = Object.keys(this.state.actionSteps).length
    var actionSteps = R.assoc(
      length + 1,
      {
        id: length + 1,
        title: '',
        completed: false
      },
      this.state.actionSteps
    )
    this.setState({ actionSteps })
  }

  getCurrentScreen = () => {
    if (this.state.screenPosition === 0) {
      return (
        <Title
          classes={this.props.classes}
          handleChange={this.handleChange}
          name={this.state.title}
        />
      )
    } else if (this.state.screenPosition === 1) {
      return (
        <ActionSteps
          classes={this.props.classes}
          handleChange={this.handleChange}
          actionSteps={this.state.actionSteps}
          handleAddAction={this.handleAddAction}
        />
      )
    } else if (this.state.screenPosition === 2) {
      return (
        <ChooseActionStep
          classes={this.props.classes}
          actionSteps={this.state.actionSteps}
          nextActionStep={this.state.nextActionStep}
          handleSelectActionStep={this.handleSelectActionStep}
        />
      )
    }
  }

  disableButton = () => {
    if (this.state.screenPosition === 0 && this.state.title === '') {
      return true
    } else if (
      this.state.screenPosition === 1 &&
      R.values(this.state.actionSteps).filter(
        actionStep => actionStep.title === ''
      ).length > 0
    ) {
      return true
    } else if (
      this.state.screenPosition === 2 &&
      this.state.nextActionStep === 0
    ) {
      return true
    } else return false
  }

  render () {
    return (
      <Dialog
        className={this.props.classes.paper}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={this.props.isOpen}
        onClose={this.props.handleClose}
      >
        <DialogTitle>Add a Goal</DialogTitle>
        <DialogContent>{this.getCurrentScreen()}</DialogContent>
        <DialogActions>
          <Button
            disabled={this.disableButton()}
            variant='contained'
            color='primary'
            className={this.props.classes.nextButton}
            onClick={this.handleNext}
          >
            {this.state.screenPosition === 2 ? 'Submit' : 'Next'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  actionStepWrapper: {
    overflowY: 'auto',
    maxHeight: 240,
    '&:firstChild': {
      marginTop: 0
    }
  },
  paper: {
    maxWidth: 500,
    maxHeight: 600
  },
  textField: {
    marginTop: theme.spacing.unit
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit
  },
  nextButton: {
    // float: 'right',
    // marginRight: -theme.spacing.unit,
    // marginTop: theme.spacing.unit * 2
  },
  addButton: {},
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

export default R.pipe(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AddGoal)
