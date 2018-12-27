import * as fromApp from '../../app.reducers';
import { Product, IProductCategory } from "src/app/models/product";
import * as ProductsActions from './actions';
export interface State {
  products: Product[];
  productsCount: number;
  isAddingOrEditingProduct: boolean;
  isRemovingProduct: boolean;
  removingProductStatus?: boolean;
  isLoadingCategories: boolean;
  productCategories: IProductCategory[];
  isAddingProductCategory?: boolean;
  categoryModal: boolean;
  isRemovingCategory: boolean;
};

const initialState: State = {
  products: [],
  productsCount: 0,
  isAddingOrEditingProduct: false,
  isRemovingProduct: false,
  removingProductStatus: null,
  isLoadingCategories: false,
  productCategories: [],
  isAddingProductCategory: null,
  categoryModal: false,
  isRemovingCategory: false,
};

export function productsReducer(state = initialState, action: ProductsActions.ProductsActions){
    switch(action.type){
      case ProductsActions.CHANGE_LOADING_STATE:
        return {
          ...state,
          [action.payload.key]: action.payload.status
        };
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
      case ProductsActions.SET_PRODUCT_CATEGORIES:
        return {
          ...state,
          productCategories: action.payload,
          isLoadingCategories: false
        };
      case ProductsActions.TRY_GET_PRODUCT_CATEGORIES:
        return {
          ...state,
          isLoadingCategories: true
        };
      case ProductsActions.TRY_ADD_PRODUCT_CATEGORY:
        return {
          ...state,
          isAddingProductCategory: true
        };
      case ProductsActions.FINISH_ADDING_PRODUCT_CATEGORY:
        return {
          ...state,
          isAddingProductCategory: false,
          productCategories: [action.payload, ...state.productCategories]
        }
      case ProductsActions.CHANGE_STATE:
        return {
          ...state,
          [action.payload.key]: action.payload.value
        };
      case ProductsActions.TRY_REMOVE_CATEGORY:
        return {
          ...state,
          isRemovingCategory: true
        };
      default:
        return state;
    }
}
export const isAddingOrEditing = (state: State) => state.isAddingOrEditingProduct;
export const products = (state: State) => state.products;
export const productsCount = (state: State) => state.productsCount;
export const selectCategories = (state: State) => state.productCategories;
