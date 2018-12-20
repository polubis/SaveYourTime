import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from './store/products/reducers';
import * as fromUsers from './store/users/reducers';
import * as fromNotifications from './store/notifications/reducers';
import * as fromExtractions from './store/extractions/reducers';
export interface AppState {
  products: fromProducts.State;
  users: fromUsers.State;
  notifications: fromNotifications.State;
  extractions: fromExtractions.State;
};

export const reducers: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  users: fromUsers.usersReducer,
  notifications: fromNotifications.notificationsReducer,
  extractions: fromExtractions.extractionsReducer
};
