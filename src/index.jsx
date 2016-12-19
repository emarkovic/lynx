import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './app.jsx'
//online dev

import * as firebase from 'firebase';
import Signin from './signin.jsx';
import Signup from './signup.jsx';
var config = {
    apiKey: "AIzaSyD_4IZL4J1uLxOwz0Pe2a3yXrCj4wtUc0Q",
    authDomain: "lynx-70843.firebaseapp.com",
    databaseURL: "https://lynx-70843.firebaseio.com",
    storageBucket: "lynx-70843.appspot.com",
    messagingSenderId: "326373486380"
};
firebase.initializeApp(config);
var router = (
	<Router history={hashHistory}>
		<Route path="/" firebase={firebase} component={App}></Route>
		<Route path="/signin" firebase={firebase} component={Signin}></Route>
		<Route path="/signup" firebase={firebase} component={Signup}></Route>
	</Router>
);


//offline dev
// var firebase = true;

// var router = (
// 	<Router history={hashHistory}>
// 		<Route path="/" firebase={firebase} component={App}></Route>
// 	</Router>
// );

render(router, document.getElementById("app"));