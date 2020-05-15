import React from "react";
import ProfileModal from "../users/ProfileModal";
import { Button } from "@material-ui/core";

const SignedInLinks = ({ handleLogout, firebaseStore }) => {
	return (
		<>
			<Button onClick={handleLogout} color='inherit'>
				Logout
			</Button>
			<ProfileModal firebaseStore={firebaseStore} />
		</>
	);
};

export default SignedInLinks;
