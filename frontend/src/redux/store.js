import {applyMiddleware ,createStore,combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { BackendReducer,BackendAdminReducer, BackendUserReducer} from './reducers/dataReducer';
import thunk from 'redux-thunk';
import {LoggedUser} from './reducers/dataReducer'

const rootReducer = combineReducers({
    data:BackendReducer,
    admin:BackendAdminReducer,
    user:BackendUserReducer,
    root:LoggedUser
})
const middleware=[thunk];

const persistConfig = {
  key: 'active',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

const persistor = persistStore(store); 

export { store, persistor };