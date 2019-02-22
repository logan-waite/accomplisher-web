import React from 'react'
import { Router } from '@reach/router'
import Accomplishments from './pages/accomplishments'
import Goals from './pages/goals'

export default () => (
  <Router>
    <Accomplishments path='/accomplishments' />
    <Goals path='/' />
  </Router>
)
