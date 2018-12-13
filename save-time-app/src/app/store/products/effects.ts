


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { switchMap, map, tap, take } from "rxjs/operators";
import { of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { RequestsService } from "src/app/services/requests.service";
import * as ProductsActions from '../../store/products/actions';
import { Product } from "src/app/models/product";
import { AppState } from "src/app/app.reducers";
@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private store: Store<AppState>
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

  @Effect()
  productAdding = this.actions$.ofType(ProductsActions.START_ADDING_PRODUCT).pipe(
    switchMap((action: ProductsActions.StartAddingProduct) => {
      return this.requestsService.execute('addProduct', action.payload,
        () => this.store.dispatch(new ProductsActions.SetChangeProductsState(false)));
    }),
    map((response: {product: Product}) => {
      this.store.dispatch(new ProductsActions.SetChangeProductsState(false));
      return {
        type: ProductsActions.PUSH_PRODUCT,
        payload: response.product
      }
    })
  );

  @Effect()
  productEditing = this.actions$.ofType(ProductsActions.START_EDIT_PRODUCT).pipe(
    switchMap((action: ProductsActions.StartEditProduct) => {
      return this.requestsService.execute('editProduct', action.payload.formState,
        () => this.store.dispatch(new ProductsActions.SetChangeProductsState(false)),
        action.payload.productId);
    }),
    map((response: {product: Product}) => {
      this.store.dispatch(new ProductsActions.SetChangeProductsState(false));
      return {
        type: ProductsActions.PUT_PRODUCT,
        payload: { product: response.product, productId: response.product._id }
      }
    })
  )

  @Effect()
  productDeleting = this.actions$.ofType(ProductsActions.START_REMOVING_PRODUCT).pipe(
    switchMap((action: ProductsActions.StartRemovingProduct) => {
      return this.requestsService.execute('deleteProduct', {},
        () => this.store.dispatch(new ProductsActions.SetRemovingProductState(false)),
        action.payload.toString())
    }),
    map((response: {_id: any}) => {
      return {
        type: ProductsActions.REMOVE_PRODUCT,
        payload: response._id
      }
    })
  )

  @Effect()
  voting = this.actions$.ofType(ProductsActions.START_VOTING).pipe(
    map((action: ProductsActions.StartVoting) => {
      const { rate, product } = action.payload;
      const newProduct = {...product};
      newProduct.rate = rate;
      this.requestsService.execute('voteProduct', newProduct, null, action.payload.product._id).pipe(take(1)).subscribe();
      return {
         type: ProductsActions.PUT_PRODUCT,
         payload: { product: newProduct, productId: newProduct._id }
      }
    })
  )
}
