import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromUserSettings from './user-settings/reducers';
import { selectSalary } from "./user-settings/reducers";
export const selectUserSettingsEntity = createFeatureSelector<fromUserSettings.State>(
  'userSettings'
);
export const getSalary = createSelector(
  selectUserSettingsEntity, selectSalary
);
