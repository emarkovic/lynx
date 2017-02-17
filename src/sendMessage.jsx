import React from "react";
import {render} from "react-dom";
import {Button, FABButton, Textfield, IconButton, Spinner} from "react-mdl";
import './css/main.css'
import "whatwg-fetch";

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expandSendMessage: true,		
			to: '',
			url: '',
			description: '',
			tags: [],
			error: null,
			status: null			
		}		
		this.firebase = this.props.firebase;
	}
	
	toggleSendMessage() {
		this.setState({expandSendMessage: !this.state.expandSendMessage})
	}

	handleCancel() {
		this.setState({to: '', url: '', description: '', tags: []});
	}

	handleChange(event, type) {
		let value;
		if (type === 'tags') {
			value = event.target.value.split(' ');
		} else {
			value = event.target.value;
		}
		this.setState({[type] : value, error: null, status: null});
	}

	handleSend() {
		//push to firebase ... add friend validation later
		
		var senderEmail = this.props.currentUser.email.replace('@', 'at').replace('.', 'dot');
		//put in the proper person's firebase -> must get their uid first
		var recipientEmail = this.state.to.replace('@', 'at').replace('.', 'dot');
		var self = this;
		this.firebase.database().ref('users/' + recipientEmail).once('value')
			.then(snapshot => {
				var user = snapshot.val();
				if (!user) {
					self.setState({error: 'User does not exist.'});
					return null;
				}	
				if (!user.friends[senderEmail] && senderEmail !== recipientEmail) {
					self.setState({error: 'Cannot send message to user who is not a friend.'});
					return null;
				}
				self.setState({status: 'sending'});
				return user;			
			})
			.then(user => {
				if (user) {
					//recipient
					var self2 = self;
					self.firebase.database().ref('messages/' + user.uid + '/received').push({
						description: self.state.description,
						person: self.props.currentUser.email,
						read: false,
						url: self.state.url
					});
					//add to send
					self.firebase.database().ref('messages/' + self.props.currentUser.uid + '/sent').push({
						description: self.state.description,
						person: self.state.to,
						read: false,
						url: self.state.url,
						tags: self.state.tags
					});
					//add to tags
					self.firebase.database().ref('messages/' + self.props.currentUser.uid + '/tags').push({						
						tags: self.state.tags
					});
				}
			})
			.then(() => {				
				self.setState({status: 'sent'});
				self.handleCancel();
			})
			.catch(error => {
				console.error(error)
				self.setState({error: 'A problem occurred sending the message. Please try again.', status: null});
			})
		//add to sent when everything is good
		

	}

	render() {
		var sendMessage, button, error, status, 
			sendStyle = {
				clear: 'both', 
				paddingLeft: '60px', 
				paddingRight: '60px', 
				backgroundColor: '#fafafa', 
				overflow: 'hidden',
				paddingTop: '24px',
				paddingBottom: this.state.expandSendMessage ? '24px' : '0'
			};
		if (this.state.error) {
			error = <p style={{textAlign: 'center', color: 'red'}}>{this.state.error}</p>;
		}
		if (this.state.status) {
			if (this.state.status === 'sending') {
				status = <Spinner />;
			} else {
				status = <p style={{textAlign: 'center', color: 'rgb(105,240,174)'}}>Message sent!</p>
			}
		}
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
						<Textfield
						    onChange={(event) => this.handleChange(event, 'tags')}
						    label="Tags..."								  
						    type="text"
						    style={{width: '100%'}}
						    value={this.state.tags.join(' ')}
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
							onClick={() => this.handleSend()}
						>Send</Button>
						{status}
						{error}
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
