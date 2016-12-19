import React from "react";
import {render} from "react-dom";
import {Button, FABButton, Textfield, IconButton} from "react-mdl";
import './css/main.css'
import "whatwg-fetch";

import Sidebar from './sidebar.jsx'
import Navbar from './navbar.jsx'
import SendMessage from './sendMessage.jsx'

import {store, removeFavorite} from './shared-state.js'

export default class extends React.Component {
	constructor(props) {
		console.log(store.getState())
		super(props);
		this.state = {
			currentUser: null,
			sentMessages: store.getState().sentMessages
			// currentUser: {
			// 	photoURL: 'http://localhost:3000/src/pic.jpeg',
			// 	displayName: 'Ena',
			// 	email: 'em42@uw.edu'
				
			// }
		}
		this.firebase = this.props.route.firebase;
	}

	//online
	componentDidMount() {	
		var self = this;
		this.firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.setState({currentUser: user});
				self.unsub = store.subscribe(() => self.setState(store.getState()));
			} else {
				window.location = "/?#/signin";
			}
		});			
	}

	componentWillUnmount() {
        this.unsub();
    }

	render() {
		var sendMessage, navbar, sentMessages;
		if (this.state.currentUser) {
			navbar = <Navbar currentUser={this.state.currentUser} />			
		}
		if (this.state.sentMessages) {
			console.log(this.state)
			sentMessages = this.state.sentMessages.map(message => (
				<div>
					<p>to: {message.to}</p>
					<p>url: {message.url}</p>
					<p>description: {message.description}</p>
				</div>
			))
		}
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
			    <Sidebar />
			    <main className="mdl-layout__content">
				    <div className="page-content">
				    	{navbar}
				    	<SendMessage />			
				    </div>
				    {sentMessages}
			    </main>
			</div>
		);	
	}
}
