import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import SearchField from "../SearchField";
import "./navbar.css";

class NavBar extends Component {
    state = {
        userID: ""
    }

    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        this.setState({ userID });
    }

    render() {
        return (
            <div className="navbar">
                <Container className="navContainer">
                    <Row>
                        {this.props.home ? (
                            <Col size="md-5 sm-3">
                                <h2 className="welcome">Welcome!</h2>
                            </Col>) : (
                                <Col size="md-5 sm-3" id="homeBtnCol">
                                    <Link to={"/"}>
                                        <button className="btn btn-info toHome">Home Page</button>
                                    </Link>
                                </Col>
                            )}

                        <Col size="md-5 sm-6" id="searchCol">
                            {this.props.home ? (
                                <SearchField handleSearchChange={this.props.handleSearchChange} searchTerms={this.props.searchTerms} onSearch={this.props.onSearch} getAllRecipes={this.props.getAllRecipes} searched={this.props.searched} />
                            ) : this.props.private ? (
                                <SearchField handlePrivateSearchChange={this.props.handlePrivateSearchChange} privateSearchTerms={this.props.privateSearchTerms} onPrivateSearch={this.props.onPrivateSearch} getAllRecipes={this.props.getAllRecipes} private="private" searched={this.props.searched} />
                            ) : ""}
                        </Col>
                        <Col size="md-2 sm-3" id="toPrivateCol">
                            {this.props.userID ? (

                                <button className="btn btn-success toPrivate">
                                    <Link to={"/userRecipes/" + this.props.userID} className="toPrivateLink">
                                        Your RecipeBook
                        </Link>
                                </button>

                            ) : ""}
                        </Col>
                    </Row>

                </Container>
            </div>

        )
    }
}

export default NavBar;