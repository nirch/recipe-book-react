import React from 'react'
import RecipeNavbar from '../components/RecipeNavbar'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'


class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal() {
        this.setState({showModal: true})
    }

    closeModal() {
        this.setState({showModal: false})
    }

    render() {
        const { activeUser, handleLogout, recipes } = this.props;
        const { showModal } = this.state;
        //const showModal = this.state.showModal;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        const recipesCards = recipes.map(recipe => <Col key={recipe.id} lg="3" md="6"><RecipeCard recipe={recipe} /></Col>)

        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />
                <Container>
                    <div className="recipes-header">
                        <h1>{activeUser.fname}'s Recipes</h1>
                        <Button variant="primary" onClick={this.openModal}>New Recipe</Button>
                    </div>
                    <Row>
                        {recipesCards}
                    </Row>
                </Container>


                <Modal show={showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default RecipesPage;