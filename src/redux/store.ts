import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['sound'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  //AsyncStorage.clear();
  let store = createStore(
    persistedReducer,
    {
      data: {
        isVibroEnabled: false,
        vibroDuration: '400',
        vibroTime: '50',
        playSound: false,
        currentSound: 'bass',
      },
    },
    applyMiddleware(thunk),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
