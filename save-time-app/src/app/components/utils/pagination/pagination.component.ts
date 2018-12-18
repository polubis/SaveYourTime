import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/products/reducers";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() limit: number;
  @Output() changingPage = new EventEmitter<number>();
  count: number;
  pages: number[] = [];
  currentPage = 1;
  constructor(private store: Store<AppState>) { }

  sub: Subscription;
  ngOnInit() {
    this.sub = this.store.select(state => state.products).subscribe((state: State) => {
      this.count = state.productsCount;
      this.pages = this.calculatePages(this.limit, this.count);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  calculatePages(limit: number, count: number) {
    const numberOfPages = Math.ceil(count / limit);
    return Array(numberOfPages).fill(null).map((u, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.changingPage.emit(page);
  }
}
