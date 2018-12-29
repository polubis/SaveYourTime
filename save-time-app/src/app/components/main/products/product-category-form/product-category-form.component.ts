import { Component, OnInit } from '@angular/core';
import { FormBase } from "src/app/services/form-base";
import { FormSettings, Setting } from "src/app/components/utils/form/form";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { TryAddProductCategory, TryEditProductCategory } from "src/app/store/products/actions";
import { IProductCategory } from "src/app/models/product";

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
      name: new Setting("product category name (like: 'wegetables')", { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
    };

    this.categoryFormSettings = super.setSettingsBasedOnElementToEdit(categoryFormSettings);

    this.store.select(state => state.products.isAddingProductCategory)
      .subscribe((status: boolean) => this.isSubmiting = status);
    this.store.select(state => state.products.editingCategory)
      .subscribe((status: boolean) => this.isSubmiting = status);
  }

  handleSubmit(formData:any) {
    this.isSubmiting = true;
    if (this.elementToEdit) {
      const category: IProductCategory = { name: formData.name, _id: this.elementToEdit._id };
      console.log(category);
      this.store.dispatch(new TryEditProductCategory(category));
    }
    else {
      this.store.dispatch(new TryAddProductCategory(formData));
    }
  }

}
