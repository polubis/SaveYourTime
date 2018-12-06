import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  rates: number[] = [];
  @Input() rate: number;
  constructor() { }

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
