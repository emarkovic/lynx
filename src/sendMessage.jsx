import React from "react";
import {render} from "react-dom";
import {Button, FABButton, Textfield, IconButton} from "react-mdl";
import './css/main.css'
import "whatwg-fetch";

import {store, sendMessage} from './shared-state.js';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expandSendMessage: true,
		
			to: '',
			url: '',
			description: ''				
		}		
	}
	
	toggleSendMessage() {
		this.setState({expandSendMessage: !this.state.expandSendMessage})
	}

	handleCancel() {
		this.setState({to: '', url: '', description: ''});
	}

	handleChange(event, type) {
		this.setState({			
			[type] : event.target.value			
		});
	}

	handleSubmit() {
		store.dispatch(sendMessage({to: this.state.to, url: this.state.url, description: this.state.description}));
		this.handleCancel();

	}

	render() {
		var sendMessage, button, 
			sendStyle = {
				clear: 'both', 
				paddingLeft: '60px', 
				paddingRight: '60px', 
				backgroundColor: '#fafafa', 
				overflow: 'hidden',
				paddingTop: '24px',
				paddingBottom: this.state.expandSendMessage ? '24px' : '0'
			};
		if (this.state.expandSendMessage) {			
			button = (
				<IconButton 
					style={{float: 'right', marginTop: '10px'}} 
					name="remove" 
					colored 
					onClick={() => this.toggleSendMessage()}
				/>
			);
			sendMessage = (									
					<form style={{clear: 'both'}}>
						<Textfield
						    onChange={(event) => this.handleChange(event, 'to')}
						    label="To..."								  
						    type="email"
						    style={{width: '100%'}}
						    value={this.state.to}
						/>
						<Textfield
						    onChange={(event) => this.handleChange(event, 'url')}
						    label="URL..."								  
						    type="text"
						    style={{width: '100%'}}
						    value={this.state.url}
						/>
						<Textfield
						    onChange={(event) => this.handleChange(event, 'description')}
						    label="Description (optional)..."								  
						    rows={3}
						    style={{width: '100%'}}
						    value={this.state.description}
						/>
						<Button 
							style={{float: 'left', width: '100px'}} 
							raised 
							colored
							onClick={() => this.handleCancel()}
						>Cancel</Button>
						<Button 
							type="submit"
							style={{float: 'right', width: '100px'}} 
							raised 
							accent
							onClick={() => this.handleSubmit()}
						>Send</Button>
					</form>			
			);			
		} else {
			button = (
				<IconButton 
					style={{float: 'right', marginTop: '10px'}} 
					name="add" 
					colored 
					onClick={() => this.toggleSendMessage()}
				/>
			);
		}
		

		return (
			<div style={sendStyle} >
				<h3 style={{marginTop: '0', float: 'left'}}>Send a message</h3>
				{button}
				{sendMessage}
	    	</div>
		);	
	}
}
