import { Component, OnInit, Input } from '@angular/core';
import { Form, Setting, FormSettings } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../shared.scss', '../file-picker/file-picker.component.scss', './form.component.scss']
})
export class FormComponent extends Form implements OnInit {
  @Input() classes = '';
  @Input() formSettings: FormSettings;
  @Input() btnTitle = 'SIGN UP';
  @Input() btnType = 'normal';
  constructor() {
    super();
  }

  ngOnInit() {
    super.createInitialState(this.formSettings);
  }

}
