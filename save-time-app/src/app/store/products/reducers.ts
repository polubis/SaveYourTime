import * as fromApp from '../../app.reducers';
import { Product } from "src/app/models/product";
import * as ProductsActions from './actions';
export interface State {
  products: Product[],
  isAddingOrEditingProduct: boolean;
};

const initialState: State = {
  products: [],
  isAddingOrEditingProduct: false
};

export function productsReducer(state = initialState, action: ProductsActions.ProductsActions){
    switch(action.type){
        case ProductsActions.SET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload]
            };
        case ProductsActions.PUSH_PRODUCT:
            return {
              ...state,
              products: [action.payload, ...state.products]
            };
        case ProductsActions.START_CHANGING_PRODUCTS:
            return {
                ...state,
                isAddingOrEditingProduct: true
            };
        case ProductsActions.SET_CHANGING_PRODUCTS_STATE:
            return {
                ...state,
                isAddingOrEditingProduct: action.payload
            };
        default:
            return state;
    }
}
export const isAddingOrEditing = (state: State) => state.isAddingOrEditingProduct;
export const products = (state: State) => state.products;
