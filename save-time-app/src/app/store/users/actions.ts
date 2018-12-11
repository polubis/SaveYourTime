import { Action } from "@ngrx/store";

export const SET_REGISTER_STATE = "[Users] SET_REGISTER_STATE";
export const START_REGISTER = "[Users] START_REGISTER";

export class SetRegisterState implements Action{
    readonly type = SET_REGISTER_STATE;

    constructor(public payload: boolean){}
}
export class StartRegister {
  readonly type = START_REGISTER;
  constructor(public payload: any) {}
}

export type UsersActions = SetRegisterState | StartRegister;
