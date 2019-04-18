import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCW8Yow2D9Ysbqkg0yu8zPCKtl8irqHfn8",
    authDomain: "senior-project-95988.firebaseapp.com",
    databaseURL: "https://senior-project-95988.firebaseio.com",
    projectId: "senior-project-95988",
    storageBucket: "senior-project-95988.appspot.com",
    messagingSenderId: "1023668384947"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()

export default firebase