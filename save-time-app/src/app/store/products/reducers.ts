import * as fromApp from '../../app.reducers';
import { Product } from "src/app/models/product";
import * as ProductsActions from './actions';
export interface State {
  products: Product[]
};

const initialState: State = {
  products: []
};

export function productsReducer(state = initialState, action: ProductsActions.ProductsActions){
    switch(action.type){
        case ProductsActions.SET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload]
            };
        default:
            return state;
    }
}
