import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as UsersActions from '../../store/users/actions';
import { switchMap, map, tap } from "rxjs/operators";
import { RequestsService } from "src/app/services/requests.service";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { ILoggedUser } from "src/app/store/users/reducers";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { throwError, of } from "rxjs";
@Injectable()
export class UsersEffects {
  constructor(private requestsService: RequestsService, private actions$: Actions,
    private store: Store<AppState>, private router: Router, private cookieService: CookieService) {
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
        () => this.store.dispatch(new UsersActions.ChangeState( { key: 'isLogingIn', value: false} ))
      );
    }),
    switchMap((response: any) => {
      const loggedUserData: ILoggedUser = {
        _id: response.user._id
      };
      this.cookieService.set('token', response.user.token);
      return of(this.store.dispatch(new UsersActions.SetLogInData(
        { loggedUserData, token: response.user.token }
      )));
    }),
    switchMap(() => {
      return of(this.router.navigate(['main']));
    }),
    map(() => {
      return {
        type: UsersActions.CHANGE_STATE,
        payload: { key: 'isLogingIn', value: false }
      };
    })
  )

  @Effect()
  logout = this.actions$.ofType(UsersActions.TRY_LOG_OUT).pipe(
    switchMap((action: UsersActions.TryLogOut) => {
      this.cookieService.delete('token')
      return of(this.store.dispatch(new UsersActions.SetLogInData({ loggedUserData: null, token: '' })))
    }),
    switchMap(() => {
      return of(this.router.navigateByUrl('/'));
    }),
    map(() => {
      return {
        type: UsersActions.CHANGE_STATE,
        payload: { key: 'isLogingOut', value: false }
      };
    })
  )

}
