import {combineReducers} from 'redux';
import data from './data';
import sound from './sound';

const rootReducer = combineReducers({
  data,
  sound,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
