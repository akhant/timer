import {GET_SOUND, SET_SETTING} from './../const/index';

export interface IData {
  isVibroEnabled: boolean;
  vibroDuration: string;
  vibroTime: string;
  playSound: boolean;
  currentSound: string;
  soundObj?: object;
}
const initialState: IData = {
  isVibroEnabled: false,
  vibroDuration: '400',
  vibroTime: '50',
  playSound: false,
  currentSound: 'bass',
  soundObj: {},
};

const data = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case SET_SETTING:
      console.log('set setting', payload.value);
      return {...state, [payload.settingName]: payload.value};

    default:
      return state;
  }
};

export default data;
