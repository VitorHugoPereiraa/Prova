import React from 'react';
import isLogged from './utils/isLogged'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Main from './components/Main.js'
import Home from './components/Home'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;