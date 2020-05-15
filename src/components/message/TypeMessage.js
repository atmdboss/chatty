import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";

const TypeMessage = ({ match, sendMessage, profile }) => {
	const [content, setContent] = useState("");
	const firebase = useFirebase();
	const auth = firebase.auth();

	const handleSubmit = (e) => {
		e.preventDefault();

		const msgObj = {
			content,
			from: {
				name: auth.currentUser.displayName,
				initials: profile.initials,
				id: auth.currentUser.uid,
			},
			to: match.params.toId || "everyone",
		};

		sendMessage(msgObj);
		setContent("");
	};
	return (
		<form onSubmit={handleSubmit} noValidate>
			<Grid style={{ justifyContent: "center" }} container spacing={1}>
				<Grid item xs={11}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='message'
						label='Type a message'
						name='message'
						autoFocus
						type='text'
						multiline
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/>
				</Grid>
				<Grid style={{ alignSelf: "center" }} item xs={1}>
					<IconButton type='submit' variant='contained' color='primary'>
						<SendRounded />
					</IconButton>
				</Grid>
			</Grid>
		</form>
	);
};

const mapStateToProps = (state) => {
	return { profile: state.firebase.profile };
};

export default compose(withRouter, connect(mapStateToProps))(TypeMessage);
