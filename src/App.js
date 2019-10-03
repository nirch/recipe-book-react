import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import jsonUsers from './data/users'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      allUsers: jsonUsers
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogout() {
    this.setState({activeUser: null});
  }

  handleLogin(activeUser) {
    this.setState({activeUser});
  }

  render() {

    const { activeUser, allUsers } = this.state;
    // const activeUser = this.state.activeUser;

    return (
      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>
        <Route path="/login">
          <LoginPage users={allUsers} handleLogin={this.handleLogin}/>
        </Route>
        <Route path="/recipes">
          <RecipesPage activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>
      </Switch>
    );
  }
}

export default App;
