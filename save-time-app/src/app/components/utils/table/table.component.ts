import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormSettings, Setting, FormState } from "src/app/components/utils/form/form";
import * as tableKeys from './table-keys';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild('pagination') pagination: any;

  @Input() isLoading = false;
  @Input() crud = false;
  @Input() tableClass = 'table-add';
  @Input() title = 'Products';
  @Input() subTitle = 'click row for select';
  @Input() emptyTitle = 'This table is empty...';
  @Input() keysTitle: string;
  @Input() maxRowsLimit: number = 10;

  @Input() detailsOnHover = false;

  @Input() enableChangingPageSize = true;
  @Input() enableFilters = true;
  @Input() enablePagination = true;

  @Input() items: any[];
  @Output() rowClick = new EventEmitter< { item: any, index: number, operation?: string } >();
  @Output() settingChanges = new EventEmitter< { size: number, page: number } >();
  filterFormSettings: FormSettings = {
    category: new Setting('product category'),
    value: new Setting('value')
  }
  filters = false;
  settings = false;
  keys: {display: string, key: any}[] = [];

  rowsLimit: number;
  percentageLimit: number;
  rowsLimiters: number[] = [];

  filtersList: { category: string, value: any }[] = [];
  constructor() { }

  currentPage = 1;

  changeRowsLimit(limit: number) {
    this.rowsLimit = limit;
    this.percentageLimit = this.calculateProgressMarkup(limit);
    this.pagination.changePage(1);
    this.settingChanges.emit({ size: limit, page: this.currentPage });
  }

  calculateProgressMarkup(limit: number) {
    return (limit / this.maxRowsLimit) * 100;
  }

  ngOnInit() {
    this.rowsLimit = this.maxRowsLimit;

    this.percentageLimit = this.calculateProgressMarkup(this.maxRowsLimit);
    this.rowsLimiters = Array(this.rowsLimit).fill(null).map((u, i) => i + 1);
    this.keys = [...tableKeys[this.keysTitle]];
  }

  togle(key: string) {
    this[key] = !this[key];
  }

  aplyFilter(formState: FormState) {
    const filtersList = [...this.filtersList];
    filtersList.unshift( {category: formState.category, value: formState.value } );
    this.filtersList = filtersList;
  }

  removeFilter(filter: { category: string, value: any }) {
    this.filtersList = this.filtersList.filter(x => x.category !== filter.category && x.value !== filter.value);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.settingChanges.emit({ size: this.rowsLimit, page });
  }

}
