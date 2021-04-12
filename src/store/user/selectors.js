export function selectUser (state) {
    return state.user.currentUser
}

export function selectUserId (state) {
    return state.user.currentUser?.uid
}