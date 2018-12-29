import { Action } from "@ngrx/store";
import { FormState } from "src/app/components/utils/form/form";
import { ILoggedUser } from "src/app/store/users/reducers";

export const SET_REGISTER_STATE = "[Users] SET_REGISTER_STATE";
export const START_REGISTER = "[Users] START_REGISTER";
export const TRY_LOG_IN = "[Users] TRY_LOG_IN";
export const TRY_LOG_OUT = "[Users] TRY_LOG_OUT";
export const CHANGE_STATE = "[Users] CHANGE_STATE";
export const SET_LOG_IN_DATA = "[Users] SET_LOG_IN_DATA";

export const TRY_GET_LOGGED_USER_DATA = "[Users] TRY_GET_LOGGED_USER_DATA";
export const FINISH_GET_LOGGED_USER_DATA = "[Users] FINISH_GET_LOGGED_USER_DATA";

export class SetRegisterState implements Action{
    readonly type = SET_REGISTER_STATE;
    constructor(public payload: boolean){}
}
export class StartRegister implements Action {
  readonly type = START_REGISTER;
  constructor(public payload: any) {}
}

export class TryLogIn implements Action {
  readonly type = TRY_LOG_IN;
  constructor(public payload: FormState) {}
}

export class TryLogOut implements Action {
  readonly type = TRY_LOG_OUT;
}

export class SetLogInData implements Action {
  readonly type = SET_LOG_IN_DATA;
  constructor(public payload: {loggedUserData: ILoggedUser, token: string}) {}
}

export class ChangeState implements Action {
  readonly type = CHANGE_STATE;
  constructor(public payload: {key: string, value: any}) {}
}

export class TryGetLoggedUserData implements Action {
  readonly type = TRY_GET_LOGGED_USER_DATA;
}

export class FinishGetLoggedUserData implements Action {
  readonly type = FINISH_GET_LOGGED_USER_DATA;
  constructor(public payload: ILoggedUser) {}
}

export type UsersActions =
  ChangeState |
  SetRegisterState |
  StartRegister |
  TryLogIn |
  TryLogOut |
  SetLogInData |
  TryGetLoggedUserData |
  FinishGetLoggedUserData;
