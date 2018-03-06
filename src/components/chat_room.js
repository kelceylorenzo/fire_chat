import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../firebase';
import { getRoomData, getChatLog, sendNewMessage } from '../actions';

class ChatRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
	}
	componentDidMount() {
		const { roomId, logId } = this.props.match.params;

		this.props.getRoomData(roomId);

		db.ref(`/chat-logs/${logId}`).on('value', (snapshot) => {
			this.props.getChatLog(snapshot.val());
		});
	}

	sendMessage(e) {
		e.preventDefault();

		this.props.sendNewMessage(this.props.roomInfo.chatLogId, this.state.message);

		this.setState({
			message: ''
		});
	}

	render() {
		const { name } = this.props.roomInfo;
		const { chatLog } = this.props;

		const message = Object.keys(chatLog)
			.reverse()
			.map((key) => {
				return (
					<li key={key} className="collection-item">
						{chatLog[key]}
					</li>
				);
			});

		return (
			<div>
				<h3>{name ? name : 'Loading ...'}</h3>
				<form onSubmit={this.sendMessage.bind(this)}>
					<label>Enter Message</label>
					<input
						type="text"
						value={this.state.message}
						onChange={(e) => this.setState({ message: e.target.value })}
					/>
					<button className="btn">Send Message</button>
				</form>

				<ul className="collection">{message}</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roomInfo: state.chatReducer.currentRoom,
		chatLog: state.chatReducer.chatLog
	};
}

export default connect(mapStateToProps, { getRoomData, getChatLog, sendNewMessage })(ChatRoom);
