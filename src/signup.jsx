import React from "react";
import {render} from "react-dom";
import {Textfield, Button} from "react-mdl";
import md5 from 'md5';
import {Link} from 'react-router';


import "whatwg-fetch";


var initialState = {
	name: '',
	email: '',
	password: '',
	confPassword: '',
	error: '',
	currentUser: null
}

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = initialState;
		this.firebase = this.props.route.firebase;
	}

	handleNameChange(event) {
		this.setState({name: event.target.value});
	}
	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}
	handleConfPasswordChange(event) {
		this.setState({confPassword: event.target.value});
	}

	validated() {
		if (!this.state.name ||
			!this.state.email ||
			!this.state.confPassword ||
			!this.state.confPassword) {
			this.setState({error: 'All fields are required.'});
			return false;
		}
		if (this.state.password.length < 6) {
			this.setState({error: 'Password must be longer than 6 characters.'});
			return false;
		}		
		if (this.state.password !== this.state.confPassword) {
			this.setState({error: 'Passwords must be the same.'});
			return false;
		}
		return true;
	}

	signup(event) {		
		event.preventDefault()		
		if (this.validated()) {			
			var self = this;
			var photoUrl = 'https://www.gravatar.com/avatar/' + md5(this.state.email);
			this.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then(user => {
					self.setState({currentUser: user});
					return user.updateProfile({
			    		displayName: self.state.name,
			    		photoURL: photoUrl
			    	});
			    })
			    .catch(err => {
					this.setState({error: 'Error creating new account. Try again.'});
					console.error(err);
				})
			    .then(() => {
			    	var email = self.state.email.replace('@', 'at').replace('.', 'dot');
					var setUser = self.firebase.database().ref('users/' + email).set({
						displayName: self.state.name,
						uid: self.state.currentUser.uid,
						photoURL: photoUrl
					});
					var setMessage = self.firebase.database().ref('messages/' + self.state.currentUser.uid).set('null');
					return Promise.all([setUser, setMessage]);
			    })
			    .catch(err => {
					this.setState({error: 'Error initially saving to db'});
					console.error(err);
				})
				.then(() => {
					window.location.replace('lynx/');
				});

		}
			
		return false;
	}

	render() {
		var errorText;
		if (this.state.error) {
			errorText = <p style={{textAlign: 'center', color: 'red'}}>{this.state.error}</p>;
		}
		return (
			<div 
				style={{
					width: '300px',
					margin: '0 auto',
					textAlign: 'center',
					marginTop: '100px'
				}}
			>		
				<h1 
					style={{
						marginBottom: '20px'
					}}
				>Sign up</h1>
				<form 
					onSubmit={event => this.signup(event)}
				>
					<Textfield
					    onChange={event => this.handleNameChange(event)}
					    label="display name..."
					    style={{width: '100%'}}
					    value={this.state.name}
					/>
					<Textfield
					    onChange={event => this.handleEmailChange(event)}
					    label="email..."
					    style={{width: '100%'}}
					    value={this.state.email}
					/>
					<Textfield
					    onChange={event => this.handlePasswordChange(event)}
					    label="password..."
					    style={{width: '100%'}}
					    value={this.state.password}
					    type="password"
					/>
					<Textfield
					    onChange={event => this.handleConfPasswordChange(event)}
					    label="confirm password..."
					    style={{width: '100%'}}
					    value={this.state.confPassword}
					    type="password"
					/>
					{errorText}
					<Button 
						accent						
						style={{
							width: '100%',
							marginTop: '20px'
						}}
						type="submit"											
					>Sign up</Button>
				</form>
				<p>Already have an account? <Link style={{textDecoration: 'none', cursor: 'pointer'}} to="/signin">Sign in!</Link></p>
			</div>
		);
	}
}