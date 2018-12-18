import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'save-time-app';
  constructor() {
    window.addEventListener("dragover", function(e){
      e.preventDefault();
    },false);
    window.addEventListener("drop", function(e){
      e.preventDefault();
    },false);
  }
}
