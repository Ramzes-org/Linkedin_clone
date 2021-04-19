import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCB9DSQq4uXpt9O9FzV1zK-OZ8UyZJ1mQk",
  authDomain: "linkedin-clone-c245f.firebaseapp.com",
  projectId: "linkedin-clone-c245f",
  storageBucket: "linkedin-clone-c245f.appspot.com",
  messagingSenderId: "273714019433",
  appId: "1:273714019433:web:4d0b34f93b1308bbf4f6f8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};