import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import TodoV1 from './v1'

const BasicExample = () => (
  <Router>
    <div>
      <Link to="/">回首页</Link>

      <Route exact path="/" component={Home}/>
      <Route path="/v1" component={TodoV1}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <ul>
      <Link to="/v1">第一个版本</Link>
    </ul>
  </div>
)
export default BasicExample
