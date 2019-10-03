import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import jsonUsers from './data/users'
import jsonRecipes from './data/recipes'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      allUsers: jsonUsers,
      allRecipes: jsonRecipes,
      activeUserRecipes: []
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    console.log(this.state.allRecipes);
  }

  handleLogout() {
    this.setState({activeUser: null});
  }

  handleLogin(activeUser) {

    const activeUserRecipes = this.state.allRecipes.filter(recipe => recipe.userId === activeUser.id)

    this.setState({activeUser, activeUserRecipes});
  }

  render() {

    const { activeUser, allUsers, activeUserRecipes } = this.state;
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
          <RecipesPage recipes={activeUserRecipes} activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>
      </Switch>
    );
  }
}

export default App;
