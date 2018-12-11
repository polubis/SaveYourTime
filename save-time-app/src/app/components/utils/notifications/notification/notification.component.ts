import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification flex-center">
      <div [class]="'not-icon ' + type">
        <i *ngIf="type === 'error'" class="material-icons">error_outline</i>
        <i *ngIf="type === 'ok'" class="material-icons">check</i>
        <i *ngIf="type === 'warning'" class="material-icons">warning</i>
      </div>
      <div class="not-content">
        {{content}}
      </div>
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() content: string;
  @Input() type: string;
  constructor() { }

  ngOnInit() {
  }

}
