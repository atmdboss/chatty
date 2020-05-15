import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const OnlineUsers = ({ users, storeAuth }) => {
	return (
		<List>
			<ListSubheader component='h3'>Online</ListSubheader>
			{users?.map((user) => {
				return (
					<ListItem
						button
						component='a'
						href={storeAuth?.uid === user.id ? "/" : `/private/${user.id}`}
						key={user.id}>
						<ListItemIcon style={{ minWidth: "30px" }}>
							<FiberManualRecordIcon color='primary' />
						</ListItemIcon>
						<ListItemText primary={`${user.firstname} ${user.lastname}`} />
					</ListItem>
				);
			})}
		</List>
	);
};

const mapStateToProps = (state) => {
	return {
		users: state.firestore.ordered.online,
		storeAuth: state.firebase.auth,
	};
};

export default compose(
	firestoreConnect([
		{
			collection: "online",
			where: ["private", "==", false],
		},
	]),
	connect(mapStateToProps)
)(OnlineUsers);
