import React from "react";
import {render} from "react-dom";
import {Textfield, Button} from "react-mdl";
import {Link} from 'react-router';


import "whatwg-fetch";


export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			error: ''
		}
		this.firebase = this.props.route.firebase;
	}

	handleEmailChange(event) {
		this.setState({email: event.target.value});		
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	validated() {
		if (!this.state.email || !this.state.password) {
			this.setState({error: 'Both fields are required.'});
			return false;
		}
		if (this.state.password < 6) {
			this.setState({error: 'Password must be longer than 6 characters.'});
			return false;
		}
		return true;
	}

	signIn(event) {
		event.preventDefault();
		if (this.validated()) {
			this.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
				.then(() => {
					window.location.replace('#/');
				})
				.catch(console.error);
		}							
		return false;
	}	

	render() {
		var errorText;
		if(this.state.error) {
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
				>Sign in</h1>
				<form 
					onSubmit={event => this.signIn(event)}
				>
					<Textfield
					    onChange={event => this.handleEmailChange(event)}
					    type="text"
					    label="email..."
					    style={{width: '100%'}}
					    value={this.state.email}
					/>
					<Textfield
					    onChange={event => this.handlePasswordChange(event)}
					    type="password"
					    label="password..."
					    style={{width: '100%'}}
					    value={this.state.password}
					/>
					{errorText}
					<Button 
						accent
						style={{
							width: '100%',
							marginTop: '20px'
						}}
						type="submit"
						
					>
						Sign in
					</Button>
				</form>
				<p>No account? <Link style={{textDecoration: 'none', cursor: 'pointer'}} to="/signup">Sign up!</Link></p>
			</div>
		);
	}
}