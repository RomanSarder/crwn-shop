jest.mock('../../firebase/utils', () => {
    return {
        __esModule: true,
        default: 42,
        getFirestoreInstance: jest.fn()
      };
})
import { handleAuthStateChanged } from './AuthProvider'
import { getFirestoreInstance } from '../../firebase/utils'
import { setUser } from '../../store/user/actions';

function mockGetFirestoreInstance () {
    getFirestoreInstance.mockImplementation(async () => {
        return {
            collection () {
                return {
                    doc () {
                        return {
                            async get () {
                                return {
                                    id: 2,
                                    data () {
                                        return {
                                            uid: 2
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

it('handleAuthStateChanged should call dispatch with new user', async () => {
    mockGetFirestoreInstance()
    var dispatchMock = jest.fn()
    const currentUserId = 1
    await handleAuthStateChanged(dispatchMock, currentUserId)({ uid: 2 })
    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith({
        type: setUser().type,
        payload: {
            uid: 2
        }
    })
})

it('handleAuthStateChanged should not call dispatch with a user with the same uid', async () => {
    mockGetFirestoreInstance()
    var dispatchMock = jest.fn()
    const currentUserId = 1
    await handleAuthStateChanged(dispatchMock, currentUserId)({ uid: 1 })
    expect(dispatchMock).not.toHaveBeenCalled()
})