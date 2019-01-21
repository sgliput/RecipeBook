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

    nameChange = event => {
        const userName = event.target.value;
        this.setState({ userName });
        console.log(this.state);
    }

    passwordChange = event => {
        const userPassword = event.target.value;
        this.setState({ userPassword });
        console.log(this.state);
    }

    handleLogin = event => {
        event.preventDefault();
        const userName = this.state.userName;
        const userPassword = this.state.userPassword;
        console.log("User: " + userName);
        API.getUser(userPassword)
            .then(res => {
                console.log(res);
                if (res.data !== null) {
                    // Save user to sessionStorage
                    sessionStorage.setItem('userID', res.data._id);
                    sessionStorage.setItem("userName", res.data.name);
                    this.setState({ notSignedIn: false });
                } else {
                    this.setState({ validPassword: false });
                }
            })
            .catch(err => console.log(err));
    }

    closeModal = event => {
        this.setState({
            validPassword: true,
            userName: "",
            userPassword: ""
        });
        this.props.closeModal();
    }

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
                            {this.state.validPassword ? <h2>Enter your name and password to sign in.</h2> : <h2>Oops, try another password.</h2>}
                            <span className="close" onClick={this.closeModal}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <label>Name:</label>
                            <input className="form-control newUserField newUserName" value={this.state.userName} onChange={this.nameChange} />
                            <label>Password:</label>
                            <input className="form-control newUserField newUserPassword" value={this.state.userPassword} onChange={this.passwordChange} />
                            <br />
                            <button className="btn btn-success userSubmit" disabled={!this.state.userName || !this.state.userPassword} onClick={this.handleLogin}>Submit</button>

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