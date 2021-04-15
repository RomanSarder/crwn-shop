import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

async function createUserProfileDocument (user, additionalData) {
    var firestore = getFirestoreInstance()

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

export function getFirestoreInstance () {
    return firebase.firestore();
}
export function getAuthInstance () {
    return firebase.auth();
}
function makeGoogleProviderSingleton () {
    var provider;

    return async function getGoogleProvider () {
        if (!provider) {
            await getAuthInstance()
            provider = new firebase.auth.GoogleAuthProvider()
            provider.setCustomParameters({ 'promtp': 'select_account' })
        }

        return provider
    }
}

var getGoogleProvider = makeGoogleProviderSingleton()

function withCreateUserProfileDocument (fn) {
    return function makeCreateUserProfileDocumentAfterOperationFunction (additionalData) {
        return async function createUserProfileDocumentAfterOperation (...args) {
            try {
                try {
                    var response = await fn(...args)
                } catch (error) {
                    console.log(error.message)
                }
        
                await createUserProfileDocument(response.user, additionalData)
    
                return response
            } catch (error) {
                console.log(`Error while trying to create user profile document: ${error.message}`)
            }
        }
    }
}

function withFirebaseAuthInstance (fn) {
    return async function executeWithAuthInstance (...args) {
        var auth = await getAuthInstance()
        console.log("AUTH", auth, fn)

        return fn(auth)(...args)
    }
}

async function _makeSignUpWithEmailAndPassword (auth) {
    return async function signUpWithAuthInstance (email, password) {
        try {
            var response = await auth.createUserWithEmailAndPassword(email, password)
            return response
        } catch (error) {
            throw new Error(`Error while trying to sign up with email and password: ${error.message}`)
        }
    }
}

function makeSignInWithGoogle (auth) {
    return async function signInWithAuthInstance () {
        try {
            var response = await auth.signInWithPopup(await getGoogleProvider())
            return response
        } catch (error) {
            throw new Error(`Error while trying to log in via google: ${error.message}`)
        }
    }
}
function makeSignOut (auth) {
    return function signOutWithAuthInstance () {
        return auth.signOut()
    }
}

export function makeSignInWithEmailAndPassword (auth) {
    return function signInWithEmailAndPasswordWithAuthInstance (email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
}
export const makeSignUpWithEmailAndPasswordFunction = withCreateUserProfileDocument(withFirebaseAuthInstance(_makeSignUpWithEmailAndPassword))
export const signOut = withFirebaseAuthInstance(makeSignOut)
export const signInWithGoogle = withCreateUserProfileDocument(withFirebaseAuthInstance(makeSignInWithGoogle))()
export const signInWithEmailAndPassword = withFirebaseAuthInstance(makeSignInWithEmailAndPassword)

export default firebase