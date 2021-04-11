import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/utils'

export var AuthContext = React.createContext({
    currentUser: null
})

export default function AuthProvider({ children }) {
    var [currentUser, setCurrentUser] = useState(null)
    
    useEffect(function subscribeToCurrentAuthenticatedUser () {
        var unsubscribe = auth.onAuthStateChanged(function setNewCurrentUser (user) {
            setCurrentUser(user)
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
