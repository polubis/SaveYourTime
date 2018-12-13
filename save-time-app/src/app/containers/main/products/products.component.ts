import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { FetchProducts, StartRemovingProduct, SetRemovingProductState } from '../../../store/products/actions';
import { getProducts } from '../../../store/index';
import { Product } from "src/app/models/product";
import { Subscription } from "rxjs";
import { State } from '../../../store/products/reducers';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }
  products: Product[];
  deleteProductSub: Subscription;

  productToEdit: Product;
  productToDelete: Product;
  isDeletingProduct: boolean;

  ngOnInit() {
    this.deleteProductSub = this.store.select(state => state.products).subscribe((state: State) => {
      this.products = state.products;

      this.isDeletingProduct = state.isRemovingProduct;
      if (state.removingProductStatus) {
        this.productToDelete = null;
        this.store.dispatch(new SetRemovingProductState(null));
      }
    });
    this.store.dispatch(new FetchProducts());
  }
  ngOnDestroy() {
    this.deleteProductSub.unsubscribe();
  }
  togleEditModal(product: Product | any) {
    this.productToEdit = product ? product : null;
  }
  togleDeleteModal (product: Product | any) {
    this.productToDelete = product ? product : null;
  }
  deleteProduct() {
    this.store.dispatch(new StartRemovingProduct(this.productToDelete._id))
  }


}
