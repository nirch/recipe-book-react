import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';


class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/recipes">
          <RecipesPage/>
        </Route>
      </Switch>
    );
  }
}

export default App;
