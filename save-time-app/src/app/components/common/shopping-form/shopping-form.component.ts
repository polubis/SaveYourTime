import { Component, OnInit } from '@angular/core';
import { Setting, FormSettings } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})
export class ShoppingFormComponent implements OnInit {
  filterFormSettings: FormSettings = {
    category: new Setting('product category'),
    value: new Setting('value')
  }
  constructor() { }

  ngOnInit() {
  }

}
