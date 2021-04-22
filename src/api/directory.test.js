import { getFirestoreInstance } from '../firebase/utils'
import { getDirectoryData } from './directory'

async function getFirestoreInstanceMock() {
    return {
        collection () {
            return {
                async get () {
                    return {
                        docs: [
                            {
                                id: 'test-directory-item-2',
                                data () {
                                    return {
                                        testDirectoryData: true,
                                        size: 'large'
                                    }
                                }
                            },
                            {
                                id: 'test-directory-item-1',
                                data () {
                                    return {
                                        testDirectoryData: true,
                                        size: 'small'
                                    }
                                }
                            },
                        ]
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

it('getDirectoryData API call should return sorted by size directory items', async () => {
    getFirestoreInstance.mockImplementation(getFirestoreInstanceMock)

    var result = await getDirectoryData()

    expect(result).toEqual(
        [
            {
                id: 'test-directory-item-1',
                size: 'small',
                testDirectoryData: true
            },
            {
                id: 'test-directory-item-2',
                size: 'large',
                testDirectoryData: true
            }
        ]
    )
})

