import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as UsersActions from '../../store/users/actions';
import { switchMap, map, tap, delay } from "rxjs/operators";
import { RequestsService } from "src/app/services/requests.service";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { ILoggedUser } from "src/app/store/users/reducers";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";
import { ChangeState } from "../../store/users/actions";
@Injectable()
export class UsersEffects {
  constructor(private requestsService: RequestsService, private actions$: Actions,
    private store: Store<AppState>, private router: Router, private cookieService: CookieService) {
  }

  loggedUserData: ILoggedUser;

  @Effect() tryUploadAvatar = this.actions$.ofType(UsersActions.TRY_UPLOAD_USER_AVATAR).pipe(
    switchMap((action: UsersActions.TryUploadUserAvatar) => {
      const file: File = action.payload.file;
      this.loggedUserData = action.payload.userData;
      return this.requestsService.execute('uploadAvatar', {file},
        () => this.store.dispatch(new ChangeState( { key: 'isUploadingUserAvatar', value: false } ))
      );
    }),
    map((response: any) => {
      return {
        type: UsersActions.FINISH_UPLOAD_USER_AVATAR,
        payload: { ...this.loggedUserData, picturePath: response.picturePath }
      }
    })
  )

  @Effect()
  tryGetLoggedUserData = this.actions$.ofType(UsersActions.TRY_GET_LOGGED_USER_DATA).pipe(
    switchMap((action: UsersActions.TryGetLoggedUserData) => {
      return this.requestsService.execute('getLoggedUserData', null,
        () => this.store.dispatch(new ChangeState( { key: 'isGettingLoggedUserData', value: false } ))
      )
    }),
    map((data: {user: ILoggedUser}) => {
      const userData: ILoggedUser = {...data.user};
      return {
        type: UsersActions.FINISH_GET_LOGGED_USER_DATA,
        payload: userData
      };
    })
  )

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

  token = '';

  @Effect() login = this.actions$.ofType(UsersActions.TRY_LOG_IN).pipe(
    switchMap((action: UsersActions.TryLogIn) => {
      return this.requestsService.execute('login', action.payload,
        () => this.store.dispatch(new UsersActions.ChangeState( { key: 'isLogingIn', value: false} ))
      );
    }),
    tap((response: any) => {
      this.token = response.user.token;
    }),
    switchMap((response: any) => [
      new UsersActions.SetLogInData(
        { loggedUserData: null, token: response.user.token }
      )
    ]),
    tap(() => {
      this.cookieService.set('token', this.token);
      this.router.navigate(['main']);
    })
  )

  @Effect() logout = this.actions$.ofType(UsersActions.TRY_LOG_OUT).pipe(
    tap(() => {
      this.cookieService.delete('token');
      this.router.navigate(['']);
    }),
    switchMap(() => [
      new UsersActions.SetLogInData( { loggedUserData: null, token: '' } ),
      new UsersActions.ChangeState( { key: 'isLogingOut', value: false } )
    ])
  )
}
