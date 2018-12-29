import { Action } from "@ngrx/store";

export const TRY_GET_USER_SETTINGS = "[UserSettings] TRY_GET_USER_SETTINGS";
export const CHANGE_STATE = "[UserSettings] CHANGE_STATE";
export const FINISH_GET_USER_SETTINGS = "[UserSettings] FINISH_GET_USER_SETTINGS";
export class ChangeState implements Action {
  readonly type = CHANGE_STATE;
  constructor(public payload: {key: string, value: any}) {}
}

export class TryGetUserSettings implements Action {
  readonly type = TRY_GET_USER_SETTINGS;
}

export class FinishGetUserSettings implements Action {
  readonly type = FINISH_GET_USER_SETTINGS;
  constructor(public payload: {salaryModal: boolean, salary?: number}) {}

}
export type UserSettingActions =
  ChangeState | TryGetUserSettings | FinishGetUserSettings;
