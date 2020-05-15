import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider, useSelector } from "react-redux";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import Spinner from "./components/layout/Spinner";
import firebase from "./firebase/fbConfig";

// react-redux-firebase config
const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true,
};

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance, // <- needed if using firestore
};

const AuthIsLoaded = ({ children }) => {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth)) return <Spinner />;
	return children;
};

ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<AuthIsLoaded>
				<App />
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>,
	// </React.StrictMode>,
	document.getElementById("root")
);
