import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromUserSettings from './user-settings/reducers';
import { selectSalarySchema, selectSalaryModal, selectIsAddingSalarySchema } from "./user-settings/reducers";
export const selectUserSettingsEntity = createFeatureSelector<fromUserSettings.State>(
  'userSettings'
);
export const getSalarySchema = createSelector(
  selectUserSettingsEntity, selectSalarySchema
);
export const getSalaryModal = createSelector(
  selectUserSettingsEntity, selectSalaryModal
);
export const getIsAddingSalarySchema = createSelector(
  selectUserSettingsEntity, selectIsAddingSalarySchema
);
