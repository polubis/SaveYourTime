import { Action } from "@ngrx/store";
import { Product } from "src/app/models/product";

export const FETCH_PRODUCTS = "[Products] FETCH_PRODUCTS";

export const SET_PRODUCTS = "[Products] SET_PRODUCTS";

export class SetProducts implements Action{
    readonly type = SET_PRODUCTS;

    constructor(public payload: Product[]){}
}

export class FetchProducts implements Action {
    readonly type = FETCH_PRODUCTS;
}

export type ProductsActions = SetProducts | FetchProducts;
