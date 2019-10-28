import React from 'react'
import RecipeNavbar from '../components/RecipeNavbar'
import { Container, Row, Col, Button, Modal, Form, Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import Parse from 'parse'
import { Recipe } from '../data-model/Recipe';


class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            newRecipeImg: {
                file: null,
                URL: ""
            },
            recipes: []
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.imgChange = this.imgChange.bind(this);


        this.nameInput = React.createRef();
        this.descInput = React.createRef();
        this.imgInput = React.createRef();
    }

    async componentDidMount() {
        // only if there is an active user we will make a call to the server
        if (this.props.activeUser) {

            // getting the active user recipes

            const RecipeTable = Parse.Object.extend('Recipe');
            const query = new Parse.Query(RecipeTable);
            query.equalTo("userId", Parse.User.current());
            const results = await query.find();
            const recipes = results.map(result => new Recipe(result));
            this.setState({recipes});


            // Old code not using async/await
            // query.find().then((results) => {
            //     // You can use the "get" method to get the value of an attribute
            //     // Ex: response.get("<ATTRIBUTE_NAME>")
            //     // if (typeof document !== 'undefined') document.write(`Recipe found: ${JSON.stringify(results)}`);
            //     console.log('Recipe found', results);

            //     const recipes = results.map(result => new Recipe(result));
            //     this.setState({recipes});

            // }, (error) => {
            //     // if (typeof document !== 'undefined') document.write(`Error while fetching Recipe: ${JSON.stringify(error)}`);
            //     console.error('Error while fetching Recipe', error);
            // });

        }
    }

    imgChange(ev) {

        let newRecipeImg = {};
        newRecipeImg.file = ev.target.files[0];
        if (newRecipeImg.file) {
            newRecipeImg.URL = URL.createObjectURL(newRecipeImg.file);
        } else {
            newRecipeImg.URL = "";
        }

        this.setState({ newRecipeImg });
    }


    openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    createRecipe() {

        const {newRecipeImg} = this.state;
        const RecipeRow = Parse.Object.extend('Recipe');
        const newRecipe = new RecipeRow();
        
        newRecipe.set('name', this.nameInput.current.value);
        newRecipe.set('desc', this.descInput.current.value);
        newRecipe.set('image', new Parse.File(newRecipeImg.file.name, newRecipeImg.file));
        newRecipe.set('userId', Parse.User.current());
        
        newRecipe.save().then(result => {
            console.log('Recipe created', result);

            const recipe = new Recipe(result);
            const recipes = this.state.recipes.concat(recipe);
            this.setState({recipes});
          },
          (error) => {
            // if (typeof document !== 'undefined') document.write(`Error while creating Recipe: ${JSON.stringify(error)}`);
            console.error('Error while creating Recipe: ', error);
          }
        );

        this.closeModal();
    }

    render() {
        const { activeUser, handleLogout } = this.props;
        const { showModal, newRecipeImg, recipes } = this.state;
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
                                    Image
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="file" placeholder="Recipe image URL" accept="image/*" onChange={this.imgChange} />
                                </Col>
                                <Col sm={4}>
                                    <Image src={newRecipeImg.URL} fluid />
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