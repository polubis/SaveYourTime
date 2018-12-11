import * as fromApp from '../../app.reducers';
import * as UsersActions from './actions';
export interface State {
  isCreatingAccount: boolean;
  createAccountStatus: boolean;
};

const initialState: State = {
  isCreatingAccount: false,
  createAccountStatus: null
};

export function usersReducer(state = initialState, action: UsersActions.UsersActions){
    switch(action.type){
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
        default:
            return state;
    }
}
