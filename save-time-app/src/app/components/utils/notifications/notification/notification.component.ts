import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { interval, Subscription } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification flex-center" (mouseenter)="pauseCounting()">
      <div [class]="'not-icon ' + type" (click)="removing.emit()">
        <i *ngIf="type === 'error'" class="material-icons">error_outline</i>
        <i *ngIf="type === 'ok'" class="material-icons">check</i>
        <i *ngIf="type === 'warning'" class="material-icons">warning</i>
      </div>
      <div class="not-content flex-center">
        {{content}}
      </div>
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() content: string;
  @Input() type: string;
  @Input() closeNotificationTime = 5000;
  @Output() removing = new EventEmitter<void>();

  subscription: Subscription;

  currentTime = 0;
  removeNotificationTimer = interval(1000).pipe(tap(time => {
    this.currentTime = this.currentTime + 1000;
    if (this.currentTime === this.closeNotificationTime) {
      this.removing.emit();
    }
  }));
  constructor() { }

  pauseCounting() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    if (this.closeNotificationTime > 0) {
      this.subscription = this.removeNotificationTimer.subscribe();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
