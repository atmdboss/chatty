import React from "react";
import MessageDisplay from "./MessageDisplay";
import TypeMessage from "./TypeMessage";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter, Redirect } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const Private = ({ messages, storeAuth }) => {
	const firebase = useFirebase();

	if (storeAuth.isEmpty) {
		return <Redirect to='/sign-up' />;
	}
	const functions = firebase.functions();
	const sendPrivateMessage = functions.httpsCallable("sendPrivateMessage");
	const receivePrivateMessage = functions.httpsCallable(
		"receivePrivateMessage"
	);

	const sendMessage = async (message) => {
		try {
			await sendPrivateMessage(message);
			await receivePrivateMessage(message);
			console.log("Message sent successfully");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<MessageDisplay storeAuth={storeAuth} privateMessages={messages} />
			<TypeMessage sendMessage={sendMessage} />
		</>
	);
};

const mapStateToProps = (state, ownProps) => {
	const sentMessages = state.firestore.ordered?.sentMessages;
	const receivedMessages = state.firestore.ordered?.receivedMessages?.filter(
		(message) => message.from.id === ownProps.match.params.toId
	);
	const allMessages = sentMessages?.concat(receivedMessages);

	const messages = allMessages?.sort((a, b) => {
		if (a.createdAt < b.createdAt) {
			return -1;
		}
		if (a.createdAt > b.createdAt) {
			return 1;
		}
		return 0;
	});

	return {
		messages,
		storeAuth: state.firebase.auth,
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps),
	firestoreConnect((props) => {
		return props.storeAuth.isEmpty
			? null
			: [
					{
						collection: "privateMessages",
						doc: props.storeAuth.uid,
						subcollections: [
							{
								collection: "from",
								orderBy: ["createdAt", "desc"],
							},
						],
						storeAs: "receivedMessages",
					},
					{
						collection: "privateMessages",
						doc: props.storeAuth.uid,
						subcollections: [
							{
								collection: "to",
								orderBy: ["createdAt", "desc"],
								where: [["to", "==", props.match.params.toId]],
							},
						],
						storeAs: "sentMessages",
					},
			  ];
	})
)(Private);
