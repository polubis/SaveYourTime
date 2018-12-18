import * as fromApp from '../../app.reducers';
import { Product } from "src/app/models/product";
import * as ProductsActions from './actions';
export interface State {
  products: Product[];
  productsCount: number;
  isAddingOrEditingProduct: boolean;
  isRemovingProduct: boolean;
  removingProductStatus?: boolean;
};

const initialState: State = {
  products: [],
  productsCount: 0,
  isAddingOrEditingProduct: false,
  isRemovingProduct: false,
  removingProductStatus: null
};

export function productsReducer(state = initialState, action: ProductsActions.ProductsActions){
    switch(action.type){
      case ProductsActions.SET_PRODUCTS:
        return {
            ...state,
            products: [...action.payload.products],
            productsCount: action.payload.productsCount
        };
      case ProductsActions.PUSH_PRODUCT:
        return {
          ...state,
          products: [action.payload, ...state.products]
        };
      case ProductsActions.PUT_PRODUCT:
        const products: Product[] = [...state.products];
        const index = products.findIndex(product => product._id === action.payload.productId);
        products[index] = { ...action.payload.product };
        return {
          ...state,
          products: products
        };
      case ProductsActions.REMOVE_PRODUCT:
        const newProducts: Product[] = [...state.products];
        const productIndex = newProducts.findIndex(product => product._id === action.payload);
        newProducts.splice(productIndex, 1);
        return {
          ...state,
          products: newProducts,
          isRemovingProduct: false,
          removingProductStatus: true
        };
      case ProductsActions.SET_REMOVING_PRODUCT_STATE:
        return {
          ...state,
          isRemovingProduct: false,
          removingProductStatus: action.payload
        };

      case ProductsActions.START_REMOVING_PRODUCT:
        return {
          ...state,
          isRemovingProduct: true
        };
      case ProductsActions.START_ADDING_PRODUCT:
        return {
            ...state,
            isAddingOrEditingProduct: true
        };
      case ProductsActions.START_EDIT_PRODUCT:
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
export const productsCount = (state: State) => state.productsCount;
