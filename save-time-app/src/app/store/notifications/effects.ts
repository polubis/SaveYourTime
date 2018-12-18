


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, tap, take } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import * as NotificationsActions from '../../store/notifications/actions';
import { Notification } from '../../models/notification';
import { getNotifications } from "src/app/store";
@Injectable()
export class NotificationsEffects {
  notificationToPush: Notification;
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  tryPushNotification = this.actions$.ofType(NotificationsActions.TRY_PUSH_NOTIFICATION).pipe(
    switchMap((action: NotificationsActions.TryPushNotification) => {
      this.notificationToPush = action.payload;
      return this.store.select(getNotifications).pipe(take(1));
    }),
    map((notifications: Notification[]) => {
      const index = notifications.findIndex(notif => notif.id === this.notificationToPush.id);

      if (index !== -1) {
        this.store.dispatch(new NotificationsActions.RemoveNotification(index));
      }

      return {
        type: NotificationsActions.PUSH_NOTIFICATION,
        payload: this.notificationToPush
      }
    })
  );
}
