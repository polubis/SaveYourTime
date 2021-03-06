import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromNotifications from './notifications/reducers';
import * as fromProducts from './products/reducers';
import * as fromExtractions from './extractions/reducers';
import * as fromUsers from './users/reducers';
import { selectIsLogingIn, selectLogInData, selectToken, selectIsLogingOut, selectLoggedUserState, selectUploadingAvatarStatus } from "./users/reducers";
import { selectIsLoadingProducts } from "./products/reducers";

export const selectExtractionsEntity = createFeatureSelector<fromExtractions.State>(
  'extractions'
);
export const selectNotificationEntity = createFeatureSelector<fromNotifications.State>(
  'notifications'
);
export const selectProductsEntity = createFeatureSelector<fromProducts.State>(
  'products'
);
export const selectUserEntity = createFeatureSelector<fromUsers.State>(
  'users'
);

export const getIsLoadingProducts = createSelector(
  selectProductsEntity, selectIsLoadingProducts
);

export const getIsLogingIn = createSelector(
  selectUserEntity, selectIsLogingIn
);

export const getLogInData = createSelector(
  selectUserEntity, selectLogInData
);

export const getToken = createSelector(
  selectUserEntity, selectToken
);

export const getLogoutStatus = createSelector(
  selectUserEntity, selectIsLogingOut
);

export const getLoggedUserState = createSelector(
  selectUserEntity, selectLoggedUserState
);

export const getUploadingUserAvatarStatus = createSelector(
  selectUserEntity, selectUploadingAvatarStatus
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

export const getCategories = createSelector(
  selectProductsEntity, fromProducts.selectCategories
);

export const getProductsCount = createSelector(
  selectProductsEntity, fromProducts.productsCount
);

export const getFilesToExtract = createSelector(
  selectExtractionsEntity, fromExtractions.selectFilesToExtract
);

export const getExtractedFiles = createSelector(
  selectExtractionsEntity, fromExtractions.selectExtractedFiles
);
