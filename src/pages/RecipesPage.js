import React from 'react'
import RecipeNavbar from '../components/RecipeNavbar'
import { Container, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'


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
        

        const recipesCards = recipes.map(recipe => <Col key={recipe.id} lg="3" md="6"><RecipeCard recipe={recipe}/></Col>)

        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <Container>
                    <h1>{activeUser.fname}'s Recipes</h1>
                    <Row>
                        {recipesCards}
                    </Row>
                </Container>
                
            </div>  
        );
    }
}
 
export default RecipesPage;