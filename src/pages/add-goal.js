import React, { useRef, useEffect } from 'react'
import { Typography, withStyles, TextField, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-regular-svg-icons'

const Title = ({ classes, name, handleChange }) => (
  <div>
    <Typography paragraph>
      Choose a goal you would like to complete. Try to pick one you could do in
      30 days, so you can start filling up your accomplishment board.
    </Typography>
    <TextField
      name='goalTitle'
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

const ActionSteps = ({
  classes,
  actionSteps,
  handleChange,
  handleAddAction
}) => {
  const endDiv = useRef(null)
  useEffect(() => {
    endDiv.current.scrollIntoView()
  })
  return (
    <div className={classes.root}>
      <Typography paragraph>
        List out the steps that you can take to help you achieve your goal. Each
        step should only take around one day to complete.
      </Typography>
      <div className={classes.actionStepWrapper}>
        {actionSteps.map((actionStep, index) => {
          return (
            <TextField
              key={index}
              name={`actionStep${index}`}
              id={`action-step-${index}`}
              label={`Action Step ${index + 1}`}
              className={classes.textField}
              value={actionStep}
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

const ChooseActionStep = props => (
  <div>
    <Typography paragraph>
      Now choose the first action step that you will do to start working towards
      your goal.
    </Typography>
  </div>
)

const scrollToTop = (scrollToDiv, parentDiv) => {
  let topPos = scrollToDiv.offsetTop
  console.log({ topPos, parentDiv: parentDiv.scrollTop })
  parentDiv.scrollTop = topPos
  console.log({ parentDiv: parentDiv.scrollTop })
}

class AddGoal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      screenPosition: 0,
      goalTitle: '',
      actionSteps: ['', '', '']
    }
  }

  handleChange = event => {
    let name = event.target.name
    let value = event.target.value

    if (name.indexOf('actionStep') > -1) {
      var index = name.slice(10)
      var actionSteps = this.state.actionSteps
      actionSteps[index] = value
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
      console.log('last page!')
    }
  }

  handleAddAction = event => {
    var actionSteps = this.state.actionSteps.concat([''])
    this.setState({ actionSteps })
  }

  getCurrentScreen = () => {
    if (this.state.screenPosition === 0) {
      return (
        <Title
          classes={this.props.classes}
          handleChange={this.handleChange}
          name={this.state.name}
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
      return <ChooseActionStep />
    }
  }

  render () {
    return (
      <div className={this.props.classes.paper}>
        <Typography variant='h6' id='modal-title'>
          Add a Goal
        </Typography>
        {this.getCurrentScreen()}
        <Button
          variant='contained'
          color='primary'
          className={this.props.classes.nextButton}
          onClick={this.handleNext}
        >
          {this.state.screenPosition === 2 ? 'Submit' : 'Next'}
        </Button>
      </div>
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
    maxHeight: theme.spacing.unit * 29
  },
  paper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: theme.spacing.unit * 60,
    maxHeight: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  },
  textField: {
    marginTop: theme.spacing.unit
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit
  },
  nextButton: {
    float: 'right',
    marginRight: -theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  addButton: {},
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

export default withStyles(styles)(AddGoal)
