import { Component, OnInit } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { TryGetProductCategories } from "src/app/store/products/actions";
import { ChangeState } from "src/app/store/users/actions";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  openAddProduct = false;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new TryGetProductCategories());
    this.store.dispatch(new ChangeState( { key: 'isLogingIn', value: false } ))
  }

  togle(key: string) {
    this[key] = !this[key];
  }
}
