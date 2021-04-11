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

async function createUserProfileDocument (user, additionalData) {
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

async function _signUpWithEmailAndPassword (email, password) {
    try {
        var response = await auth.createUserWithEmailAndPassword(email, password)
        return response
    } catch (error) {
        throw new Error(`Error while trying to sign up with email and password: ${error.message}`)
    }
}

async function _signInWithGoogle () {
    try {
        var response = await auth.signInWithPopup(provider)
        return response
    } catch (error) {
        throw new Error(`Error while trying to log in via google: ${error.message}`)
    }
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export function signOut () {
    return auth.signOut()
}



export const makeSignUpWithEmailAndPasswordFunction = withCreateUserProfileDocument(_signUpWithEmailAndPassword)
export const makeSignInWithGoogleFunction = withCreateUserProfileDocument(_signInWithGoogle)
export default firebase