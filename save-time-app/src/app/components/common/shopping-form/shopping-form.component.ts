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
  ngOnInit() {
    this.productsSubscription = this.store.select(state => state.products.products).subscribe((products: Product[]) => {
      this.productsToSelect = products;
    });
    this.store.dispatch(new FetchProducts());
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
