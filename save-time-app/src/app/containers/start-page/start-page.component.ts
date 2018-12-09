import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  loginModal = false;
  registerModal = false;
  constructor() { }

  ngOnInit() {
  }

  togle(key: string) {
    this[key] = !this[key];
  }

}
