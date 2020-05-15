import React from "react";
import { Button } from "@material-ui/core";

const SignedOutLinks = () => {
	return (
		<>
			<Button href='/login' color='inherit'>
				Login
			</Button>
			<Button href='/sign-up' color='inherit'>
				Sign Up
			</Button>
		</>
	);
};

export default SignedOutLinks;
