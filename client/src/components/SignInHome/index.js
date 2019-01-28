import React from "react";
//import { Link } from "react-router-dom";
import SignInModal from "../Modal/signInModal.js";
import LogInModal from "../Modal/logInModal.js";
import "./signInHome.css";


function signInHome(props) {


    return (
        <div className="signInHome">
            <h3 className="newTitle">Are you new here?</h3>
            <br />
            <button className="btn announceBtn1" onClick={props.showSignInModal}><h4>Create a new user account!</h4></button>
            <br />
            <br />
            <br />
            <h3 className="alreadyTitle">Already a member?</h3>
            <br />
            <button className="btn announceBtn2" onClick={props.showLogInModal}><h4>Sign in here!</h4></button>
            <br />
            <br />
            <SignInModal show={props.signInModal} closeModal={props.closeModal} />
            <LogInModal show={props.logInModal} closeModal={props.closeModal} />
        </div>
    );
}

export default signInHome;