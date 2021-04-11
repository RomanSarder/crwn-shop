import React, { useEffect, useState } from 'react'
import { auth, firestore, signOut, makeSignUpWithEmailAndPasswordFunction, makeSignInWithGoogleFunction } from '../firebase/utils'

export var AuthContext = React.createContext({
    currentUser: null
})

export default function AuthProvider({ children }) {
    var [currentUser, setCurrentUser] = useState(null)
    var [currentUserUid, setCurrentUserUid] = useState(null)
    
    useEffect(function subscribeToCurrentAuthenticatedUser () {
        var unsubscribe = auth.onAuthStateChanged(async function getUserProfile (user) {
            if (user) {
                try {
                    var userProfileSnapshot = await firestore
                        .collection('users')
                        .doc(user.uid)
                        .get()
    
                    var userProfileData = userProfileSnapshot.data()
                    if (currentUserUid !== user.uid) {
                        setCurrentUser(userProfileData)
                        setCurrentUserUid(user.uid)
                    }
                } catch (error) {
                    console.log(`Error while trying to get user profile:${error.message}`)
                }
            } else {
                setCurrentUserUid(null)
                setCurrentUser(null)
            }
        })

        return unsubscribe
    })

    var contextValue = {
        currentUser, 
        signOut, 
        makeSignUpFunction: makeSignUpWithEmailAndPasswordFunction,
        signInWithGoogle: makeSignInWithGoogleFunction()
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
