import "whatwg-fetch";
import React from "react";
import {render} from "react-dom";

import md5 from 'md5';
import './css/main.css'

export default class extends React.Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		var photoUrl = 'https://www.gravatar.com/avatar/' + md5(this.props.message.person);
		var tags; 
		if (this.props.message.tags) {
			tags = <p>Tags: {this.props.message.tags.join(' ')}</p>
		}
		return (
			<div style={{display: 'flex', borderBottom: '1px solid #e0e0e0'}}>
				<div style={{width: '20%', marginBottom: '15px'}}>
					<div 
						style={{
							backgroundImage: 'url(' + photoUrl + ')', 
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							width: '80px', 
							height: '80px', 
							borderRadius: '100%', 
							margin: 'auto', 
							marginTop: '40px'
						}}
					></div>
					<p className="center-text">
						{this.props.sentTab ? 'To:' : 'From:'} 
						<br/> 
						{this.props.message.person}
					</p>
				</div>	
				<div style={{marginTop: '20px'}}>
					<h5><a href={this.props.message.url}>{this.props.message.url}</a></h5>
					<p>{this.props.message.description}</p>
					{tags}
				</div>													
			</div>
		);		
	}
}