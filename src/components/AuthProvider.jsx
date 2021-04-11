import React, { useEffect, useState } from 'react'
import { auth, firestore } from '../firebase/utils'

export var AuthContext = React.createContext({
    currentUser: null
})

export default function AuthProvider({ children }) {
    var [currentUser, setCurrentUser] = useState(null)
    var [currentUserUid, setCurrentUserUid] = useState(null)
    
    useEffect(function subscribeToCurrentAuthenticatedUser () {
        var unsubscribe = auth.onAuthStateChanged(async function getUserProfile (user) {
            console.log('auth state change', currentUserUid, user?.uid)
            if (user) {
                console.log('requesting')
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

    function signOut () {
        return auth.signOut()
    }

    return (
        <AuthContext.Provider value={{ currentUser, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
