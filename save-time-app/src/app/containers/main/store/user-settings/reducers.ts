import * as fromApp from '../../../../app.reducers';
import * as UserSettingActions from './actions';

export interface FeatureState extends fromApp.AppState {
  userSettings: State
}

export interface State {
  salary?: number;
  isLoadingSettings: boolean;
  salaryModal: boolean;
};

const initialState: State = {
  salary: null,
  salaryModal: false,
  isLoadingSettings: false
};

export function userSettingsReducer(state = initialState, action: UserSettingActions.UserSettingActions){
    switch(action.type){
      case UserSettingActions.CHANGE_STATE:
        return {
          ...state,
          [action.payload.key]: action.payload.value
        };
      case UserSettingActions.TRY_GET_USER_SETTINGS:
        return {
          ...state,
          isLoadingSettings: true
        };
      case UserSettingActions.FINISH_GET_USER_SETTINGS:
        return {
          ...state,
          salaryModal: action.payload.salaryModal,
          isLoadingSettings: false,
          salary: action.payload.salary
        }
      default:
          return state;
    }
}

export const selectSalary = (state: State) => state.salary;
export const selectSalaryModal = (state: State) => state.salaryModal;
