import { createActions, createReducer } from 'reduxsauce'
import * as R from 'ramda'

const stateKey = 'goals'

const initialState = {
  list: [
    { id: 1, title: 'Cool goal 1', setDate: '2018-01-01' },
    { id: 2, title: 'Cool goal 2', setDate: '2018-01-02' },
    { id: 3, title: 'Cool goal 3', setDate: '2018-01-03' }
  ]
}

const { Types, Creators } = createActions({
  addGoal: ['title', 'setDate'],
  fetchGoals: []
})

const addGoal = (state, { title, completedDate }) => {
  const newList = state.records.concat([{ title, completedDate }])
  return R.assoc('list', newList, state)
}

const fetchGoals = state => state

const reducers = createReducer(initialState, {
  [Types.ADD_GOAL]: addGoal,
  [Types.FETCH_GOALS]: fetchGoals
})

export { Types, Creators, stateKey, reducers }
