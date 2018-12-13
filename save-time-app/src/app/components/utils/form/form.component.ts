import { Component, OnInit, Input } from '@angular/core';
import { Form, Setting, FormSettings } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends Form implements OnInit {
  @Input() classes = '';
  @Input() formSettings: FormSettings;
  @Input() btnTitle = 'SIGN UP';
  constructor() {
    super();
  }

  ngOnInit() {
    super.createInitialState(this.formSettings);
  }

}
