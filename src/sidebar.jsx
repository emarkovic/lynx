import React from "react";
import {render} from "react-dom";
import md5 from 'md5';
import {List, ListItem} from "react-mdl";
import './css/main.css'
import "whatwg-fetch";

import Friend from  './friend.jsx';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: null,
			tags: null
		}		
		this.firebase = this.props.firebase;
	}

	componentDidMount() {
		var email = this.props.currentUser.email.replace('@', 'at').replace('.', 'dot');
		this.friendsRef = this.firebase.database().ref('users/' + email + '/friends');
		this.friendsRef.on('value', snapshot => {
			this.setState({friends: snapshot})
		});
		this.tagsRef = this.firebase.database().ref('messages/' + this.props.currentUser.uid + '/tags');
		this.tagsRef.on('value', snapshot => {
			this.setState({tags: snapshot})
		});
	}

	componentWillUnmount() {
		this.friendsRef.off();
	}

	render() {
		var friends, tags, tags2;
		if (this.state.friends) {
			friends = []
			this.state.friends.forEach(snapshot => {
				var email = snapshot.val();
				friends.push(<Friend key={snapshot.key} email={email} />);
			});
		} else {
			friends = <p>No friends yet, add some!</p>
		}
		
		if (this.state.tags) {
			tags = {};
			tags2 = [];
			this.state.tags.forEach(snapshot => {
				let value = snapshot.val().tags;
				if (value) {
					value.forEach(tag => {
						tags2.push(<p key={Math.random()} onClick={this.props.filterByTag(tag)}>{tag}</p>);
					})
				}
				
			});
			
		}

		return (
		    <div className="mdl-layout__drawer">
				<h1 
					style={{fontWeight: 'lighter'}}
					className="padding-20-left" 					
				>Lynx</h1>					
		    	<h4 
		    		style={{margin: '0'}} 
		    		className="padding-20-left"
		    	>Friends</h4>
			   	<List 			   		
			   		style={{paddingTop: '0', marginTop: '0'}}
			   	> 
					{friends}
			   </List>
			   <h4 
		    		style={{margin: '0'}} 
		    		className="padding-20-left"
		    	>Tags</h4>
		    	<div className="padding-20-left">
		    		{tags2}
		    	</div>
		    </div>			   
		);	
	}
}
/*
 <nav style={{paddingTop: '0'}} className="mdl-navigation">
			        <a className="mdl-navigation__link" href="">Link</a>
			    </nav>
 */