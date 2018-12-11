import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from './store/products/reducers';
import * as fromUsers from './store/users/reducers';
export interface AppState {
  products: fromProducts.State;
  users: fromUsers.State;
};

export const reducers: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  users: fromUsers.usersReducer
};
