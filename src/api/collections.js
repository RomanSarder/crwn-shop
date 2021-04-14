import { firestore } from '../firebase/utils'

export async function getCollectionsWithItems () {
    var collectionsRef = firestore.collection('collections')

    // Each document in this collection is a "collection" with name and items collection
    try {
        var collectionsSnapshots = await collectionsRef.get()
    } catch (e) {
        throw new Error(`Failed to get collections: ${e.message}`)
    }

    var collectionsData = collectionsSnapshots.docs.map(function mapSnapshotsToDataAndId (s) {
        return {
            data: s.data(),
            id: s.id
        }
    })
    console.log('collections data', collectionsData)
    var resultObject = {}
    var promises = collectionsData.map(async function getCollectionDataAndItems ({ data: collectionData, id }) {
        resultObject[collectionData.name] = []
        console.log('COLLECTION ID', id)
        var currentCollectionItemsRef = collectionsRef.doc(id).collection('items')
        try {
            var collectionItemsSnapshots = await currentCollectionItemsRef.get()
        } catch (e) {
            throw new Error(`Failed to get current collection items: ${e.message}`)
        }
        resultObject[collectionData.name].items = collectionItemsSnapshots.docs.map(function mapSnapshotsToData (s) {
            return s.data()
        })
    })

    try {
        await Promise.all(promises)
    } catch (e) {
        throw new Error(`Failed to get collection items: ${e.message}`)
    } finally {
        console.log("FINALLY", resultObject)
        return resultObject
    }
}