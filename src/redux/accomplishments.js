import { createActions, createReducer } from 'reduxsauce'
import * as R from 'ramda'

const stateKey = 'accomplishments'

const initialState = {
  list: [{ title: 'Cool thing 1', completedDate: '2018-01-01' }]
}

const { Types, Creators } = createActions({
  addAccomplishment: ['title', 'completedDate'],
  fetchAccomplishments: []
})

const addAccomplishment = (state, { title, completedDate }) => {
  const newList = state.records.concat([{ title, completedDate }])
  return R.assoc('list', newList, state)
}

const fetchAccomplishments = state => state

const reducers = createReducer(initialState, {
  [Types.ADD_ACCOMPLISHMENT]: addAccomplishment,
  [Types.FETCH_ACCOMPLISHMENTS]: fetchAccomplishments
})

export { Types, Creators, stateKey, reducers }
