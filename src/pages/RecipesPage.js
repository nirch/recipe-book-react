import React from 'react'
import RecipeNavbar from '../components/RecipeNavbar';


class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const { activeUser, handleLogout } = this.props;
        
        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <h1>Recipes</h1>
            </div>  
        );
    }
}
 
export default RecipesPage;