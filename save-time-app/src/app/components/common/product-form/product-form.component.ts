import { Component, OnInit, Input } from '@angular/core';
import { Form, FormSettings, Setting, FormState } from "src/app/components/utils/form/form";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { StartAddingProduct, StartEditProduct } from '../../../store/products/actions';
import { getAddingOrEditingState } from '../../../store/index';
import { FormBase } from "src/app/services/form-base";
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
      company: new Setting('company', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
      type: new Setting('type', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
      calories: new Setting('calories', { isNotEmptyString: true, minLength: 3, maxLength: 50 })
    }

    this.productFormSettings = this.elementToEdit ?
      super.putModelIntoFormOnEdit(this.elementToEdit, formSettings) :
      formSettings;

    this.store.select(getAddingOrEditingState).subscribe((isAddingOrEditing: boolean) => {
      this.isSubmiting = isAddingOrEditing;
    })
  }

  handleSubmit(formState: FormState) {
    if (this.elementToEdit) {
      this.store.dispatch(new StartEditProduct({formState, productId: this.elementToEdit._id }));
    } else {
      this.store.dispatch(new StartAddingProduct(formState));
    }
  }
}