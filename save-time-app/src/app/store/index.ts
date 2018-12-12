import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromNotifications from './notifications/reducers';

export const selectNotificationEntity = createFeatureSelector<fromNotifications.State>(
  'notifications'
);

export const getNotifications = createSelector(
  selectNotificationEntity, fromNotifications.notifications
);
