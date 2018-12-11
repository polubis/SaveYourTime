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
                notifications: [...action.payload]
            };
        case NotificationsActions.PUSH_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, {...action.payload}]
            };
        default:
            return state;
    }
}
