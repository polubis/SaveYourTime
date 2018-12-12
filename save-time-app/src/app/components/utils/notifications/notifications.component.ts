import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification } from '../../../models/notification';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { getNotifications } from '../../../store/index';
import { RemoveNotification } from '../../../store/notifications/actions';
@Component({
  selector: 'app-notifications',
  template: `
    <div class="notifications" *ngIf="notifications">
      <app-notification (removing)="removeNotificationOnClick(i)"
      *ngFor="let notification of notifications; let i = index" [type]="notification.type" [content]="notification.content">
      </app-notification>
    </div>

  `,
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[];
  constructor(private store: Store<AppState>) { }
  subscription: Subscription;
  ngOnInit() {
    this.subscription = this.store.select(getNotifications).subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  removeNotificationOnClick(index: number) {
    console.log(index);
    this.store.dispatch(new RemoveNotification(index));
  }
}
