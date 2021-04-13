import storage from 'redux-persist/lib/storage'

export var cartPersistConfig = {
    key: 'cart',
    storage,
    blacklist: ['showCart']
}

