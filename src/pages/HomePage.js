import React from 'react'
import {Jumbotron, Button} from 'react-bootstrap'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Recipe Book</h1>
                    <p>Master your recipes</p>
                    <p>
                        <Button variant="primary">Login</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default HomePage;