import { Component, OnInit } from '@angular/core';
import { Form, FormSettings, Setting } from "src/app/components/utils/form/form";

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
  constructor() {
    super();
  }
  togle (key: string) {
    this[key] = !this[key];
  }
  ngOnInit() {
  }

  handleSubmit(formData: any) {
    this.isSubmiting = true;
  }
}


// name: { type: String, required: true, unique: true },
// company: { type: String, required: true },
// type: { type: String, required: true },
// picturePath: { type: String },
// rate: { type: Number },
// calories: { type: Number },
// numberOfVotes: { type: Number }
