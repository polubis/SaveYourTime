


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { switchMap, map, tap, take } from "rxjs/operators";
import { of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { RequestsService } from "src/app/services/requests.service";
import * as ProductsActions from '../../store/products/actions';
import { Product, IProductCategory } from "src/app/models/product";
import { AppState } from "src/app/app.reducers";
import { ChangeState } from "../../store/products/actions";
import { getCategories } from "src/app/store";
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
      return this.requestsService.execute('products', {}, null, action.payload);
    }),
    map((response: {products: Product[], count: number}) => {
      return {
        type: ProductsActions.SET_PRODUCTS,
        payload: {products: response.products, productsCount: response.count}
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

      return this.requestsService.execute('editProduct', action.payload, () => this.store.dispatch(new ProductsActions.SetChangeProductsState(false)),
      action.payload._id);
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
      this.requestsService.execute('rateProduct', { rate: rate }, null, action.payload.product._id).pipe(take(1)).subscribe();
      return {
         type: ProductsActions.PUT_PRODUCT,
         payload: { product: newProduct, productId: newProduct._id }
      }
    })
  )

  @Effect()
  getCategories = this.actions$.ofType(ProductsActions.TRY_GET_PRODUCT_CATEGORIES).pipe(
    switchMap((action: ProductsActions.TryGetProductCategories) => {
      return this.requestsService.execute('getCategories', null, () =>
        this.store.dispatch(new ChangeState({ key: 'isLoadingCategories', value: false }))
      );
    }),
    map((res: {productCategories: IProductCategory[]}) => {
      if (res.productCategories.length === 0) {
        this.store.dispatch(new ChangeState({ key: 'categoryModal', value: true}));
      }
      return {
        type: ProductsActions.SET_PRODUCT_CATEGORIES,
        payload: res.productCategories
      }
    })
  )

  @Effect()
  addCategory = this.actions$.ofType(ProductsActions.TRY_ADD_PRODUCT_CATEGORY).pipe(
    switchMap((action: ProductsActions.TryAddProductCategory) => {
      return this.requestsService.execute('createProductCategory', action.payload,
        () => this.store.dispatch(new ProductsActions.ChangeLoadingState({key: 'isAddingProductCategory', status: false}))
      );
    }),
    map((response: {savedCategory: IProductCategory}) => {
      const category: IProductCategory = { _id: response.savedCategory._id, name: response.savedCategory.name };
      this.store.dispatch(new ChangeState({ key: 'categoryModal', value: false}));

      return {
        type: ProductsActions.FINISH_ADDING_PRODUCT_CATEGORY,
        payload: category
      }
    })
  )


  categoryToRemove_Id: string;

  @Effect()
  removeCategory = this.actions$.ofType(ProductsActions.TRY_REMOVE_CATEGORY).pipe(
    switchMap((action: ProductsActions.TryRemoveCategory) => {
      return this.requestsService.execute('removeCategory', null,
        () => this.store.dispatch(new ChangeState( { key: 'isRemovingCategory', value: false } )), action.payload
      )
    }),
    switchMap((response: { _id: any }) => {
      this.categoryToRemove_Id = response._id;
      return this.store.select(state => state.products.productCategories).pipe(
        take(1)
      );
    }),
    map((categories: any[]) => {
      const fCategories = categories.filter(c => c._id !== this.categoryToRemove_Id);
      this.store.dispatch(new ChangeState({ key: 'isRemovingCategory', value: false }));
      return {
        type: ProductsActions.SET_PRODUCT_CATEGORIES,
        payload: fCategories
      }
    })
  )
}
