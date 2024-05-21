import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    FLUSH, PAUSE,
    PERSIST, persistReducer, PURGE,
    REGISTER, REHYDRATE, persistStore 
} from 'redux-persist';
// import thunk from 'redux-thunk';

import userReducer from './slices/userSlice';
import ordersReducer from './reducers/orders';
import orderReducer from './reducers/order';
import mainReducer from './reducers/main';
import pointsReducer from './reducers/points';
import profileReducer from './reducers/profile';
import trackedListReducer from './reducers/trackedList';
import langsReducer from './reducers/langs';
import tasksReducer from './reducers/tasks';
import dropoffsReducer from './reducers/dropoff';

const reducers = combineReducers({
    user: persistReducer(
        {
            key: 'user',
            keyPrefix: '',
            storage: AsyncStorage,
            timeout: null
        },
        userReducer
    ),
    points: pointsReducer,
    main: mainReducer,
    orders: ordersReducer,
    order: orderReducer,
    profile: profileReducer,
    langs: langsReducer,
    trackedList: trackedListReducer,
    tasks: tasksReducer,
    dropoffs: dropoffsReducer,
})

// const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
  })
// export const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== 'production',
//     middleware: [thunk],
// });

export const persistor = persistStore(store);