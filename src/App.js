import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <Link to="/">回首页</Link>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <ul>
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

export default BasicExample
