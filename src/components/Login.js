import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";

import { auth } from "../firebase";
import firebase from "firebase/app";
import 'firebase/compat/auth';


const Login = () => {
    return(
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to SoftuniChat!</h2>

                <div
                    className="login-button google"
                    onClick={async () => await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Sign In with Google
                </div>

                <br /> <br />

                <div
                    className="login-button facebook"
                    onClick={async () =>  await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Sign In with Facebook
                </div>

                <br /> <br />
                <div>     
            </div>
         </div>
                
            </div>
    );
}

export default Login;