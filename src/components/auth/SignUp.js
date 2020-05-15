import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createUser } from "../../app/actions/users";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = ({ createUser, storeAuth }) => {
	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});

	const firebase = useFirebase();
	const fireAuth = firebase.auth();
	const functions = firebase.functions();

	const classes = useStyles();
	if (!storeAuth.isEmpty) {
		return <Redirect to='/' />;
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const saveUserInFirestore = functions.httpsCallable(
			"createUserInFirestore"
		);
		const addOnline = functions.httpsCallable("addOnline");

		createUser(user, fireAuth)
			.then(() => {
				saveUserInFirestore(user)
					.then(() => {
						addOnline();
					})
					.catch((e) => {
						console.log("failed in  saveUser.catch");
					});
			})
			.catch((e) => {
				console.log(e.message);
			});
	};

	const handleChange = ({ target }) => {
		setUser({ ...user, [target.name]: target.value });
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form onSubmit={handleSubmit} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstname'
								variant='outlined'
								required
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								onChange={handleChange}
								value={user.firstname}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastname'
								autoComplete='lname'
								onChange={handleChange}
								value={user.lastname}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								onChange={handleChange}
								value={user.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								onChange={handleChange}
								value={user.password}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link href='/login' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Typography variant='body2' color='textSecondary' align='center'>
					{"Copyright © "}
					<Link color='inherit' href='https://material-ui.com/'>
						Chatty
					</Link>{" "}
					{new Date().getFullYear()}
					{"."}
				</Typography>
			</Box>
		</Container>
	);
};

const mapStatetoProps = (state) => {
	return { storeAuth: state.firebase.auth };
};

export default connect(mapStatetoProps, { createUser })(SignUp);
