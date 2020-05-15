For security reasons, I have hidden my firebase config file with my apiKey. If you would like to recreate the same functionality, all you have to do is follow these steps.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and sign in with a google account if you're not already signed in.

2. Create a new project.

3. Add a web app and register it. This will give you the configuration for that app.

4. Click on `Project settings`.

5. Under `Firebase SDK snippet`, click `Config` and copy.

6. Create a file called `fbConfig.js` and place it in this folder. Then paste the config in that file.

7. Above the config variable, make four imports.
   `import firebase from 'firebase/app'`
   `import 'firebase/firestore'`
   `import 'firebase/auth'`
   `import 'firebase/functions'`

8. Call `firebase.initializeApp(firebaseConfig)`at the bottom of the config variable then `export default firebase` so redux can use it to monitor firebase and firesore.
