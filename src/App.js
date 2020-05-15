import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Drawer from "./components/layout/Drawer";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Private from "./components/message/Private";
import General from "./components/message/General";

function App() {
	return (
		<Router>
			<Drawer>
				<Switch>
					<Route exact path='/'>
						<General />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/sign-up'>
						<SignUp />
					</Route>
					<Route path='/private/:toId'>
						<Private />
					</Route>
				</Switch>
			</Drawer>
		</Router>
	);
}

export default App;
