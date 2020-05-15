import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const customizedMiddleware = getDefaultMiddleware({
	serializableCheck: false,
});
const store = configureStore({
	reducer: {
		firebase: firebaseReducer,
		firestore: firestoreReducer,
	},
	middleware: customizedMiddleware,
});

// store.subscribe(() => {
// 	console.log(store.getState());
// });

export default store;
