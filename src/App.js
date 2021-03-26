import React from 'react';
import isLogged from './utils/isLogged'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Main from './components/Main.js'
import Home from './components/Home'
import NewTaks from './components/NewTaks'
import SearchTask from './components/SearchTask'

import { isAuthenticate } from './utils/isAuthenticate'


function PrivateRoute(props) {
  return (isAuthenticate() ?
    <Route {...props} /> :
    <Redirect to='/' />)


}


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/nova-tarefa">
          <NewTaks />
        </PrivateRoute>
        <PrivateRoute exact path="/pesquisar-tarefas">
          <SearchTask />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;