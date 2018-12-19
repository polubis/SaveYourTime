import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromNotifications from './notifications/reducers';
import * as fromProducts from './products/reducers';
import * as fromOperations from './operations/reducers';

export const selectOperationsEntity = createFeatureSelector<fromOperations.State>(
  'operations'
);
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

export const getProductsCount = createSelector(
  selectProductsEntity, fromProducts.productsCount
);

export const getFilesToExtract = createSelector(
  selectOperationsEntity, fromOperations.selectFilesToExtract
);
