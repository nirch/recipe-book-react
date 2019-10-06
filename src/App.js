import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
    //   activeUser:   {
    //     "id": 1,
    //     "fname": "Nir",
    //     "lname": "Channes",
    //     "email": "nir@nir.com",
    //     "pwd": "123"
    // },
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    console.log(this.state.allRecipes);
  }

  handleLogout() {
    this.setState({activeUser: null});
  }

  handleLogin(activeUser) {
    this.setState({activeUser});
  }

  render() {

    const { activeUser } = this.state;
    // const activeUser = this.state.activeUser;

    return (
      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>
        <Route path="/login">
          <LoginPage handleLogin={this.handleLogin}/>
        </Route>
        <Route path="/recipes">
          <RecipesPage activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>
      </Switch>
    );
  }
}

export default App;
