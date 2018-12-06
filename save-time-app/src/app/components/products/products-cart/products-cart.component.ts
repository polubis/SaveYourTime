import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Product } from "src/app/models/product";

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {
  @Input() product: Product;
  @Input() classes: string = '';
  constructor() { }

  ngOnInit() {
  }

}
