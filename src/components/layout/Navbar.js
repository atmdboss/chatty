import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Box,
	Link,
	Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { connect } from "react-redux";
import { signOutUser } from "../../app/actions/users";
import { useFirebase } from "react-redux-firebase";
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";

const NavBar = ({
	signOutUser,
	handleOpen,
	menuShow,
	appBar,
	storeAuth,
	firebaseStore,
}) => {
	const firebase = useFirebase();
	const fireAuth = firebase.auth();
	const functions = firebase.functions();
	const removeOnline = functions.httpsCallable("removeOnline");

	const handleLogout = () => {
		removeOnline().then(() => signOutUser(fireAuth));
	};
	return (
		<nav>
			<AppBar position='fixed' className={appBar}>
				<Toolbar>
					{!storeAuth.isEmpty && (
						<IconButton
							className={menuShow}
							onClick={handleOpen}
							edge='start'
							color='inherit'
							aria-label='menu'>
							<Menu />
						</IconButton>
					)}

					<Box mr={"auto"} component='span'>
						<Link variant='inherit' color='inherit' underline='hover' href='/'>
							<Typography variant='h4' component='h1' color='inherit'>
								Chatty
							</Typography>
						</Link>
					</Box>

					{/* Buttons showing when logged in */}
					{!storeAuth.isEmpty && (
						<SignedInLinks
							handleLogout={handleLogout}
							firebaseStore={firebaseStore}
						/>
					)}

					{/* Buttons showing when logged out */}
					{storeAuth.isEmpty && <SignedOutLinks />}
				</Toolbar>
			</AppBar>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return { storeAuth: state.firebase.auth, firebaseStore: state.firebase };
};

export default connect(mapStateToProps, { signOutUser })(NavBar);
