import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  openAddProduct = false;
  constructor() { }

  ngOnInit() {
  }

  togle(key: string) {
    this[key] = !this[key];
  }
}
