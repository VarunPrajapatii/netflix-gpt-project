// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4RSI50jgKUm3Olns51ysD0ubKWYdHzPU",
  authDomain: "netflixgpt-d7980.firebaseapp.com",
  projectId: "netflixgpt-d7980",
  storageBucket: "netflixgpt-d7980.appspot.com",
  messagingSenderId: "684558193135",
  appId: "1:684558193135:web:6d9dd288087c9d779f261a",
  measurementId: "G-F85R1YC1PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//npm install -g firebase-tools use this command to host your site with Firebase Hosting, you need the Firebase CLI (a command line tool).

/**
 * then to deploy
 * Deploy to Firebase Hosting
 * firebase login
 * Initiate your project
Run this command from your app's root directory:
 * firebase init
 * Specify your site in firebase.json
Add your site ID to the firebase.json configuration file. After you get set up, see the best practices for multi-site deployment.
 * "site": "netflixgptbyvarun",
 * When you're ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:
 * firebase deploy --only hosting:netflixgptbyvarun
 * After deploying, view your app at netflixgptbyvarun.web.app
 */


export const auth = getAuth();