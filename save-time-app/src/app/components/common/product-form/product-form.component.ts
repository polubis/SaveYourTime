import { Component, OnInit } from '@angular/core';
import { Form, FormSettings, Setting, FormState } from "src/app/components/utils/form/form";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { StartChangingProducts } from '../../../store/products/actions';
import { getAddingOrEditingState } from '../../../store/index';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends Form implements OnInit {
  productFormSettings: FormSettings = {
    name: new Setting('product name', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
    company: new Setting('company', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
    type: new Setting('type', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
    calories: new Setting('calories', { isNotEmptyString: true, minLength: 3, maxLength: 50 })
  };
  isSubmiting = false;
  constructor(private store: Store<AppState>) {
    super();
  }
  togle (key: string) {
    this[key] = !this[key];
  }
  ngOnInit() {
    this.store.select(getAddingOrEditingState).subscribe((isAddingOrEditing: boolean) => {
      this.isSubmiting = isAddingOrEditing;
    })
  }

  handleSubmit(formData: FormState) {
    this.store.dispatch(new StartChangingProducts(formData));
  }
}
