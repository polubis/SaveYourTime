import { Action } from "@ngrx/store";
import { Product } from "src/app/models/product";
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

export class SetProducts implements Action{
    readonly type = SET_PRODUCTS;
    constructor(public payload: Product[]){}
}

export class FetchProducts implements Action {
    readonly type = FETCH_PRODUCTS;
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
  constructor(public payload: {formState: FormState, product: Product}) {}
}

export class SetChangeProductsState implements Action {
    readonly type = SET_CHANGING_PRODUCTS_STATE;
    constructor(public payload: boolean) {}
}

export class StartVoting implements Action {
  readonly type = START_VOTING;
  constructor(public payload: {rate: number, product: Product}) {}
}

export type ProductsActions = SetProducts | FetchProducts | PushProduct | StartAddingProduct | StartEditProduct |
  SetChangeProductsState | PutProduct | RemoveProduct | StartRemovingProduct | SetRemovingProductState | StartVoting;
