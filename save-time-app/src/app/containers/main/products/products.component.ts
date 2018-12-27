import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { FetchProducts, StartRemovingProduct, SetRemovingProductState, ChangeState, TryRemoveCategory } from '../../../store/products/actions';
import { Product, IProductCategory } from "src/app/models/product";
import { Subscription } from "rxjs";
import { State } from '../../../store/products/reducers';
import { getNotifications } from "src/app/store";
import { Notification } from '../../../models/notification';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }
  products: Product[];
  deleteProductSub: Subscription;
  notificationSub: Subscription;

  productToEdit: Product;
  productToDelete: Product;
  isDeletingProduct: boolean;
  isLoadingCategories: boolean;
  addProductModal = false;
  addCategoryModal = false;
  isCategoriesAdded = false;
  productCategories: IProductCategory[] = [];
  isRemovingCategory = false;
  categoryToRemove_ID: string;

  categoryToEdit: IProductCategory;
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
      this.productCategories = state.productCategories;
      this.isRemovingCategory = state.isRemovingCategory;
      this.isLoadingCategories = state.isLoadingCategories;
    });

    this.notificationSub = this.store.select(getNotifications).subscribe((notifications: Notification[]) => {
      const notId = 'removeCategory';
      const isCategoryRemovedProperly = notifications.findIndex(n => n.id === notId && n.type === 'ok') !== -1;

      if (isCategoryRemovedProperly) {
        this.categoryToRemove_ID = '';
      }
    });

    this.store.dispatch(new FetchProducts());
  }
  ngOnDestroy() {
    this.deleteProductSub.unsubscribe();
    this.notificationSub.unsubscribe();
  }
  removeCategory() {
    this.store.dispatch(new TryRemoveCategory(this.categoryToRemove_ID));
  }

  setCategoryToEdit(category: IProductCategory) {
    this.categoryToEdit = category;
  }

  setCategoryToRemove(id: string) {
    this.categoryToRemove_ID = id;
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
