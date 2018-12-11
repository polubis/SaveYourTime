import { Action } from "@ngrx/store";
import { Notification } from '../../models/notification';

export const PUSH_NOTIFICATION = "[Notifications] PUSH_NOTIFICATION";
export const REMOVE_NOTIFICATION = "[Notifications] REMOVE_NOTIFICATION";
export const SET_NOTIFICATIONS = "[Notifications] SET_NOTIFICATIONS";

export class PushNotification implements Action{
    readonly type = PUSH_NOTIFICATION;
    constructor(public payload: Notification) {}
}

export class RemoveNotification implements Action {
    readonly type = REMOVE_NOTIFICATION;
}

export class SetNotifications {
   readonly type = SET_NOTIFICATIONS;
   constructor(public payload: Notification[]){}

}

export type NotificationsActions = PushNotification | RemoveNotification | SetNotifications;
