import React, { useEffect, useRef } from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WithAvatar from "./format/WithAvatar";
import WithoutAvatar from "./format/WithoutAvatar";

const useStyles = makeStyles(() => ({
	root: {
		height: "85vh",
		overflow: "auto",
		display: "flex",
		flexDirection: "column",
	},
}));

const MessageDisplay = ({ storeAuth, generalMessages, privateMessages }) => {
	//scrolling messages to bottom
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [generalMessages, privateMessages]);

	//General messages format
	const showgeneralMessages = (messages) => {
		return messages?.map((message) => {
			if (message) {
				return message.from.id === storeAuth.uid ? (
					<WithoutAvatar key={message.id} isMine={true} message={message} />
				) : (
					<WithAvatar key={message.id} message={message} />
				);
			} else {
				return null;
			}
		});
	};

	//Private messages format
	const showPrivateMessages = (messages) => {
		return messages?.map((message) => {
			if (message) {
				return message.from.id === storeAuth.uid ? (
					<WithoutAvatar key={message.id} isMine={true} message={message} />
				) : (
					<WithoutAvatar key={message.id} message={message} />
				);
			} else {
				return null;
			}
		});
	};

	const classes = useStyles();

	return (
		<Paper className={classes.root} variant='outlined'>
			<CssBaseline />
			{generalMessages && showgeneralMessages(generalMessages)}
			{privateMessages && showPrivateMessages(privateMessages)}
			<div ref={messagesEndRef} />
		</Paper>
	);
};

export default MessageDisplay;
