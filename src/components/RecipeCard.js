import React from 'react'


class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {recipe} = this.props;
        return (
            <p>{recipe.name}</p>
        );
    }
}




export default RecipeCard;