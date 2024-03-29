import React from 'react'
import RecipeNavbar from '../components/RecipeNavbar'
import { Container, Row, Col, Button, Modal, Form, Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import emailjs from 'emailjs-com';
import { Pie } from 'react-chartjs-2'


class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            newRecipeImg: {
                file: null,
                URL: ""
            },
            chartData: {
                labels: [
                    'Hard',
                    'Easy'
                ],
                datasets: [{
                    data: this.getChartData(),
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    ]
                }]
            }
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.imgChange = this.imgChange.bind(this);
        this.getChartData = this.getChartData.bind(this);


        this.nameInput = React.createRef();
        this.descInput = React.createRef();
        this.imgInput = React.createRef();
    }


    getChartData() {
        let hard = 0;
        let easy = 0;

        this.props.recipes.forEach(recipe => {
            if (recipe.difficulty === 1) {
                easy++;
            } else if (recipe.difficulty === 2) {
                hard++;
            }
        });

        return [hard, easy];
    }

    componentDidUpdate(prevProps, prevState) {
        // It is important that if you call setStat in componentDidUpdate
        // it must be inside an if statemnet to avoid an infiniate loop
        if (prevProps.recipes != this.props.recipes) {
            // update chart data
            const  chartData = {
                labels: [
                    'Hard',
                    'Easy'
                ],
                datasets: [{
                    data: this.getChartData(),
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    ]
                }]
            };

            this.setState({chartData});
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

        this.setState({newRecipeImg});
    }


    openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    createRecipe() {
        const {activeUser} = this.props;


        const newRecipe = {
            name: this.nameInput.current.value,
            desc: this.descInput.current.value,
            img: this.state.newRecipeImg.URL,
        }

        this.props.addRecipe(newRecipe);

        // send email...
        var template_params = {
            "user_email": activeUser.email,
            "recipe_name": newRecipe.name,
            "user_name": activeUser.fname,
            "recipe_url": "no url for now"
         }
         
         var service_id = "default_service";
         var template_id = "new_recipe";
         emailjs.send(service_id, template_id, template_params).then(() => {
             console.log("email sent");
         });

        this.closeModal();
    }

    render() {
        const { activeUser, handleLogout, recipes } = this.props;
        const { showModal, newRecipeImg, chartData } = this.state;
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
                    <Pie data={chartData} />
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
                                    <Form.Control type="file" placeholder="Recipe image URL" accept="image/*" onChange={this.imgChange}/>
                                </Col>
                                <Col sm={4}>
                                    <Image src={newRecipeImg.URL} fluid/>
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