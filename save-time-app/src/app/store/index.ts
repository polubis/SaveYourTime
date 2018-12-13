import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromNotifications from './notifications/reducers';
import * as fromProducts from './products/reducers';

export const selectNotificationEntity = createFeatureSelector<fromNotifications.State>(
  'notifications'
);

export const selectProductsEntity = createFeatureSelector<fromProducts.State>(
  'products'
);

export const getNotifications = createSelector(
  selectNotificationEntity, fromNotifications.notifications
);

export const getAddingOrEditingState = createSelector(
  selectProductsEntity, fromProducts.isAddingOrEditing
);

export const getProducts = createSelector(
  selectProductsEntity, fromProducts.products
);
