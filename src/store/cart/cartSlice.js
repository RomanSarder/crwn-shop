import { persistReducer } from 'redux-persist'
import { cartPersistConfig } from '../persist-config'
import reducer from './reducer'

export * as actions from './actions'
export * as selectors from './selectors'
export default persistReducer(cartPersistConfig, reducer)