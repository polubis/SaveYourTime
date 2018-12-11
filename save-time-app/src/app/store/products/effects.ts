


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { switchMap, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { RequestsService } from "src/app/services/requests.service";
import * as ProductsActions from '../../store/products/actions';
import { Product } from "src/app/models/product";
@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private requestsService: RequestsService
  ) {}

  @Effect()
  productsFetching = this.actions$.ofType(ProductsActions.FETCH_PRODUCTS).pipe(
    switchMap((action: ProductsActions.FetchProducts) => {
      return this.requestsService.execute('products');
    }),
    map((response: {products: Product[]}) => {
      return {
        type: ProductsActions.SET_PRODUCTS,
        payload: response.products
      };
    })
  );
}
