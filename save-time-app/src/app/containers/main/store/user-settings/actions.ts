import { Action } from "@ngrx/store";
import { ISalarySchema } from "src/app/containers/main/store/user-settings/reducers";
import { FormState } from "src/app/components/utils/form/form";

export const TRY_GET_USER_SETTINGS = "[UserSettings] TRY_GET_USER_SETTINGS";
export const CHANGE_STATE = "[UserSettings] CHANGE_STATE";
export const FINISH_GET_USER_SETTINGS = "[UserSettings] FINISH_GET_USER_SETTINGS";

export const TRY_ADD_SALARY_SCHEMA = "[UserSettings] TRY_ADD_SALARY_SCHEMA";
export const FINISH_ADDING_SALARY_SCHEMA = "[UserSettings] FINISH_ADDING_SALARY_SCHEMA";
export class ChangeState implements Action {
  readonly type = CHANGE_STATE;
  constructor(public payload: {key: string, value: any}) {}
}

export class TryGetUserSettings implements Action {
  readonly type = TRY_GET_USER_SETTINGS;
}

export class FinishGetUserSettings implements Action {
  readonly type = FINISH_GET_USER_SETTINGS;
  constructor(public payload: {salaryModal: boolean, salarySchema?: ISalarySchema}) {}
}

export class TryAddSalarySchema implements Action {
  readonly type = TRY_ADD_SALARY_SCHEMA;
  constructor(public payload: FormState) {}
}

export class FinishAddingSalarySchema implements Action {
  readonly type = FINISH_ADDING_SALARY_SCHEMA;
  constructor(public payload: ISalarySchema) {}
}

export type UserSettingActions =
  ChangeState | TryGetUserSettings | FinishGetUserSettings | TryAddSalarySchema | FinishAddingSalarySchema;
