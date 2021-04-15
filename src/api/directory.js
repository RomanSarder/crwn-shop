import { getFirestoreInstance } from '../firebase/utils'

export async function getDirectoryData () {
    var firestore = getFirestoreInstance()
    var directoryRef = firestore.collection('directory')

    try {
        var directoryItemsSnapshots = await directoryRef.get()
        var directoryItemsData = directoryItemsSnapshots.docs.map(function mapSnapshotsToDataWithId (s) {
            return {
                ...s.data(),
                id: s.id
            }
        })

        return directoryItemsData
            .sort(function sortBySize (a, b) {
                if (a.size === 'large') {
                    return 1
                } else if (b.size === 'large') {
                    return -1
                } else {
                    return 0
                }
            })
    } catch (e) {
        throw new Error(`Error while trying to fetch directory: ${e.message}`)
    }
}