import { Component, OnInit, Input } from '@angular/core';
import { Form, FormSettings, Setting, FormState } from "src/app/components/utils/form/form";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { FormBase } from "src/app/services/form-base";
import { Product, IProductCategory } from "src/app/models/product";
import { map } from "rxjs/operators";
import { getCategories, getAddingOrEditingState } from "src/app/store";
import { StartEditProduct, StartAddingProduct } from "src/app/store/products/actions";
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends FormBase implements OnInit {
  productFormSettings: FormSettings;
  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    const formSettings = {
      name: new Setting('product name', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
      category: new Setting('category', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, '', 'select', '', []),
      calories: new Setting('calories'),
      caloriesUnit: new Setting('calories unit', {}, '', 'select', 'kcal', [{value: 'kcal', label: 'kcal'}, {value: 'cal', label: 'cal'}]),
      picturePath: new Setting('product picture', { isPicture: true }, '', 'file')
    };

    this.productFormSettings = super.setSettingsBasedOnElementToEdit(formSettings);

    this.store.select(getCategories)
    .subscribe((data: IProductCategory[]) => {
      const mappedList: { value: any, label: string }[] = data.map((item: IProductCategory) => {
        return { value: item.name, label: item.name };
      });
      const productFormSettings = {...this.productFormSettings};
      productFormSettings.category.list = mappedList;
      this.productFormSettings = productFormSettings;
    });

    this.store.select(getAddingOrEditingState).subscribe((isAddingOrEditing: boolean) => {
      this.isSubmiting = isAddingOrEditing;
    })
  }

  handleSubmit(formState: FormState) {
    if (this.elementToEdit) {
      const newProduct  = new Product(this.elementToEdit._id, formState.name,
        formState.category, formState.picturePath, this.elementToEdit.rate, formState.calories, formState.caloriesUnit);
      this.store.dispatch(new StartEditProduct(newProduct));
    } else {
      this.store.dispatch(new StartAddingProduct(formState));
    }
  }
}
