import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { FetchProducts, StartRemovingProduct, SetRemovingProductState } from '../../../store/products/actions';
import { Product } from "src/app/models/product";
import { Subscription, interval, Observable } from "rxjs";
import { ShoppingProduct } from "src/app/models/shopping";
import { TryPutOperation } from "src/app/store/operations/actions";
import { getFilesToExtract } from "src/app/store";
import { IFileToExtract } from "src/app/store/operations/reducers";
import { take, map } from "rxjs/operators";

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})

export class ShoppingFormComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }

  productsSubscription: Subscription;
  extractedFileSub: Subscription;

  productsToSelect: Product[];

  selectedProducts: ShoppingProduct[] = [];
  sum: number = 0;

  filesNamesInExtractingProcess: string[];

  putFilesInterval: Observable<number> = interval(200);

  ngOnInit() {
    this.extractedFileSub = this.store.select(getFilesToExtract).subscribe((extractedFiles: IFileToExtract) => {
      if (extractedFiles) {
        this.filesNamesInExtractingProcess = Object.keys(extractedFiles);
      }
    })
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
    this.extractedFileSub.unsubscribe();
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

  handleDropReceipt(files: File[]) {
    const filesLength = files.length;

    if (filesLength === 1) {
      this.store.dispatch(new TryPutOperation(files[0]));
    }
    else {
      this.putFilesInterval.pipe(
        take(filesLength),
        map(i => {
          return this.store.dispatch(new TryPutOperation(files[i]));
        })
      )
      .subscribe();
    }
  }
}
