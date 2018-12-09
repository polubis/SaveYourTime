import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div *ngIf="backdrop" class="loading-bg"></div>
  <div [class]="containerClasses + ' ' + classes + ' spinner'"></div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() loading: boolean;
  @Input() backdrop?: boolean;
  @Input() classes: string = 'spinner-small';
  @Input() containerClasses: string = 'page-container mobile-container';
}
