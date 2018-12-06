import { Component, OnInit } from '@angular/core';
import { Product } from "src/app/models/product";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import { FetchProducts } from '../../../store/products/actions';
@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {
  blockNames: string[] = ['main', 'products', 'meals', 'recipes', 'trainings', 'statistics'];
  currentOpenedBlock = 'products';
  exampleProducts: Product[] = [];

  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.store.select(state => state.products.products).subscribe((products: Product[]) => {
      this.exampleProducts = products;
    });
    this.store.dispatch(new FetchProducts());
  }

  changeTutorialBlock(block: string) {
    this.currentOpenedBlock = block;
    window.scroll(0,0);
  }
}
