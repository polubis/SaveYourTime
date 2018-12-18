import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { FetchProducts, StartRemovingProduct, SetRemovingProductState } from '../../../store/products/actions';
import { getProducts } from '../../../store/index';
import { Product } from "src/app/models/product";
import { Subscription } from "rxjs";
import { ShoppingProduct } from "src/app/models/shopping";

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})

export class ShoppingFormComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }

  productsSubscription: Subscription;

  productsToSelect: Product[];

  selectedProducts: ShoppingProduct[] = [];
  sum: number = 0;

  ngOnInit() {
    this.productsSubscription = this.store.select(state => state.products.products).subscribe((products: Product[]) => {
      this.productsToSelect = products;
    });
    this.fetchProducts({size: 10, page: 1});
  }

  fetchProducts(settings: {size: number, page: number}) {
    let query = `?size=${settings.size}&page=${settings.page}`;
    this.store.dispatch(new FetchProducts(query));
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  removeProductFromSelected (item: { item: Product, index: number } ) {
    const { item: product, index } = item;
    const selectedProducts: ShoppingProduct[] = [...this.selectedProducts];
    let sum = this.sum;
    const selectedProduct = selectedProducts[index];

    if (selectedProduct.quantity === 1) {
      selectedProducts.splice(index, 1);
    } else {
      selectedProduct.quantity = selectedProduct.quantity - 1;
    }
    sum -= selectedProduct.cost;
    this.sum = Math.round(sum * 100) / 100;
    this.selectedProducts = selectedProducts;
  }

  addProductToSelected(item: { item: Product, index: number }) {
    const { item: product, index } = item;
    const selectedProducts: ShoppingProduct[] = [...this.selectedProducts];
    const indexOfProduct = selectedProducts.findIndex(x => x.productName === product.name);
    let sum = this.sum;

    if (indexOfProduct !== -1) {
      const { quantity }: ShoppingProduct = selectedProducts[indexOfProduct];
      const cShoppingProductFromAlreadyAdded = new ShoppingProduct(product.name, product.price, 0, quantity + 1);
      selectedProducts[indexOfProduct] = cShoppingProductFromAlreadyAdded;
      sum += cShoppingProductFromAlreadyAdded.cost;
    } else {
      const newShoppingProduct = new ShoppingProduct(product.name, product.price, 0);
      selectedProducts.unshift(newShoppingProduct);
      sum += newShoppingProduct.cost;
    }

    this.selectedProducts = selectedProducts;
    this.sum = Math.round(sum * 100) / 100;
  }

  onUploadSuccess() {
    console.log("Siema");
  }
}
