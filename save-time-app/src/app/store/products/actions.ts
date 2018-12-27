import { Action } from "@ngrx/store";
import { Product, IProductCategory } from "src/app/models/product";
import { FormState } from "src/app/components/utils/form/form";

export const FETCH_PRODUCTS = "[Products] FETCH_PRODUCTS";
export const SET_PRODUCTS = "[Products] SET_PRODUCTS";
export const PUSH_PRODUCT = "[Products] PUSH_PRODUCT";
export const PUT_PRODUCT = "[Products] PUT_PRODUCT";
export const REMOVE_PRODUCT = "[Products] REMOVE_PRODUCT";
export const SET_REMOVING_PRODUCT_STATE = "[Products] SET_REMOVING_PRODUCT_STATE";

export const START_ADDING_PRODUCT = "[Products] START_ADDING_PRODUCT";
export const START_EDIT_PRODUCT = "[Products] START_EDIT_PRODUCT";
export const SET_CHANGING_PRODUCTS_STATE = "[Products] SET_CHANGING_PRODUCTS_STATE";
export const START_REMOVING_PRODUCT = "[Products] START_REMOVING_PRODUCT";

export const START_VOTING = "[Products] START_VOTING";

export const SET_PRODUCT_CATEGORIES = "[Products] SET_PRODUCT_CATEGORIES";
export const TRY_GET_PRODUCT_CATEGORIES = "[Products] TRY_GET_PRODUCT_CATEGORIES";
export const TRY_ADD_PRODUCT_CATEGORY = "[Products] TRY_ADD_PRODUCT_CATEGORY";
export const TRY_EDIT_PRODUCT_CATEGORY = "[Products] TRY_EDIT_PRODUCT_CATEGORY";
export const FINISH_ADDING_PRODUCT_CATEGORY = "[Products] FINISH_ADDING_PRODUCT_CATEGORY";

export const CHANGE_LOADING_STATE = "[Products] CHANGE_LOADING_STATE";
export const CHANGE_STATE = "[Products] CHANGE_STATE";
export const TRY_REMOVE_CATEGORY = "[Products] TRY_REMOVE_CATEGORY";
export class SetProducts implements Action{
    readonly type = SET_PRODUCTS;
    constructor(public payload: {products: Product[], productsCount: number}){}
}

export class FetchProducts implements Action {
    readonly type = FETCH_PRODUCTS;
    constructor(public payload: string = '') {}
}

export class PushProduct implements Action {
  readonly type = PUSH_PRODUCT;
  constructor(public payload: Product) {}
}

export class PutProduct implements Action {
  readonly type = PUT_PRODUCT;
  constructor(public payload: {product: Product, productId: number}) {}
}

export class SetRemovingProductState implements Action {
  readonly type = SET_REMOVING_PRODUCT_STATE;
  constructor(public payload?: boolean) {}
}

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;
  constructor(public payload: number) {}
}

export class StartRemovingProduct implements Action {
  readonly type = START_REMOVING_PRODUCT;
  constructor(public payload: any) {}
}

export class StartAddingProduct implements Action {
  readonly type = START_ADDING_PRODUCT;
  constructor(public payload: FormState) {
  }
}

export class StartEditProduct implements Action {
  readonly type = START_EDIT_PRODUCT;
  constructor(public payload: Product) {}
}

export class SetChangeProductsState implements Action {
    readonly type = SET_CHANGING_PRODUCTS_STATE;
    constructor(public payload: boolean) {}
}

export class StartVoting implements Action {
  readonly type = START_VOTING;
  constructor(public payload: { rate: number, product: Product }) {}
}

export class SetProductCategories implements Action {
  readonly type = SET_PRODUCT_CATEGORIES;
  constructor(public payload: IProductCategory[]) {}
}

export class TryGetProductCategories implements Action {
  readonly type = TRY_GET_PRODUCT_CATEGORIES;
}

export class TryAddProductCategory implements Action {
  readonly type = TRY_ADD_PRODUCT_CATEGORY;
  constructor(public payload: {name: string}) {}
}
export class TryEditProductCategory implements Action {
  readonly type = TRY_EDIT_PRODUCT_CATEGORY;
  constructor(public payload: IProductCategory){ }
}

export class ChangeLoadingState implements Action {
  readonly type = CHANGE_LOADING_STATE;
  constructor(public payload: {key: string, status: boolean}) {}
}
export class FinishAddingProductCategory implements Action {
  readonly type = FINISH_ADDING_PRODUCT_CATEGORY;
  constructor(public payload: IProductCategory) {}
}

export class ChangeState implements Action {
  readonly type = CHANGE_STATE;
  constructor(public payload: {key: string, value: any}) {}
}

export class TryRemoveCategory implements Action {
  readonly type = TRY_REMOVE_CATEGORY;
  constructor(public payload: string) {}
}

export type ProductsActions = SetProducts | FetchProducts | PushProduct | StartAddingProduct | StartEditProduct |
  SetChangeProductsState | PutProduct | RemoveProduct | StartRemovingProduct | SetRemovingProductState | StartVoting | SetProductCategories | TryGetProductCategories
  | TryAddProductCategory | TryEditProductCategory | FinishAddingProductCategory | ChangeLoadingState | ChangeState | TryRemoveCategory;
