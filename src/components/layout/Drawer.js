import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import AllUsers from "../users/AllUsers";
import OnlineUsers from "../users/OnlineUsers";
import { connect } from "react-redux";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(1),
	},
}));

const ResponsiveDrawer = (props) => {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Hidden smDown>
				<div className={classes.toolbar} />
			</Hidden>

			<Divider />
			<AllUsers />
			<Divider />
			<OnlineUsers />
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Navbar
				appBar={classes.appBar}
				menuShow={classes.menuButton}
				handleOpen={handleDrawerToggle}
			/>

			{!props.auth.isEmpty && (
				<div className={classes.drawer} aria-label='users list'>
					<Hidden smUp implementation='css'>
						<Drawer
							variant='temporary'
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant='permanent'
							open>
							{drawer}
						</Drawer>
					</Hidden>
				</div>
			)}

			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</main>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(ResponsiveDrawer);
