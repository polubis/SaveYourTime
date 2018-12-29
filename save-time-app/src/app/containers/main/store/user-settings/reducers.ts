import * as fromApp from '../../../../app.reducers';
import * as UserSettingActions from './actions';

export interface FeatureState extends fromApp.AppState {
  userSettings: State
}

export interface State {
  salary?: number;
};

const initialState: State = {
  salary: null
};

export function userSettingsReducer(state = initialState, action: UserSettingActions.UserSettingActions){
    switch(action.type){
      case UserSettingActions.CHANGE_STATE:
        return {
          ...state,
          [action.payload.key]: action.payload.value
        };
      default:
          return state;
    }
}

export const selectSalary = (state: State) => state.salary;
