import { getFirestoreInstance } from '../firebase/utils'
import { getCollectionsWithItems } from './collections'

async function getFirestoreInstanceMock() {
    return {
        collection () {
            return {
                doc () {
                    return {
                        collection () {
                            return {
                                async get () {
                                    return {
                                        docs: [{
                                            id: 'test-item-id',
                                            data () {
                                                return {
                                                    testItemData: true
                                                }
                                            }
                                        }]
                                    }
                                }
                            }
                        }
                    }
                },

                get () {
                    return {
                        docs: [ {
                            id: 1,
                            data () {
                                return {
                                    name: 'test-collection',
                                }
                            }
                        } ]
                    }
                }
            }
        }
    }
}

jest.mock('../firebase/utils', () => {
    return {
        __esModule: true,
        default: 42,
        getFirestoreInstance: jest.fn()
      };
})

it('getCollectionsWithItems API call should return proper data', async () => {
    getFirestoreInstance.mockImplementation(getFirestoreInstanceMock)

    var result = await getCollectionsWithItems()

    expect(result).toEqual({
        'test-collection': {
            name: 'test-collection',
            id: 1,
            items: [
                {
                    id: 'test-item-id',
                    testItemData: true
                }
            ]
        }
    })
})

