import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
		width: "100vw",
		height: "100vh",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const Spinner = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress color='secondary' />
		</div>
	);
};

export default Spinner;
