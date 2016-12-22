import React from "react";
import {render} from "react-dom";
import {Button, FABButton, Textfield, IconButton} from "react-mdl";
import './css/main.css'
import "whatwg-fetch";

import Sidebar from './sidebar.jsx'
import Navbar from './navbar.jsx'
import SendMessage from './sendMessage.jsx'
import MessageArea from './messageArea.jsx'

import {store, removeFavorite} from './shared-state.js'

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			sentMessages: null,
			receivedMessages: null
		}
		this.firebase = this.props.route.firebase;
	}

	//online
	componentDidMount() {	
		var self = this;
		this.firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.setState({currentUser: user});				
			} else {
				window.location = "/?#/signin";
			}
			return user;
		});	
	}

	render() {
		var sendMessage, navbar, sentMessages, messageArea;
		if (this.state.currentUser) {
			navbar = <Navbar firebase={this.firebase} currentUser={this.state.currentUser} />			
		}
		if (this.state.currentUser) {
			messageArea = <MessageArea currentUser={this.state.currentUser} firebase={this.firebase}/>;
		}
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
			    <Sidebar />
			    <main className="mdl-layout__content">
				    <div className="page-content">
				    	{navbar}
				    	<SendMessage />		
						{messageArea}
				    </div>				    				    
			    </main>
			</div>
		);	
	}
}
