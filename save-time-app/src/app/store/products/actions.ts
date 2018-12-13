import { Action } from "@ngrx/store";
import { Product } from "src/app/models/product";
import { FormState } from "src/app/components/utils/form/form";

export const FETCH_PRODUCTS = "[Products] FETCH_PRODUCTS";
export const SET_PRODUCTS = "[Products] SET_PRODUCTS";
export const PUSH_PRODUCT = "[Products] PUSH_PRODUCT";

export const START_CHANGING_PRODUCTS = "[Products] START_CHANGING_PRODUCTS";
export const SET_CHANGING_PRODUCTS_STATE = "[Products] SET_CHANGING_PRODUCTS_STATE";

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

export class StartChangingProducts implements Action {
  readonly type = START_CHANGING_PRODUCTS;
  constructor(public payload: FormState) {
  }
}

export class SetChangeProductsState implements Action {
    readonly type = SET_CHANGING_PRODUCTS_STATE;
    constructor(public payload: boolean) {}
}
export type ProductsActions = SetProducts | FetchProducts | PushProduct | StartChangingProducts | SetChangeProductsState;
