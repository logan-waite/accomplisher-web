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
      expanded: false
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render () {
    console.log(this.props)
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.container}>
          <GoalCard onExpandClick={this.handleExpandClick} />
          <GoalCard />
          <GoalCard />
          <GoalCard />
          <GoalCard />
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
  connect(mapStateToProps),
  withStyles(styles)
)(Goals)
