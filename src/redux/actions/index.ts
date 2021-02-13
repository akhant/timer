import {Dispatch} from 'redux';
import {SET_SETTING, GET_SOUND} from './../const/index';
export const setSetting = (settingName: string, value: string | boolean) => ({
  type: SET_SETTING,
  payload: {settingName, value},
});

export const getSound = (val: string) => (dispatch: Dispatch) => {
  dispatch({
    type: GET_SOUND,
    payload: {currentSound: val},
  });
};
