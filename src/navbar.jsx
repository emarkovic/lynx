import React from "react";
import {render} from "react-dom";
import {Button, FABButton, Textfield, IconButton} from "react-mdl";
import './css/main.css'
import "whatwg-fetch";

import Sidebar from './sidebar.jsx'

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.firebase = this.props.firebase;
	}

	signOut() {		
		console.log('signed out')
		this.firebase.auth().signOut()
			.then(() => window.location="/?#/signin");
	}

	render() {
		var profPic, name, sendMessage;
		if (this.props.currentUser) {
			name = (
				<h2 
					style={{
						float: 'left', 
						margin: '14px 0', 
						fontWeight: 'lighter'
					}} 
					className="padding-20-left"
				>
					Hello, {this.props.currentUser.displayName}
				</h2>
			);
			profPic = (
				<img 
					style={{
						width: '75.5px', 
						height: '75.5px', 
						borderRadius: '50%', 
						margin: '0 auto',
						float: 'left'

					}}
					src={this.props.currentUser.photoURL} 
					alt={this.props.currentUser.displayName + ' profile picture'}
				/>
			);
		}
		var navStyle = {
			height: '75.5px', 
    		width: 'calc(100%-240px)', 
    		paddingTop: '24px', 
    		paddingBottom: '24px',	
    		position: 'relative',
    		paddingLeft: '60px',
    		paddingRight: '60px'
		}		
		return (			
	    	<div style={navStyle}>					
				{profPic}
				{name}
				<FABButton 
					colored 
					ripple 
					className="signOut"
					onClick={() => this.signOut()}
				>
				    Sign out
				</FABButton>
	    	</div>				    	
				    	
		);	
	}
}


