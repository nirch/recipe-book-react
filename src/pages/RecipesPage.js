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
        const { activeUser, handleLogout } = this.props;

        if (!activeUser) {
            return <Redirect to="/"/>
        }
        
        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <Container>
                    <h1>{activeUser.fname}'s Recipes</h1>
                </Container>
                
            </div>  
        );
    }
}
 
export default RecipesPage;