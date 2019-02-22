import { createStore, combineReducers, applyMiddleware } from 'redux'
import { stateKey as goalsStateKey, reducers as goalsReducer } from './goals'
import {
  stateKey as accomplishmentsStateKey,
  reducers as accomplishmentsReducer
} from './accomplishments'

import logger from 'redux-logger'

const reducer = combineReducers({
  [goalsStateKey]: goalsReducer,
  [accomplishmentsStateKey]: accomplishmentsReducer
})

const initialState = {}

const middleware = [logger]

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
)
