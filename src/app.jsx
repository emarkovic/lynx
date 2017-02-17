import React from "react";
import {render} from "react-dom";
import {Button, FABButton, Textfield, IconButton} from "react-mdl";
import './css/main.css'
import "whatwg-fetch";

import Sidebar from './sidebar.jsx'
import Navbar from './navbar.jsx'
import SendMessage from './sendMessage.jsx'
import MessageArea from './messageArea.jsx'

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			sentMessages: null,
			receivedMessages: null,
			tag: null
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
				window.location.replace("/signin");
			}
			return user;
		});	
	}

	filterByTag(tag) {
		// this.setState({tag: tag});
	}  

	render() {
		var sidebar, navbar, sendMessage, messageArea;
		if (this.state.currentUser) {
			sidebar 	= <Sidebar 		currentUser={this.state.currentUser} firebase={this.firebase} filterByTag={this.filterByTag}/>
			navbar 		= <Navbar 		currentUser={this.state.currentUser} firebase={this.firebase} />	
			messageArea = <MessageArea 	currentUser={this.state.currentUser} firebase={this.firebase} tag={this.state.tag}/>;
			sendMessage = <SendMessage 	currentUser={this.state.currentUser} firebase={this.firebase} />;		
		}
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
			    {sidebar}
			    <main className="mdl-layout__content">
				    <div className="page-content">
				    	{navbar}
				    	{sendMessage}
						{messageArea}
				    </div>				    				    
			    </main>
			</div>
		);	
	}
}
