import React, { Component } from "react";
import API from "../utils/API";

import { Col, Row, Container } from "../components/Grid";
import Header from "../components/Header";
import PostedRecipes from "../components/PostedRecipes";
import SignInHome from "../components/SignInHome";
import "./home.css";

class Home extends Component {
    state = {
        recipes: [],
        signInModal: "none",
        logInModal: "none"
    }

    componentDidMount() {
        API.getRecipes()
            .then(res => {
                console.log(res.data);
                this.setState({ recipes: res.data });

            })
    }

    showSignInModal = () => {
        this.setState({signInModal: "block"});
    }

    showLogInModal = () => {
        this.setState({logInModal: "block"});
    }

    //Handles hiding modal when its X is clicked
    closeModal = () => {
        this.setState({ signInModal: "none" });
        this.setState({ logInModal: "none" });
    }

    render() {
        return (
            <div>
                <Header />
                <br />
                <Container>
                    <Row>
                        <Col size="md-6 sm-12">
                            <SignInHome showSignInModal={this.showSignInModal} showLogInModal={this.showLogInModal} signInModal={this.state.signInModal} logInModal={this.state.logInModal} closeModal={this.closeModal} />
                            <br />

                        </Col>
                        <Col size="md-6 sm-12">
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