import React, { Component } from 'react'
import GoalCard from 'src/components/goal-card'
import { withStyles } from '@material-ui/core'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { stateKey } from 'src/redux/goals'

const mapStateToProps = state => {
  return {
    goals: state[stateKey].list
  }
}

class Goals extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expandedGoal: null
    }
  }

  handleExpandClick = key => event => {
    let newExpandedGoal = this.state.expandedGoal === key ? 0 : key
    this.setState(state => ({ expandedGoal: newExpandedGoal }))
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
        </div>
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
    display: 'flex',
    maxWidth: 960,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})

export default R.pipe(
  withStyles(styles),
  connect(mapStateToProps)
)(Goals)
