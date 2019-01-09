import React, { Component } from "react";
import API from "../utils/API";

import { Col, Row, Container } from "../components/Grid";
import Header from "../components/Header";
import PostedRecipes from "../components/PostedRecipes";
import "./home.css";

class Home extends Component {
    state = {
        recipes: []
    }

    componentDidMount() {
        API.getRecipes()
        .then(res => {
            console.log(res.data);
            this.setState({recipes: res.data});

        })
    }

    render() {
        return (
            <div>
                <Header />
                <br />
                <Container>
                    <Row>
                        <Col size="md-6">
                    <PostedRecipes recipes={this.state.recipes} />
                    </Col>
                
                <br />
                
                </Row>
                </Container>
            </div>
        )

    }


}

export default Home;