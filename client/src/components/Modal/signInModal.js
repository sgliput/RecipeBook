import React, { Component } from "react";
import API from "../../utils/API";
import "./modal.css";


class SignInModal extends Component {
    state = {
        newUserName: "",
        newUserPassword: "",
        newUserState: "VA",
        newUserEmail: "",
        notRegistered: true
    }

    nameChange = event => {
        const newUserName = event.target.value;
        this.setState({ newUserName });
        console.log(this.state);
    }

    stateChange = event => {
        const newUserState = event.target.value;
        this.setState({ newUserState });
        console.log(this.state);
    }

    emailChange = event => {
        const newUserEmail = event.target.value;
        this.setState({ newUserEmail });
        console.log(this.state);
    }

    passwordChange = event => {
        const newUserPassword = event.target.value;
        this.setState({ newUserPassword });
        console.log(this.state);
    }

    handleSubmit = event => {
        event.preventDefault();
        const newName = this.state.newUserName;
        const newState = this.state.newUserState;
        const newEmail = this.state.newUserEmail;
        const newPassword = this.state.newUserPassword;
        const newUser = {
            name: newName,
            password: newPassword,
            state: newState,
            email: newEmail
        }
        API.saveUser(newUser)
            .then(res => {
                console.log(res);
                this.setState({ 
                    notRegistered: false,
                 });
                // Save user to sessionStorage
                sessionStorage.setItem('userID', res.data._id);
                sessionStorage.setItem('userName', res.data.name);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    newUserName: "Choose a different name or password",
                    newUserPassword: "Choose a different name or password"
                })
            });
    }

    closeModal = event => {
        this.setState({
            newUserName: "",
        newUserPassword: "",
        newUserState: "VA",
        newUserEmail: ""
        });
        this.props.closeModal();
    }

    closeModal2 = event => {
        this.setState({
           notRegistered: true,
            newUserName: "",
            newUserPassword: "",
            newUserState: "VA",
            newUserEmail: ""
        });
        console.log(this.state.notSignedIn);
        this.props.closeModal();

    }

    render() {
        return (
            <div id="signInModal" className="modal" style={{ display: `${this.props.show}` }}>

                {this.state.notRegistered ? (
                    <div className="modal-content">
                    <div className="md-content">
                        <div className="modal-header">
                            <h4>To get started with RecipeBook, fill out the form below!</h4>
                            <span className="close" onClick={this.closeModal}>&times;</span>
                        </div>
                        <br />
                        <div className="modal-body">
                            <label>Name:</label>
                            <input className="form-control newUserField newUserName" value={this.state.newUserName} onChange={this.nameChange} />
                            <label>Password:</label>
                            <input className="form-control newUserField newUserPassword" value={this.state.newUserPassword} onChange={this.passwordChange} />
                            <label>State:</label>
                            <select className="form-control newUserField newUserState" size="1" onChange={this.stateChange}>
                                <option>AK</option>
                                <option>AL</option>
                                <option>AR</option>
                                <option>AZ</option>
                                <option>CA</option>
                                <option>CO</option>
                                <option>CT</option>
                                <option>DE</option>
                                <option>FL</option>
                                <option>GA</option>
                                <option>HI</option>
                                <option>IA</option>
                                <option>ID</option>
                                <option>IL</option>
                                <option>IN</option>
                                <option>KS</option>
                                <option>KY</option>
                                <option>LA</option>
                                <option>MA</option>
                                <option>MD</option>
                                <option>ME</option>
                                <option>MI</option>
                                <option>MN</option>
                                <option>MO</option>
                                <option>MS</option>
                                <option>MT</option>
                                <option>NC</option>
                                <option>ND</option>
                                <option>NE</option>
                                <option>NH</option>
                                <option>NJ</option>
                                <option>NM</option>
                                <option>NV</option>
                                <option>NY</option>
                                <option>OH</option>
                                <option>OK</option>
                                <option>OR</option>
                                <option>PA</option>
                                <option>RI</option>
                                <option>SC</option>
                                <option>SD</option>
                                <option>TN</option>
                                <option>TX</option>
                                <option>UT</option>
                                <option selected>VA</option>
                                <option>VT</option>
                                <option>WA</option>
                                <option>WI</option>
                                <option>WV</option>
                                <option>WY</option>
                            </select>
                            <label>Email:</label>
                            <input className="form-control newUserField newUserEmail" value={this.state.newUserEmail} onChange={this.emailChange} />
                            <br />
                            <button className="btn btn-success newUserSubmit" disabled={!this.state.newUserName || !this.state.newUserPassword || !this.state.newUserEmail} onClick={this.handleSubmit}>Submit</button>
                            <br />
                        </div>
                        </div>
                    </div>
                ) : (
                        <div className="modal-content">
                        <div className="md-content">
                            <div className="modal-body">
                                <span className="close" onClick={this.closeModal2}>&times;</span>
                                <h4 className="newWelcome">Welcome to Recipe Book, {this.state.newUserName}!</h4>
                            </div>
                            </div>
                        </div>
                    )}

            </div>
        );
    }
};


export default SignInModal;