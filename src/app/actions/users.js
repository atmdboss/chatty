export const createUser = ({ email, password, firstname, lastname }, auth) => {
	return (dispatch) => {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then(({ user }) => {
				return user
					.updateProfile({
						displayName: `${firstname[0].toUpperCase() + firstname.slice(1)} ${
							lastname[0].toUpperCase() + lastname.slice(1)
						}`,
					})
					.then(() => {
						console.log("created auth profile");
					})
					.catch((e) => {
						console.log(`Error: ${e.message}`);
					});
			});
	};
};

export const signOutUser = (auth) => {
	return (dispatch) => {
		return auth
			.signOut()
			.then(() => {
				console.log("signed out");
			})
			.catch((e) => {
				console.log(e.message);
			});
	};
};

export const loginUser = ({ email, password }, auth) => {
	return (dispatch) => {
		return auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log("signed in");
			})
			.catch((e) => {
				console.log(e.message);
			});
	};
};
