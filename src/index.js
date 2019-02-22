import React from 'react'
import ReactDOM from 'react-dom'
import App from 'src/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faIgloo } from '@fortawesome/pro-regular-svg-icons'

library.add(faIgloo, faChevronDown)

ReactDOM.render(<App />, document.getElementById('root'))
