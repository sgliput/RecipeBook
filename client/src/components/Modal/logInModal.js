import React, { Component } from "react";
import API from "../../utils/API";
import "./modal.css";


class LogInModal extends Component {
    state = {
        userName: "",
        userPassword: "",
        notSignedIn: true,
        validPassword: true
    }

    //Handles typing in the name field
    nameChange = event => {
        const userName = event.target.value;
        this.setState({ userName });
        console.log(this.state);
    }

    //Handles typing in the password field
    passwordChange = event => {
        const userPassword = event.target.value;
        this.setState({ userPassword });
        console.log(this.state);
    }

    //When a returning user hits the Enter button in the Login Modal
    handleLogin = event => {
        event.preventDefault();
        const userName = this.state.userName;
        const userPassword = this.state.userPassword;
        console.log("User: " + userName);
        //The API retrieves that specific user, based on their name and password
        API.getUser(userName, userPassword)
            .then(res => {
                console.log(res);
                //If a result is returned, the current user is stored in sessionStorage
                if (res.data !== null) {
                    // Save user to sessionStorage
                    sessionStorage.setItem('userID', res.data._id);
                    sessionStorage.setItem("userName", res.data.name);
                    this.setState({ notSignedIn: false });
                    //After three seconds the Login Modal closes automatically
                    setTimeout(() => {
                        this.closeModal2();
                        }, 3000);
                //If no result returns, an "Oops" message appears
                } else {
                    this.setState({ validPassword: false });
                }
            })
            .catch(err => console.log(err));
    }

    //Closes Login Modal before the enter button is pressed (no actual Login done)
    closeModal = event => {
        this.setState({
            validPassword: true,
            userName: "",
            userPassword: ""
        });
        this.props.closeModal();
    }

    //Closes the Login Modal after the user has logged in, resetting the modal as well
    closeModal2 = event => {
        this.setState({
            notSignedIn: true,
            validPassword: true,
            userName: "",
            userPassword: ""
        });
        console.log(this.state.notSignedIn);
        this.props.closeModal();

    }

    render() {
        return (
            <div id="deleteModal" className="modal" style={{ display: `${this.props.show}` }}>
                {this.state.notSignedIn ? (
                    <div className="modal-content">
                    <div className="md-content">
                        <div className="modal-header">
                            {/* If the user's password or userName are invalid, the title turns into an "Oops" message */}
                            {this.state.validPassword ? <h2>Enter your name and password to sign in.</h2> : <h2 className="oops">Oops, try another user name or password.</h2>}
                            <span className="close" onClick={this.closeModal}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <label>Name:</label>
                            <input className="form-control newUserField newUserName" value={this.state.userName} onChange={this.nameChange} />
                            <label>Password:</label>
                            <input className="form-control newUserField newUserPassword" type="password" value={this.state.userPassword} onChange={this.passwordChange} />
                            <br />
                            <button className="btn userSubmit" disabled={!this.state.userName || !this.state.userPassword} onClick={this.handleLogin}>Submit</button>

                        </div>
                        </div>
                    </div>
                ) : (
                        <div className="modal-content">
                        <div className="md-content">
                            <div className="modal-body">
                                <span className="close" onClick={this.closeModal2}>&times;</span>
                                <h4 className="newWelcome">Welcome back, {this.state.userName}!</h4>
                            </div>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}


export default LogInModal;