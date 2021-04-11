import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/utils'

export var AuthContext = React.createContext({
    currentUser: null
})

export default function AuthProvider({ children }) {
    var [currentUser, setCurrentUser] = useState(null)
    
    useEffect(function subscribeToCurrentAuthenticatedUser () {
        var unsubscribe = auth.onAuthStateChanged(function setNewCurrentUser (user) {
            console.log(user)
            setCurrentUser(user)
        })

        return unsubscribe
    })

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}
