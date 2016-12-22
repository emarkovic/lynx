import React from "react";
import {render} from "react-dom";
import md5 from 'md5';
import {ListItem} from "react-mdl";
import './css/main.css'
import "whatwg-fetch";

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: null
		}		
		this.firebase = this.props.firebase;
	}

	render() {
		var photoUrl = 'https://www.gravatar.com/avatar/' + md5(this.props.email);
		return (
			<ListItem 
				style={{display: 'flex', fontSize: '11px'}}
				className="padding-20-left"				
			>						
					<div
						style={{
							backgroundImage: 'url(' + photoUrl + ')',
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							width: '40px',
							height: '40px',
							borderRadius: '100%',
							marginRight: '5px'
						}}
					></div>						
					{this.props.email}						
			</ListItem>
		);
	}
}