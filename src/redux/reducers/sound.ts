import {AnyAction} from 'redux';
import {initiateSound} from '../../utils';
import {GET_SOUND} from './../const/index';
const initialState = {
  soundObj: null,
};

export default (state = initialState, {type, payload}: AnyAction) => {
  switch (type) {
    case GET_SOUND:
      const soundObj = initiateSound(payload.currentSound);
      return {...state, soundObj};
    default:
      return state;
  }
};
