import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div *ngIf="showBackdrop" class="loading-bg"></div>
  <div [class]="containerClasses + ' container'" [ngClass]="{'hide-spinner': !loading}">
    <div [class]="classes + ' spinner'"></div>
  </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() loading: boolean;
  @Input() backdrop?: boolean;
  @Input() classes: string = 'spinner-small';
  @Input() containerClasses: string = 'page-container mobile-container';
}
