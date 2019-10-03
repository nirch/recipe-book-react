import React from 'react'
import RecipeNavbar from '../components/RecipeNavbar'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
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
        this.createRecipe = this.createRecipe.bind(this);


        this.nameInput = React.createRef();
        this.descInput = React.createRef();
        this.imgInput = React.createRef();
    }


    openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    createRecipe() {
        const newRecipe = {
            name: this.nameInput.current.value,
            desc: this.descInput.current.value,
            img: this.imgInput.current.value,
        }

        this.props.addRecipe(newRecipe);
        this.closeModal();
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


                <Modal show={showModal} onHide={this.closeModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>New Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.nameInput} type="text" placeholder="Recipe name" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Description
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.descInput} type="text" placeholder="Recipe description" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Image URL
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.imgInput} type="text" placeholder="Recipe image URL" />
                                </Col>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.createRecipe}>
                            Create Recipe
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default RecipesPage;