import * as fromApp from '../../../../app.reducers';
import * as UserSettingActions from './actions';

export interface FeatureState extends fromApp.AppState {
  userSettings: State
}

export interface State {
  salarySchema?: ISalarySchema;
  isLoadingSettings: boolean;
  salaryModal: boolean;

  isAddingSalarySchema: boolean;
};

export interface ISalarySchema {
  salary?: number;
  currency?: string;
}

const initialState: State = {
  salarySchema: null,
  salaryModal: false,
  isLoadingSettings: false,

  isAddingSalarySchema: false
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
          salarySchema: action.payload.salarySchema
        };
      case UserSettingActions.TRY_ADD_SALARY_SCHEMA:
        return {
          ...state,
          isAddingSalarySchema: true
        };
      case UserSettingActions.FINISH_ADDING_SALARY_SCHEMA:
        return {
          ...state,
          isAddingSalarySchema: false,
          salaryModal: false,
          salarySchema: action.payload
        };
      default:
          return state;
    }
}

export const selectSalarySchema = (state: State) => state.salarySchema;
export const selectSalaryModal = (state: State) => state.salaryModal;
export const selectIsAddingSalarySchema = (state: State) => state.isAddingSalarySchema;
export const selectIsLoadingSettings = (state: State) => state.isLoadingSettings;
