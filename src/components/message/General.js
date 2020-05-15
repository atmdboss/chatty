import React from "react";
import MessageDisplay from "./MessageDisplay";
import TypeMessage from "./TypeMessage";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const General = ({ messages, storeAuth }) => {
	const firebase = useFirebase();
	if (storeAuth.isEmpty) {
		return <Redirect to='/sign-up' />;
	}
	const functions = firebase.functions();
	const sendGeneralMessage = functions.httpsCallable("sendGeneralMessage");

	const sendMessage = (message) => {
		sendGeneralMessage(message)
			.then(() => {
				console.log("message sent successfully");
			})
			.catch((e) => {
				console.log(`Error:`, e.message);
			});
	};
	return (
		<>
			<MessageDisplay storeAuth={storeAuth} generalMessages={messages} />
			<TypeMessage sendMessage={sendMessage} />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		messages: state.firestore.ordered.generalMessages,
		storeAuth: state.firebase.auth,
	};
};

export default compose(
	firestoreConnect(() => [
		{
			collection: "generalMessages",
			orderBy: ["createdAt", "asc"],
		},
	]),
	connect(mapStateToProps)
)(General);
