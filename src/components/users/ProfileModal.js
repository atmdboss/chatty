import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
	IconButton,
	Card,
	CardContent,
	Grid,
	Avatar,
	Typography,
	Button,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useFirebase } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		width: "70%",
		height: "50%",
		display: "flex",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const ProfileModal = ({ firebaseStore }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const firebase = useFirebase();

	const functions = firebase.functions();
	const changePrivateStatus = functions.httpsCallable("changePrivateStatus");

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handlePrivacy = () => {
		changePrivateStatus();
	};

	return !firebaseStore.profile.isEmpty ? (
		<div>
			<IconButton
				onClick={handleOpen}
				edge='start'
				color='inherit'
				aria-label='menu'>
				<AccountCircle />
			</IconButton>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<Card style={{ flexGrow: 1 }} elevation={0}>
							<CardContent style={{ height: "100%" }}>
								<Grid
									justify='center'
									direction='column'
									alignItems='center'
									container
									spacing={1}
									style={{ height: "100%" }}>
									<Grid item>
										<Avatar aria-label='profile picture'>
											{firebaseStore.profile.initials}
										</Avatar>
									</Grid>
									<Grid item>
										<Typography paragraph={true} variant='h3' component='p'>
											{firebaseStore.auth.displayName}
										</Typography>
										<Typography
											paragraph={true}
											variant='body2'
											color='textSecondary'
											component='p'>
											Joined{" "}
											{firebaseStore.profile.createdAt
												.toDate()
												.toLocaleDateString([], {
													weekday: "long",
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
										</Typography>
										<Button color='primary' onClick={handlePrivacy}>
											Make profile{" "}
											{firebaseStore.profile.private ? "public" : "private"}
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</div>
				</Fade>
			</Modal>
		</div>
	) : null;
};

export default ProfileModal;
