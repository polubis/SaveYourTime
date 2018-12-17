import { Component, OnInit, Input } from '@angular/core';
import { FormSettings, Setting } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() items: any[];
  @Input() keys: string[];

  filterFormSettings: FormSettings = {
    category: new Setting('product category'),
    value: new Setting('value')
  }
  filters = false;
  settings = false;

  constructor() { }

  ngOnInit() {

  }

  togle(key: string) {
    this[key] = !this[key];
  }

}
