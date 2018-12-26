import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { FetchProducts, StartRemovingProduct, SetRemovingProductState, ChangeState } from '../../../store/products/actions';
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
  addProductModal = false;
  addCategoryModal = false;
  isCategoriesAdded = false;

  ngOnInit() {
    this.deleteProductSub = this.store.select(state => state.products).subscribe((state: State) => {
      this.products = state.products;

      this.isDeletingProduct = state.isRemovingProduct;
      if (state.removingProductStatus) {
        this.productToDelete = null;
        this.store.dispatch(new SetRemovingProductState(null));
      }

      this.addCategoryModal = state.categoryModal;
      this.isCategoriesAdded = state.productCategories.length > 0;
    });
    this.store.dispatch(new FetchProducts());
  }
  ngOnDestroy() {
    this.deleteProductSub.unsubscribe();
  }
  togleCategoryModal() {
    this.store.dispatch(new ChangeState({key: 'categoryModal', value: !this.addCategoryModal}));
  }
  togle(key: string) {
    this[key] = !this[key];
  }
  togleEditModal(product: Product | any) {
    this.productToEdit = product ? product : null;
    this.addProductModal = false;
  }
  togleDeleteModal (product: Product | any) {
    this.productToDelete = product ? product : null;
  }
  deleteProduct() {
    this.store.dispatch(new StartRemovingProduct(this.productToDelete._id))
  }
  togleModals() {
    if (this.isCategoriesAdded) {
      this.addProductModal = !this.addProductModal;
    }
    else {
      this.togleCategoryModal();
    }
  }

}
