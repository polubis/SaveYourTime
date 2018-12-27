



import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as UsersActions from '../../store/users/actions';
import { switchMap, map } from "rxjs/operators";
import { RequestsService } from "src/app/services/requests.service";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { ILoggedUser } from "src/app/store/users/reducers";
@Injectable()
export class UsersEffects {
  constructor(private requestsService: RequestsService, private actions$: Actions,
    private store: Store<AppState>) {

  }
  @Effect()
  register = this.actions$.ofType(UsersActions.START_REGISTER).pipe(
    switchMap((action: UsersActions.StartRegister) => {
      return this.requestsService.execute('register', action.payload,
        () => this.store.dispatch(new UsersActions.SetRegisterState(false))
      );
    }),
    map((response: any) => {
      return {
        type: UsersActions.SET_REGISTER_STATE,
        payload: true
      };
    })
  );

  @Effect()
  login = this.actions$.ofType(UsersActions.TRY_LOG_IN).pipe(
    switchMap((action: UsersActions.TryLogIn) => {
      return this.requestsService.execute('login', action.payload,
        () => this.store.dispatch(new UsersActions.ChangeState( {key: 'isLogingIn', value: false} ))
      );
    }),
    map((response: {user: ILoggedUser}) => {
      console.log(response.user);
      const loggedUser: ILoggedUser = { isAuth: true, token: response.user.token, _id: response.user._id };
      return {
        type: UsersActions.SET_LOG_IN_DATA,
        payload: loggedUser
      }
    })
  )
}
