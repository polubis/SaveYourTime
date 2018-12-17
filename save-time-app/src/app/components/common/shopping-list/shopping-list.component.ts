import { Component, OnInit } from '@angular/core';
import { Shopping } from "src/app/models/shopping";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  shopping: Shopping[] = [];
  constructor() { }

  ngOnInit() {
  }

}
