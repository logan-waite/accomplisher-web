import React, { Component } from 'react'
import GoalCard from 'src/components/goal-card'
import { withStyles, Fab, Dialog } from '@material-ui/core'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { stateKey } from 'src/redux/goals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-regular-svg-icons'
import AddGoal from 'src/pages/add-goal'

const mapStateToProps = state => {
  return {
    goals: state[stateKey].list
  }
}

class Goals extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expandedGoal: null,
      modalOpen: true
    }
  }

  handleExpandClick = key => event => {
    let newExpandedGoal = this.state.expandedGoal === key ? 0 : key
    this.setState({ expandedGoal: newExpandedGoal })
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render () {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.container}>
          {R.values(this.props.goals).map((goal, index) => (
            <GoalCard
              key={goal.id}
              onExpandClick={this.handleExpandClick(goal.id)}
              expanded={this.state.expandedGoal === goal.id}
              goal={goal}
            />
          ))}
          <Fab
            color='secondary'
            aria-label='Add'
            className={this.props.classes.fab}
            onClick={this.toggleModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Fab>
        </div>
        <AddGoal isOpen={this.state.modalOpen} handleClose={this.toggleModal} />
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    position: 'relative',
    display: 'flex',
    maxWidth: 960,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  fab: {
    position: 'absolute',
    right: '-56px',
    top: '-39px',
    zIndex: theme.zIndex.appBar + 1
    // backgroundColor: 'green'
  }
})

export default R.pipe(
  withStyles(styles),
  connect(mapStateToProps)
)(Goals)
