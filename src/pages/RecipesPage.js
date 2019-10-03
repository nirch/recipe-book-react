import React from 'react'
import RecipeNavbar from '../components/RecipeNavbar'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'


class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const { activeUser, handleLogout, recipes } = this.props;

        if (!activeUser) {
            return <Redirect to="/"/>
        }
        

        const recipesView = recipes.map(recipe => <p>{recipe.name}</p>)

        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <Container>
                    <h1>{activeUser.fname}'s Recipes</h1>
                    {recipesView}
                </Container>
                
            </div>  
        );
    }
}
 
export default RecipesPage;