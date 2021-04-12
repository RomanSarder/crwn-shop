import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth, firestore, signOut, makeSignUpWithEmailAndPasswordFunction, signInWithGoogle, signInWithEmailAndPassword } from '../firebase/utils'
import { setUser } from '../store/user/actions'
import { selectUserId } from '../store/user/selectors'

export var AuthContext = React.createContext({
    signOut, 
    makeSignUpFunction: makeSignUpWithEmailAndPasswordFunction,
    signInWithGoogle,
    signInWithEmailAndPassword,
})

export default function AuthProvider({ children }) {

    var dispatch = useDispatch()
    var currentUserId = useSelector(selectUserId)
    
    
    useEffect(function subscribeToCurrentAuthenticatedUser () {
        var unsubscribe = auth.onAuthStateChanged(async function getUserProfile (user) {
            if (user) {
                try {
                    var userProfileSnapshot = await firestore
                        .collection('users')
                        .doc(user.uid)
                        .get()
    
                    var userProfileData = userProfileSnapshot.data()
                    
                    if (currentUserId !== user.uid) {
                        dispatch(setUser({ ...userProfileData, uid: userProfileSnapshot.id }))
                    }
                } catch (error) {
                    console.log(`Error while trying to get user profile:${error.message}`)
                }
            } else {
                dispatch(setUser(null))
            }
        })
        return unsubscribe
    })

    return (
        <AuthContext.Provider value={{
            signOut, 
            makeSignUpFunction: makeSignUpWithEmailAndPasswordFunction,
            signInWithGoogle,
            signInWithEmailAndPassword,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
