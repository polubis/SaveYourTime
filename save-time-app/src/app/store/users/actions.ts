import { Action } from "@ngrx/store";
import { FormState } from "src/app/components/utils/form/form";
import { ILoggedUser } from "src/app/store/users/reducers";

export const SET_REGISTER_STATE = "[Users] SET_REGISTER_STATE";
export const START_REGISTER = "[Users] START_REGISTER";
export const TRY_LOG_IN = "[Users] TRY_LOG_IN";
export const CHANGE_STATE = "[Users] CHANGE_STATE";
export const SET_LOG_IN_DATA = "[Users] SET_LOG_IN_DATA";

export class SetRegisterState implements Action{
    readonly type = SET_REGISTER_STATE;
    constructor(public payload: boolean){}
}
export class StartRegister {
  readonly type = START_REGISTER;
  constructor(public payload: any) {}
}

export class TryLogIn {
  readonly type = TRY_LOG_IN;
  constructor(public payload: FormState) {}
}

export class SetLogInData {
  readonly type = SET_LOG_IN_DATA;
  constructor(public payload: ILoggedUser) {}
}

export class ChangeState {
  readonly type = CHANGE_STATE;
  constructor(public payload: {key: string, value: any}) {}
}

export type UsersActions =
  ChangeState |
  SetRegisterState |
  StartRegister |
  TryLogIn |
  SetLogInData;
