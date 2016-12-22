import "whatwg-fetch";
import React from "react";
import {render} from "react-dom";
import {Tabs, Tab} from "react-mdl";
import Message from './message.jsx';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
			receivedMessages: null,
			sentMessages: null			
		}
		this.firebase = this.props.firebase;
	}

	componentDidMount() {	
		this.sentMessagesRef = this.firebase.database().ref('messages/' + this.props.currentUser.uid + '/sent');
		this.receivedMessagesRef = this.firebase.database().ref('messages/' + this.props.currentUser.uid + '/received');						
		
		this.receivedMessagesRef.on('value', snapshot => {
			this.setState({receivedMessages: snapshot})
		});		
		this.sentMessagesRef.on('value', snapshot => {
			this.setState({sentMessages: snapshot})
		});		
	}

	compontentWillUnmount() {
		this.receivedMessagesRef.off();
		this.sentMessagesRef.off();
	}

	render() {
		var tabContent, iterator, areaStyle = {padding: '24px 60px'};
		
		if (this.state.activeTab === 0) {
			iterator = this.state.receivedMessages;				
		} else {				
			iterator = this.state.sentMessages;
		}

		if (iterator) {
			tabContent = [];
			iterator.forEach(snapshot => {
				// message contains description, read, person (recipient or sender), url
				var message = snapshot.val();
				tabContent.push(<Message key={snapshot.key} sentTab={this.state.activeTab} message={message}/>);
			});
		}
		return (
			<div style={areaStyle} className="demo-tabs">
				<h3>Your messages</h3>
	            <Tabs 
	            	activeTab={this.state.activeTab} 
	            	onChange={(tabId) => this.setState({activeTab: tabId})} 
	            	ripple
	            >
	                <Tab>Received</Tab>
	                <Tab>Sent</Tab>
	            </Tabs>
	            <section>
	                <div className="content">
	                	{tabContent}
	                </div>
	            </section>
	        </div>
        );
	}
}