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

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export async function createUserProfileDocument (user, additionalData) {
    var { uid, displayName, email } = user
    const createdAt = Date.now()
    
    if (!user) return;

    try {
        await firestore
        .collection('users')
        .doc(uid)
        .set({
            displayName,
            email,
            createdAt,
            ...additionalData
        }, { merge: true })
    } catch (error) {
        console.log(`Error while trying to create profile docuemnt: ${error}`)
    }
}
export async function signInWithGoogle () {
    try {
        var { user } = await auth.signInWithPopup(provider)
        await createUserProfileDocument(user)
    } catch (error) {
        console.log(`Error while trying to log in via google: ${error}`)
    }
}
export default firebase