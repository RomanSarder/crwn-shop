export function getUser (state) {
    return state.user.currentUser
}

export function getUserId (state) {
    return state.user.currentUser?.uid
}