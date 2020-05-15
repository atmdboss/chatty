import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const AllUsers = ({ users, storeAuth }) => {
	return (
		<List>
			<ListSubheader component='h3'>All Users</ListSubheader>
			{users
				?.filter((user) => user.private === false)
				.map((user) => {
					return (
						<ListItem
							button
							component='a'
							href={storeAuth?.uid === user.id ? "/" : `/private/${user.id}`}
							key={user.id}>
							<ListItemText primary={`${user.firstname} ${user.lastname}`} />
						</ListItem>
					);
				})}
		</List>
	);
};

const mapStateToProps = (state) => {
	return {
		users: state.firestore.ordered.users,
		storeAuth: state.firebase.auth,
	};
};

export default compose(
	firestoreConnect([
		{
			collection: "users",
			orderBy: ["firstname", "asc"],
		},
	]),
	connect(mapStateToProps)
)(AllUsers);
