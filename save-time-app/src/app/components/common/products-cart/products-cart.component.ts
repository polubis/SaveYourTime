import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from "@angular/core";
import { Product } from "src/app/models/product";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { StartVoting } from '../../../store/products/actions';
@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {
  @Input() product: Product;
  @Input() classes: string = '';
  @Output() editing = new EventEmitter<void>();
  @Output() deleting = new EventEmitter<void>();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  vote(rate: number) {
    this.store.dispatch(new StartVoting({rate, product: this.product}));
  }
}