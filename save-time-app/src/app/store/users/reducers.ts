import * as fromApp from '../../app.reducers';
import * as UsersActions from './actions';
export interface State {
  isCreatingAccount: boolean;
  createAccountStatus: boolean;
  isLogingIn: boolean;
  logInData?: ILoggedUser;
};

export interface ILoggedUser {
   isAuth?: boolean;
   token: string;
   _id: string;
};

const initialState: State = {
  isCreatingAccount: false,
  createAccountStatus: null,

  isLogingIn: false,
  logInData: null
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
      case UsersActions.SET_LOG_IN_DATA:
        return {
          ...state,
          isLogingIn: false,
          logInData: action.payload
        };
      default:
          return state;
    }
}

export const selectIsLogingIn = (state: State) => state.isLogingIn;
export const selectLogInData = (state: State) => state.logInData;
