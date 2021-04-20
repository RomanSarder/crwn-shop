import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    getAuthInstance, 
    getFirestoreInstance, 
    signOut, 
    makeSignUpWithEmailAndPasswordFunction, 
    signInWithGoogle, 
    signInWithEmailAndPassword 
} from '../../firebase/utils'
import { setUser } from '../../store/user/actions'
import { selectUserId } from '../../store/user/selectors'

export var AuthContext = React.createContext({
    signOut, 
    makeSignUpFunction: makeSignUpWithEmailAndPasswordFunction,
    signInWithGoogle,
    signInWithEmailAndPassword,
})

export function handleAuthStateChanged (dispatch, currentUserId) {
    return async function getUserProfile (user) {
        if (user) {
            if (currentUserId !== user.uid) {
                var firestore = await getFirestoreInstance()
                try {
                    var userProfileSnapshot = await firestore
                        .collection('users')
                        .doc(user.uid)
                        .get()
                    var userProfileData = userProfileSnapshot.data()
                    dispatch(setUser({ ...userProfileData, uid: userProfileSnapshot.id }))
                } catch (error) {
                    console.log(`Error while trying to get user profile:${error.message}`)
                }
            }
        } else {
            dispatch(setUser(null))
        }
    }
}

export default function AuthProvider({ children }) {

    var dispatch = useDispatch()
    var currentUserId = useSelector(selectUserId)
    
    
    useEffect(function subscribeToCurrentAuthenticatedUser () {
        var auth = getAuthInstance()
        var unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged(dispatch, currentUserId))
        return unsubscribe
    }, [currentUserId])

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
