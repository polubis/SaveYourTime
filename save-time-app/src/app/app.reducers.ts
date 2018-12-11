import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from './store/products/reducers';
import * as fromUsers from './store/users/reducers';
import * as fromNotifications from './store/notifications/reducers';
export interface AppState {
  products: fromProducts.State;
  users: fromUsers.State;
  notificationsReducer: fromNotifications.State
};

export const reducers: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  users: fromUsers.usersReducer,
  notificationsReducer: fromNotifications.notificationsReducer
};
