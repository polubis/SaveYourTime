import * as fromApp from '../../app.reducers';
import * as UsersActions from './actions';
export interface State {
  isCreatingAccount: boolean;
  createAccountStatus: boolean;

  token: string;
  isLogingIn: boolean;
  logInData?: ILoggedUser;
  isLogingOut: boolean;
  isGettingLoggedUserData: boolean;
};

export interface ILoggedUser {
   _id: string;
   username: string;
   email: string;
   picturePath?: string;
};

const initialState: State = {
  isCreatingAccount: false,
  createAccountStatus: null,

  token: '',
  isLogingIn: false,
  logInData: null,
  isLogingOut: false,
  isGettingLoggedUserData: false
};

export function usersReducer(state = initialState, action: UsersActions.UsersActions){
    switch(action.type){
      case UsersActions.CHANGE_STATE:
        return {
          ...state,
          [action.payload.key]: action.payload.value
        };
      case UsersActions.SET_REGISTER_STATE:
        return {
            ...state,
            isCreatingAccount: false,
            createAccountStatus: action.payload
        };
      case UsersActions.START_REGISTER:
        return {
          ...state,
          isCreatingAccount: true
        };
      case UsersActions.TRY_LOG_IN:
        return {
          ...state,
          isLogingIn: true
        };
      case UsersActions.TRY_LOG_OUT:
        return {
          ...state,
          isLogingOut: true
        };
      case UsersActions.SET_LOG_IN_DATA:
        return {
          ...state,
          logInData: action.payload.loggedUserData,
          token: action.payload.token
        };
      case UsersActions.TRY_GET_LOGGED_USER_DATA:
        return {
          ...state,
          isGettingLoggedUserData: true
        };
      case UsersActions.FINISH_GET_LOGGED_USER_DATA:
        return {
          ...state,
          isGettingLoggedUserData: false,
          logInData: action.payload
        };
      default:
          return state;
    }
}

export const selectIsLogingIn = (state: State) => state.isLogingIn;
export const selectLogInData = (state: State) => state.logInData;
export const selectToken = (state: State) => state.token;
export const selectIsLogingOut = (state: State) => state.isLogingOut;
export const selectLoggedUserState = (state: State) => state.isGettingLoggedUserData;
