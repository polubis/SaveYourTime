import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { Product } from "src/app/models/product";
import { Subscription, interval, Observable } from "rxjs";
import { getFilesToExtract } from "src/app/store";
import { take, map } from "rxjs/operators";
import { IDropzone } from "src/app/components/utils/dropzone/dropzone";
import { IFileToExtract } from "src/app/store/extractions/reducers";
import { TryPutExtraction } from "src/app/store/extractions/actions";
import { SelectedProduct } from "src/app/models/shopping";
import { FetchProducts } from "src/app/store/products/actions";
import { ISalarySchema } from "src/app/containers/main/store/user-settings/reducers";
import { getIsLoadingSettings, getSalarySchema } from "src/app/containers/main/store";
import { ChangeState } from "src/app/containers/main/store/user-settings/actions";

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})

export class ShoppingFormComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }

  productsSubscription: Subscription;
  extractedFileSub: Subscription;
  settingsSub: Subscription;
  salarySchemaSub: Subscription;

  productsToSelect: Product[];

  selectedProducts: SelectedProduct[] = [];
  sum: number = 0;

  filesNamesInExtractingProcess: string[];

  receiptConfig: IDropzone = {
    blackList: { content: 'file is already in extract receipts', value: [] },
    filesTypes: { content: 'file should be a jpg/jpeg/png format', value: ['image/jpg', 'image/jpeg', 'image/png'] },
    maxFiles: { content: 'To many files was dropped. Limit is ', value: 3 }
  };

  putFilesInterval: Observable<number> = interval(200);

  isLoadingSettings: boolean;
  salarySchema: ISalarySchema;

  ngOnInit() {
    this.extractedFileSub = this.store.select(getFilesToExtract).subscribe((extractedFiles: IFileToExtract) => {
      if (extractedFiles) {
        this.receiptConfig.blackList.value = Object.keys(extractedFiles);
      }
    })
    this.productsSubscription = this.store.select(state => state.products.products).subscribe((products: Product[]) => {
      this.productsToSelect = products;
    });

    this.settingsSub = this.store.select(getIsLoadingSettings)
    .subscribe((status: boolean) => {
      this.isLoadingSettings = status;
    });
    this.salarySchemaSub = this.store.select(getSalarySchema)
    .subscribe((schema: ISalarySchema) => {
      this.salarySchema = schema;
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
    this.settingsSub.unsubscribe();
    this.salarySchemaSub.unsubscribe();
  }

  removeProductFromSelected (item: { item: Product, index: number } ) {
    const { item: product, index } = item;
    const selectedProducts: SelectedProduct[] = [...this.selectedProducts];
    const selectedProduct = selectedProducts[index];

    if (selectedProduct.quantity === 1) {
      selectedProducts.splice(index, 1);
    } else {
      selectedProduct.quantity = selectedProduct.quantity - 1;
    }
    this.selectedProducts = selectedProducts;
  }

  addProductToSelected(item: { item: Product, index: number }) {
    const { item: product, index } = item;
    const selectedProducts: SelectedProduct[] = [...this.selectedProducts];
    const indexOfProduct = selectedProducts.findIndex(x => x.name === product.name);

    const { name } = product;

    if (indexOfProduct !== -1) {
      const { quantity }: SelectedProduct = selectedProducts[indexOfProduct];
      const exitingSelectedProduct: SelectedProduct = { name, quantity: quantity + 1 };
      selectedProducts[indexOfProduct] = exitingSelectedProduct;
    } else {
      const newSelectedProduct = { name, quantity: 1 };
      selectedProducts.unshift(newSelectedProduct);
    }

    this.selectedProducts = selectedProducts;
  }

  handleDropReceipt(files: File[]) {
    const filesLength = files.length;
    if (filesLength === 1) {
      this.store.dispatch(new TryPutExtraction(files[0]));
    }
    else {
      this.putFilesInterval.pipe(
        take(filesLength),
        map(i => {
          return this.store.dispatch(new TryPutExtraction(files[i]));
        })
      )
      .subscribe();
    }
  }

  openSalarySchema() {
    this.store.dispatch(new ChangeState(
      {key: 'salaryModal', value: true}
    ));
  }

}
