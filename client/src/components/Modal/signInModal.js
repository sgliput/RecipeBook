import React, { Component } from "react";
import API from "../../utils/API";
import "./modal.css";


class SignInModal extends Component {
    state = {
        newUserName: "",
        newUserPassword: "",
        newUserState: "VA",
        newUserEmail: "",
        notRegistered: true,
        tooLong: false
    }

    //Handles typing in the name field
    nameChange = event => {
        const newUserName = event.target.value;
        //It will not allow the user's name to exceed 10 letters in length
        if(newUserName.length < 11){
        this.setState({ newUserName, tooLong: false });
        } else{
            this.setState({tooLong: true});
        }
        console.log(this.state);
    }

    //Handles changing the home state field
    stateChange = event => {
        const newUserState = event.target.value;
        this.setState({ newUserState });
        console.log(this.state);
    }

    //Handles changing the email field
    emailChange = event => {
        const newUserEmail = event.target.value;
        this.setState({ newUserEmail });
        console.log(this.state);
    }

    //Handles changing the password field
    passwordChange = event => {
        const newUserPassword = event.target.value;
        this.setState({ newUserPassword });
        console.log(this.state);
    }

    //Handles when a new user hits the Enter button in the SignIn Modal
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
        //Sends the new user's information to the database
        API.saveUser(newUser)
            .then(res => {
                console.log(res);
                this.setState({ 
                    notRegistered: false,
                 });
                // Save user's name and ID to sessionStorage
                sessionStorage.setItem('userID', res.data._id);
                sessionStorage.setItem('userName', res.data.name);
                //SignIn Modal closes after 3 seconds automatically
                setTimeout(() => {
                    this.closeModal2();
                    }, 3000);
            })
            .catch(err => {
                console.log(err);
                //If the user's name and password have already been used by someone else, the modal prompts them to change one
                this.setState({
                    newUserName: "Choose a different name or password",
                    newUserPassword: "Choose a different name or password"
                })
            });
    }

    //Closes modal with submission, resetting the fields
    closeModal = event => {
        this.setState({
            newUserName: "",
        newUserPassword: "",
        newUserState: "VA",
        newUserEmail: ""
        });
        this.props.closeModal();
    }

    //Closes modal after submission, resetting the fields
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
                {/* Before the user has registered, this form appears */}
                {this.state.notRegistered ? (
                    <div className="modal-content">
                    <div className="md-content">
                        <div className="modal-header">
                            <h4>To get started with RecipeBook, fill out the form below!</h4>
                            <span className="close" onClick={this.closeModal}>&times;</span>
                        </div>
                        <br />
                        <div className="modal-body">
                            {/* If the userName is more than ten characters, a message appears by the label */}
                            <label>Name: {this.state.tooLong ? "Must be 10 characters or less" : ""}</label>
                            <input className="form-control newUserField newUserName" value={this.state.newUserName} onChange={this.nameChange} />
                            <label>Password:</label>
                            <input className="form-control newUserField newUserPassword" type="password" value={this.state.newUserPassword} onChange={this.passwordChange} />
                            <label>State:</label>
                            <select className="form-control newUserField newUserState" size="1" onChange={this.stateChange}>
                                <option value="AK">AK</option>
                                <option value="AL">AL</option>
                                <option value="AR">AR</option>
                                <option value="AZ">AZ</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DE">DE</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="IA">IA</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="MA">MA</option>
                                <option value="MD">MD</option>
                                <option value="ME">ME</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MO">MO</option>
                                <option value="MS">MS</option>
                                <option value="MT">MT</option>
                                <option value="NC">NC</option>
                                <option value="ND">ND</option>
                                <option value="NE">NE</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NV">NV</option>
                                <option value="NY">NY</option>
                                <option value="OH">OH</option>
                                <option value="OK">OK</option>
                                <option value="OR">OR</option>
                                <option value="PA">PA</option>
                                <option value="RI">RI</option>
                                <option value="SC">SC</option>
                                <option value="SD">SD</option>
                                <option value="TN">TN</option>
                                <option value="TX">TX</option>
                                <option value="UT">UT</option>
                                <option defaultValue="VA">VA</option>
                                <option value="VT">VT</option>
                                <option value="WA">WA</option>
                                <option value="WI">WI</option>
                                <option value="WV">WV</option>
                                <option value="WY">WY</option>
                                <option value="Outside US">Outside US</option>
                            </select>
                            <label>Email:</label>
                            <input className="form-control newUserField newUserEmail" value={this.state.newUserEmail} onChange={this.emailChange} />
                            <br />
                            <button className="btn newUserSubmit" disabled={!this.state.newUserName || !this.state.newUserPassword || !this.state.newUserEmail} onClick={this.handleSubmit}>Submit</button>
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