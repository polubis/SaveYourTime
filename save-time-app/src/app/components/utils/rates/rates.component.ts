import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from "@angular/core";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  rates: number[] = [];
  ratesToSelect: number[] = [1,2,3,4,5];
  @Input() rate: number;
  @Output() voting = new EventEmitter<number>();
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    if (this.rate) {
      const ceiledRate = Math.floor(this.rate);
      const rates: any[] = [];

      for (let i = 0; i < ceiledRate; i++) {
        rates.push(i);
      }
      this.rates = rates;
    }
  }
}
