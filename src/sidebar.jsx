import React from "react";
import {render} from "react-dom";
import './css/main.css'
import "whatwg-fetch";

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}		
	}

	render() {
		return (
		    <div className="mdl-layout__drawer">
				<h1 className="padding20Left" style={{fontWeight: 'lighter'}}>Lynx</h1>					
		    	<span className="padding20Left">Friends</span>
			    <nav style={{paddingTop: '0'}} className="mdl-navigation">
			        <a className="mdl-navigation__link" href="">Link</a>
			        <a className="mdl-navigation__link" href="">Link</a>
			        <a className="mdl-navigation__link" href="">Link</a>
			        <a className="mdl-navigation__link" href="">Link</a>
			    </nav>
		    </div>			   
		);	
	}
}
