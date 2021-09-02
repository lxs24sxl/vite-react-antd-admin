import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'

import 'normalize.css'
// import 'antd/dist/antd.less'
import '@/assets/stylus/index.styl'

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
)
