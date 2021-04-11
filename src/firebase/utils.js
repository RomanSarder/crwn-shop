import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyDfROqje10UQdILoZkkHpI7m3w3lKGTwYo",
    authDomain: "crwn-882ba.firebaseapp.com",
    projectId: "crwn-882ba",
    storageBucket: "crwn-882ba.appspot.com",
    messagingSenderId: "1072495701752",
    appId: "1:1072495701752:web:82db6173f990d34dfc950d",
    measurementId: "G-BD2VB4M7XG"
}

firebase.initializeApp(config)

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ 'promtp': 'select_account' })

export function signInWithGoogle () {
    return auth.signInWithPopup(provider)
}
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export default firebase