import { Component, OnInit } from '@angular/core';
import { FormBase } from "src/app/services/form-base";
import { FormSettings, Setting } from "src/app/components/utils/form/form";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { TryAddProductCategory } from "src/app/store/products/actions";

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.scss']
})
export class ProductCategoryFormComponent extends FormBase implements OnInit {
  categoryFormSettings: FormSettings;
  constructor(private store: Store<AppState>) { super(); }

  ngOnInit() {
    const categoryFormSettings = {
      name: new Setting('product category name', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
    };

    this.categoryFormSettings = this.elementToEdit ?
      super.putModelIntoFormOnEdit(this.elementToEdit, categoryFormSettings) :
      categoryFormSettings;

    this.store.select(state => state.products.isAddingProductCategory)
      .subscribe((status: boolean) => this.isSubmiting = status);
  }

  handleSubmit(formData:any) {
    this.isSubmiting = true;
    this.store.dispatch(new TryAddProductCategory(formData));
  }

}
