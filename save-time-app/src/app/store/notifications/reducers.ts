import * as fromApp from '../../app.reducers';
import { Notification } from '../../models/notification';
import * as NotificationsActions from './actions';
export interface State {
  notifications: Notification[]
};

const initialState: State = {
  notifications: []
};

export function notificationsReducer(state = initialState, action: NotificationsActions.NotificationsActions){
    switch(action.type){
        case NotificationsActions.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: [ ...action.payload ]
            };
        case NotificationsActions.PUSH_NOTIFICATION:
            return {
                ...state,
                notifications: [ {...action.payload}, ...state.notifications ]
            };
        case NotificationsActions.REMOVE_NOTIFICATION:
            const notifications = [...state.notifications];
            notifications.splice(action.payload, 1);
            return {
              ...state,
              notifications: [...notifications]
            };
        default:
            return state;
    }
}

export const notifications = (state: State) => state.notifications;
