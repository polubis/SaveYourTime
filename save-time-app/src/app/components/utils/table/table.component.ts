import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormSettings, Setting } from "src/app/components/utils/form/form";
import * as tableKeys from './table-keys';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableClass = 'table-add';
  @Input() title = 'Products';
  @Input() subTitle = 'click row for select';
  @Input() emptyTitle = 'This table is already empty. Start selecting products';

  @Input() keysTitle: string;

  @Input() detailsOnHover = false;

  @Input() enableChangingPageSize = true;
  @Input() enableFilters = true;
  @Input() enablePagination = true;

  @Input() items: any[];
  @Output() rowClick = new EventEmitter< { item: any, index: number } >();
  filterFormSettings: FormSettings = {
    category: new Setting('product category'),
    value: new Setting('value')
  }
  filters = false;
  settings = false;
  keys: {display: string, key: any}[] = [];

  detailComponentIndex: number = -1

  filtersList: { category: string, value: any }[] = [];

  constructor() { }

  ngOnInit() {
    this.keys = [...tableKeys[this.keysTitle]];
  }

  togle(key: string) {
    this[key] = !this[key];
  }

  aplyFilter(formData: FormData) {

  }
}
