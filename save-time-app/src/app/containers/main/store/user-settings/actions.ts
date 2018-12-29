import { Action } from "@ngrx/store";

export const TRY_SET_SALARY = "[UserSettings] TRY_SET_SALARY";
export const CHANGE_STATE = "[UserSettings] CHANGE_STATE";

export class ChangeState implements Action {
  readonly type = CHANGE_STATE;
  constructor(public payload: {key: string, value: any}) {}
}

export class TrySetSalary implements Action {
  readonly type = TRY_SET_SALARY;
  constructor(public payload: number) {}
}
export type UserSettingActions =
  ChangeState | TrySetSalary;
