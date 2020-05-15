const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendGeneralMessage = functions.https.onCall((message, context) => {
	return admin
		.firestore()
		.collection("generalMessages")
		.add({
			...message,
			createdAt: new Date(),
		})
		.then(() => "Success")
		.catch((e) => {
			console.log(e.message);
		});
});

exports.sendPrivateMessage = functions.https.onCall((message, context) => {
	return admin
		.firestore()
		.collection("privateMessages")
		.doc(context.auth.uid)
		.collection("to")
		.add({
			...message,
			createdAt: new Date(),
		})
		.then(() => "Succesfully sent a message")
		.catch((e) => {
			console.log(`Error: ${e.message}`);
		});
});

exports.receivePrivateMessage = functions.https.onCall((message, context) => {
	return admin
		.firestore()
		.collection("privateMessages")
		.doc(message.to)
		.collection("from")
		.add({
			...message,
			createdAt: new Date(),
		})
		.then(() => "Succesfully received a message")
		.catch((e) => {
			console.log(`Error: ${e.message}`);
		});
});

exports.createUserInFirestore = functions.https.onCall((data, context) => {
	const formatUser = (user) => {
		const email = user.email;
		const firstname = user.firstname[0].toUpperCase() + user.firstname.slice(1);
		const lastname = user.lastname[0].toUpperCase() + user.lastname.slice(1);
		const initials =
			user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase();

		return { email, firstname, lastname, initials };
	};

	const newUser = {
		...formatUser(data),
		private: false,
		createdAt: new Date(),
	};

	return admin
		.firestore()
		.collection("users")
		.doc(context.auth.uid)
		.set(newUser)
		.then(() => "User added to database")
		.catch((e) => {
			console.log(e.message);
		});
});

exports.addOnline = functions.https.onCall(async (data, context) => {
	try {
		const user = await admin
			.firestore()
			.collection("users")
			.doc(context.auth.uid)
			.get();

		await admin
			.firestore()
			.collection("online")
			.doc(context.auth.uid)
			.set(user.data());
	} catch (error) {
		console.log(error.message);
	}
	return Promise.resolve(`User is online`);
});

exports.removeOnline = functions.https.onCall(async (data, context) => {
	try {
		await admin.firestore().collection("online").doc(context.auth.uid).delete();
	} catch (error) {
		console.log(error.message);
	}
	return Promise.resolve(`User is offline`);
});

exports.changePrivateStatus = functions.https.onCall(async (data, context) => {
	try {
		const user = await admin
			.firestore()
			.collection("users")
			.doc(context.auth.uid)
			.get()
			.then((value) => value.data());

		await admin
			.firestore()
			.collection("users")
			.doc(context.auth.uid)
			.update({ private: !user.private });

		await admin
			.firestore()
			.collection("online")
			.doc(context.auth.uid)
			.update({ private: !user.private });
	} catch (error) {
		console.log(error.message);
	}
	return Promise.resolve(`Updated Profile`);
});
